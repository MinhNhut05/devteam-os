import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import type { Queue } from 'bullmq';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { SplitTaskDto } from './dto/split-task.dto';
import { AnalyzeProgressDto } from './dto/analyze-progress.dto';
import { SuggestAssigneeDto } from './dto/suggest-assignee.dto';
import { CodeAssistDto } from './dto/code-assist.dto';

export interface AiJobAccepted {
  jobId: string;
  status: 'pending';
}

@ApiTags('AI')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Throttle({ ai: { limit: 5, ttl: 60000 } })
export class AiController {
  constructor(@InjectQueue('ai') private readonly aiQueue: Queue) {}

  @Post('split-task')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'AI gợi ý chia nhỏ task — async qua BullMQ, poll GET /ai/jobs/:jobId' })
  @ApiResponse({ status: 202, description: 'Job đã được nhận', schema: { example: { jobId: '12', status: 'pending' } } })
  @ApiResponse({ status: 400, description: 'description is required' })
  @ApiResponse({ status: 429, description: 'Too many AI requests' })
  async splitTask(@Body() dto: SplitTaskDto): Promise<AiJobAccepted> {
    const job = await this.aiQueue.add('split-task', dto);
    return { jobId: String(job.id), status: 'pending' };
  }

  @Post('analyze-progress')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'AI phân tích tiến độ project — async, poll GET /ai/jobs/:jobId' })
  @ApiResponse({ status: 202, description: 'Job đã được nhận' })
  @ApiResponse({ status: 400, description: 'projectId is required' })
  @ApiResponse({ status: 429, description: 'Too many AI requests' })
  async analyzeProgress(@Body() dto: AnalyzeProgressDto): Promise<AiJobAccepted> {
    const job = await this.aiQueue.add('analyze-progress', dto);
    return { jobId: String(job.id), status: 'pending' };
  }

  @Post('suggest-assignee')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'AI gợi ý người thực hiện task — async, poll GET /ai/jobs/:jobId' })
  @ApiResponse({ status: 202, description: 'Job đã được nhận' })
  @ApiResponse({ status: 400, description: 'Required fields missing' })
  @ApiResponse({ status: 429, description: 'Too many AI requests' })
  async suggestAssignee(@Body() dto: SuggestAssigneeDto): Promise<AiJobAccepted> {
    const job = await this.aiQueue.add('suggest-assignee', dto);
    return { jobId: String(job.id), status: 'pending' };
  }

  @Post('code-assist')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'AI hỗ trợ kỹ thuật — async, poll GET /ai/jobs/:jobId' })
  @ApiResponse({ status: 202, description: 'Job đã được nhận' })
  @ApiResponse({ status: 400, description: 'prompt is required' })
  @ApiResponse({ status: 429, description: 'Too many AI requests' })
  async codeAssist(@Body() dto: CodeAssistDto): Promise<AiJobAccepted> {
    const job = await this.aiQueue.add('code-assist', dto);
    return { jobId: String(job.id), status: 'pending' };
  }
}
