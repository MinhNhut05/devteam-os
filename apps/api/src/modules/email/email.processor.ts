import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';
import { EmailService } from './email.service';

export interface SendMailPayload {
  to: string;
  subject: string;
  html: string;
}

@Processor('email')
export class EmailProcessor extends WorkerHost {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly emailService: EmailService) {
    super();
  }

  async process(job: Job<SendMailPayload>): Promise<void> {
    const { to, subject, html } = job.data;
    await this.emailService.sendMail(to, subject, html);
    this.logger.log(`email sent: ${job.name} → ${to}`);
  }
}
