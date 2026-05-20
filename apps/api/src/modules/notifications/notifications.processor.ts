import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { NotificationsGateway } from './notifications.gateway';

export interface EmitWorkspacePayload {
  workspaceId: string;
  event: string;
  data: unknown;
}

export interface EmitUserPayload {
  userId: string;
  event: string;
  data: unknown;
}

@Processor('notifications')
export class NotificationsProcessor extends WorkerHost {
  private readonly logger = new Logger(NotificationsProcessor.name);

  constructor(private readonly gateway: NotificationsGateway) {
    super();
  }

  async process(job: Job<EmitWorkspacePayload | EmitUserPayload>): Promise<void> {
    if (job.name === 'emit-workspace') {
      const payload = job.data as EmitWorkspacePayload;
      this.gateway.emitToWorkspace(payload.workspaceId, payload.event, payload.data);
      return;
    }
    if (job.name === 'emit-user') {
      const payload = job.data as EmitUserPayload;
      this.gateway.emitToUser(payload.userId, payload.event, payload.data);
      return;
    }
    this.logger.warn(`unknown notifications job: ${job.name}`);
  }
}
