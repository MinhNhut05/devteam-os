import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Queue } from 'bullmq';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';

export type AiJobStatus = 'pending' | 'done' | 'failed';

export interface AiJobResponse {
  jobId: string;
  status: AiJobStatus;
  result?: unknown;
  error?: string;
}

@ApiTags('AI')
@Controller('ai/jobs')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiJobsController {
  constructor(@InjectQueue('ai') private readonly aiQueue: Queue) {}

  @Get(':jobId')
  @ApiOperation({ summary: 'Polling endpoint cho AI background job (Phase 5+)' })
  @ApiResponse({
    status: 200,
    description: 'Job status + result khi done',
    schema: {
      example: {
        jobId: '123',
        status: 'done',
        result: { suggestions: [{ title: 'Subtask', priority: 'HIGH', estimatedTime: '2h' }] },
      },
    },
  })
  async getJob(@Param('jobId') jobId: string): Promise<AiJobResponse> {
    const job = await this.aiQueue.getJob(jobId);
    if (!job) {
      return { jobId, status: 'failed', error: 'Job not found or expired' };
    }
    const state = await job.getState();
    if (state === 'completed') {
      return { jobId, status: 'done', result: job.returnvalue };
    }
    if (state === 'failed') {
      return { jobId, status: 'failed', error: job.failedReason || 'Job failed' };
    }
    return { jobId, status: 'pending' };
  }
}
