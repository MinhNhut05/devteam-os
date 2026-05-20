import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
