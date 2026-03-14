import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '@/common/guards/jwt-auth.guard';
import { ProjectRoleGuard } from '@/common/guards/project-role.guard';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { WorkspaceRoles } from '@/common/decorators/workspace-roles.decorator';
import { ResolveWorkspaceFrom } from '@/common/decorators/resolve-workspace.decorator';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('Projects')
@Controller()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  // ============================================================
  // Routes nested under /workspaces/:workspaceId/projects
  // ============================================================

  @Post('workspaces/:workspaceId/projects')
  @UseGuards(ProjectRoleGuard)
  @ResolveWorkspaceFrom('workspaceId')
  @WorkspaceRoles(Role.OWNER, Role.ADMIN, Role.MEMBER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tao project moi trong workspace' })
  @ApiResponse({ status: 201, description: 'Project created' })
  async create(
    @Param('workspaceId') workspaceId: string,
    @Body() dto: CreateProjectDto,
  ) {
    return this.projectsService.create(workspaceId, dto);
  }

  @Get('workspaces/:workspaceId/projects')
  @UseGuards(ProjectRoleGuard)
  @ResolveWorkspaceFrom('workspaceId')
  @ApiOperation({ summary: 'Lay danh sach projects trong workspace' })
  @ApiResponse({ status: 200, description: 'List of projects' })
  async findAll(@Param('workspaceId') workspaceId: string) {
    return this.projectsService.findAll(workspaceId);
  }

  // ============================================================
  // Routes under /projects/:id
  // ============================================================

  @Get('projects/:id/stats')
  @UseGuards(ProjectRoleGuard)
  @ResolveWorkspaceFrom('projectId')
  @ApiOperation({ summary: 'Lay thong ke project' })
  @ApiResponse({ status: 200, description: 'Project stats' })
  async getStats(@Param('id') id: string) {
    return this.projectsService.getStats(id);
  }

  @Get('projects/:id')
  @UseGuards(ProjectRoleGuard)
  @ResolveWorkspaceFrom('projectId')
  @ApiOperation({ summary: 'Lay chi tiet project' })
  @ApiResponse({ status: 200, description: 'Project details' })
  async findOne(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Patch('projects/:id')
  @UseGuards(ProjectRoleGuard)
  @ResolveWorkspaceFrom('projectId')
  @WorkspaceRoles(Role.OWNER, Role.ADMIN, Role.MEMBER)
  @ApiOperation({ summary: 'Cap nhat project' })
  @ApiResponse({ status: 200, description: 'Project updated' })
  async update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
    return this.projectsService.update(id, dto);
  }

  @Delete('projects/:id')
  @UseGuards(ProjectRoleGuard)
  @ResolveWorkspaceFrom('projectId')
  @WorkspaceRoles(Role.OWNER, Role.ADMIN)
  @ApiOperation({ summary: 'Xoa project' })
  @ApiResponse({ status: 200, description: 'Project deleted' })
  async delete(@Param('id') id: string) {
    return this.projectsService.delete(id);
  }
}
