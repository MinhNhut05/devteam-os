import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    // NotificationsModule kept for NotificationsService (DB notification create/createMention)
    NotificationsModule,
    BullModule.registerQueue({ name: 'notifications' }),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
