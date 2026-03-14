import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AlertCircle, FolderKanban, Loader2 } from 'lucide-react';
import ProjectTaskModal from '@/features/tasks/TaskDetailModal';
import { useProject } from '@/hooks/useProject';
import { useProjectStats } from '@/hooks/useProjectStats';
import { useTasks } from '@/hooks/useTasks';
import { useWorkspaceStore } from '@/stores/workspace.store';

const taskStatusLabels: Record<string, string> = {
  TODO: 'Cần làm',
  IN_PROGRESS: 'Đang làm',
  DONE: 'Hoàn thành',
};

const priorityLabels: Record<string, string> = {
  URGENT: 'Khẩn cấp',
  HIGH: 'Cao',
  MEDIUM: 'Trung bình',
  LOW: 'Thấp',
};

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading, isError } = useProject(id);
  const { data: stats } = useProjectStats(id);
  const { data: tasks } = useTasks(id);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);
  const workspaces = useWorkspaceStore((state) => state.workspaces);
  const setCurrentWorkspace = useWorkspaceStore((state) => state.setCurrentWorkspace);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openTaskModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedTaskId(null);
  };

  useEffect(() => {
    if (!project) return;

    const matchedWorkspace = workspaces.find((workspace) => workspace.id === project.workspaceId);
    if (matchedWorkspace && currentWorkspace?.id !== matchedWorkspace.id) {
      setCurrentWorkspace(matchedWorkspace);
    }
  }, [currentWorkspace?.id, project, setCurrentWorkspace, workspaces]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="text-center py-16">
        <AlertCircle className="w-12 h-12 mx-auto text-red-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Không tìm thấy dự án
        </h3>
        <p className="text-gray-500 dark:text-gray-400">Dự án không tồn tại hoặc đã bị xóa.</p>
      </div>
    );
  }

  const backHref = currentWorkspace ? `/workspaces/${currentWorkspace.id}/projects` : '/workspaces';

  const statCards = [
    { label: 'Tổng task', value: stats?.totalTasks ?? tasks?.length ?? 0 },
    { label: 'Cần làm', value: stats?.todoTasks ?? 0 },
    { label: 'Đang làm', value: stats?.inProgressTasks ?? 0 },
    { label: 'Hoàn thành', value: stats?.doneTasks ?? 0 },
  ];

  return (
    <div className="space-y-6">
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to={backHref} className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Dự án
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white">{project.name}</span>
      </nav>

      <div className="card p-6">
        <div className="flex items-start gap-4">
          <div
            className="w-4 h-14 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h1>
              <span className="inline-flex px-2.5 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                {project.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {project.description || 'Chưa có mô tả cho dự án này.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((item) => (
          <div key={item.label} className="card p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Danh sách task</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Giai đoạn tiếp theo sẽ mở rộng task detail modal, subtasks, checklist và attachments.
            </p>
          </div>
        </div>

        {!tasks || tasks.length === 0 ? (
          <div className="py-10 text-center">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <FolderKanban className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
              Chưa có task nào
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ở bước sau mình sẽ nối create task và task detail modal.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <button
                type="button"
                key={task.id}
                onClick={() => openTaskModal(task.id)}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-left transition-colors hover:border-indigo-400 dark:hover:border-indigo-500"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{task.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {task.description || 'Chưa có mô tả'}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="block text-xs font-medium text-indigo-600 dark:text-indigo-400">
                      {taskStatusLabels[task.status] || task.status}
                    </span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">
                      Ưu tiên: {priorityLabels[task.priority] || task.priority}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {id && (
        <ProjectTaskModal
          projectId={id}
          taskId={selectedTaskId}
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
        />
      )}
    </div>
  );
}
