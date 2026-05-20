import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { NotificationType } from '@prisma/client';
import type { Queue } from 'bullmq';
import { PrismaService } from '@/prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import type {
  EmitUserPayload,
  EmitWorkspacePayload,
} from '../notifications/notifications.processor';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
    @InjectQueue('notifications')
    private notificationsQueue: Queue<EmitWorkspacePayload | EmitUserPayload>,
  ) {}

  async findAll(taskId: string) {
    return this.prisma.comment.findMany({
      where: { taskId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(taskId: string, userId: string, dto: CreateCommentDto) {
    // Validate task tồn tại
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new NotFoundException(`Task ${taskId} không tồn tại`);
    }

    const comment = await this.prisma.comment.create({
      data: {
        taskId,
        userId,
        content: dto.content,
        mentions: dto.mentions ?? [],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    // Fire-and-forget: notifications + WebSocket
    try {
      // Query task with project relation de lay workspaceId + assignees
      const taskWithProject = await this.prisma.task.findUnique({
        where: { id: taskId },
        include: {
          project: { select: { workspaceId: true } },
          assignees: { select: { userId: true } },
        },
      });

      if (taskWithProject?.project) {
        // Enqueue comment_added broadcast
        await this.notificationsQueue.add('emit-workspace', {
          workspaceId: taskWithProject.project.workspaceId,
          event: 'comment_added',
          data: comment,
        });
      }

      // Mention notifications: create in DB sync, emit via queue
      if (dto.mentions && dto.mentions.length > 0) {
        const mentionNotifs = await this.notificationsService.createMention(
          dto.mentions,
          task.title,
          comment.user.name,
          taskId,
        );
        for (const notif of mentionNotifs) {
          await this.notificationsQueue.add('emit-user', {
            userId: notif.userId,
            event: 'notification',
            data: notif,
          });
        }
      }

      // COMMENT_ADDED notifications for assignees (excluding commenter + already-mentioned)
      if (taskWithProject?.assignees) {
        const mentionSet = new Set(dto.mentions ?? []);
        const assigneesToNotify = taskWithProject.assignees
          .map((a) => a.userId)
          .filter((id) => id !== userId && !mentionSet.has(id));

        for (const assigneeId of assigneesToNotify) {
          const notif = await this.notificationsService.create({
            userId: assigneeId,
            type: NotificationType.COMMENT_ADDED,
            title: `${comment.user.name} đã bình luận`,
            message: `Trong task "${task.title}"`,
            data: { taskId },
          });
          await this.notificationsQueue.add('emit-user', {
            userId: assigneeId,
            event: 'notification',
            data: notif,
          });
        }
      }
    } catch (error) {
      this.logger.error(
        'Failed to create notifications or emit websocket events for comment',
        error instanceof Error ? error.stack : String(error),
      );
    }

    return comment;
  }

  async update(id: string, userId: string, dto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment ${id} không tồn tại`);
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền sửa comment này');
    }

    return this.prisma.comment.update({
      where: { id },
      data: {
        ...(dto.content !== undefined && { content: dto.content }),
        ...(dto.mentions !== undefined && { mentions: dto.mentions }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });
  }

  async delete(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      throw new NotFoundException(`Comment ${id} không tồn tại`);
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('Bạn không có quyền xóa comment này');
    }

    await this.prisma.comment.delete({ where: { id } });
    return { message: 'Xóa comment thành công' };
  }
}
