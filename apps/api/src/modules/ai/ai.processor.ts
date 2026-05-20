import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { AiService } from './ai.service';
import { SplitTaskDto } from './dto/split-task.dto';
import { AnalyzeProgressDto } from './dto/analyze-progress.dto';
import { SuggestAssigneeDto } from './dto/suggest-assignee.dto';
import { CodeAssistDto } from './dto/code-assist.dto';

@Processor('ai')
export class AiProcessor extends WorkerHost {
  private readonly logger = new Logger(AiProcessor.name);

  constructor(private readonly aiService: AiService) {
    super();
  }

  async process(job: Job): Promise<unknown> {
    this.logger.log(`ai job started: ${job.name} (id=${job.id})`);
    switch (job.name) {
      case 'split-task':
        return this.aiService.splitTask(job.data as SplitTaskDto);
      case 'analyze-progress':
        return this.aiService.analyzeProgress(job.data as AnalyzeProgressDto);
      case 'suggest-assignee':
        return this.aiService.suggestAssignee(job.data as SuggestAssigneeDto);
      case 'code-assist':
        return this.aiService.codeAssist(job.data as CodeAssistDto);
      default:
        throw new Error(`Unknown AI job: ${job.name}`);
    }
  }
}
