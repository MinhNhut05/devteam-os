import { CheckCircle2, Clock, AlertTriangle, Users } from 'lucide-react';
import { useWorkspaceStore } from '@/stores/workspace.store';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { PageTransition, Card } from '@/components/ui';
import ProjectProgressWidget from './ProjectProgressWidget';
import TasksStatusChart from './TasksStatusChart';
import OverdueTasksWidget from './OverdueTasksWidget';
import MemberWorkloadChart from './MemberWorkloadChart';
import RecentActivityWidget from './RecentActivityWidget';

function SkeletonCard() {
  return (
    <div className="card p-6">
      <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer rounded w-1/3 mb-4" />
      <div className="space-y-3">
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer rounded w-full" />
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer rounded w-5/6" />
      </div>
      <div className="mt-4 h-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer rounded" />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  colorClass: string;
}

function StatCard({ icon, label, value, colorClass }: StatCardProps) {
  return (
    <Card hover padding="md">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${colorClass}`}>
          {icon}
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const currentWorkspace = useWorkspaceStore((s) => s.currentWorkspace);
  const { data: stats, isLoading, isError } = useDashboardStats(currentWorkspace?.id);

  // No workspace selected
  if (!currentWorkspace) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tổng quan về tiến độ dự án của bạn
          </p>
        </div>
        <div className="card p-12 text-center">
          <p className="text-gray-400 text-lg">
            Chọn workspace để xem dashboard
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard — {currentWorkspace.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tổng quan về tiến độ dự án của bạn
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard />
      </div>
    );
  }

  // Error state
  if (isError || !stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard — {currentWorkspace.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tổng quan về tiến độ dự án của bạn
          </p>
        </div>
        <div className="card p-12 text-center">
          <p className="text-red-500">
            Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }

  // Compute summary stats
  const totalTasks = (stats.tasksByStatus.TODO ?? 0) + (stats.tasksByStatus.IN_PROGRESS ?? 0) + (stats.tasksByStatus.DONE ?? 0);
  const doneTasks = stats.tasksByStatus.DONE ?? 0;
  const overdueCount = stats.overdueTasks?.length ?? 0;
  const memberCount = stats.memberWorkload?.length ?? 0;

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard — {currentWorkspace.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Tổng quan về tiến độ dự án của bạn
          </p>
        </div>

        {/* Stat summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<Clock className="h-5 w-5 text-primary-600" />}
            label="Tổng tasks"
            value={totalTasks}
            colorClass="bg-primary-100 dark:bg-primary-900/30"
          />
          <StatCard
            icon={<CheckCircle2 className="h-5 w-5 text-success-600" />}
            label="Hoàn thành"
            value={doneTasks}
            colorClass="bg-success-100 dark:bg-success-900/30"
          />
          <StatCard
            icon={<AlertTriangle className="h-5 w-5 text-danger-600" />}
            label="Quá hạn"
            value={overdueCount}
            colorClass="bg-danger-100 dark:bg-danger-900/30"
          />
          <StatCard
            icon={<Users className="h-5 w-5 text-info-600" />}
            label="Thành viên"
            value={memberCount}
            colorClass="bg-info-100 dark:bg-info-900/30"
          />
        </div>

        {/* Row 1: Project Progress + Tasks Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProjectProgressWidget projects={stats.projectsProgress} />
          <TasksStatusChart tasksByStatus={stats.tasksByStatus} />
        </div>

        {/* Row 2: Overdue Tasks + Member Workload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <OverdueTasksWidget overdueTasks={stats.overdueTasks} />
          <MemberWorkloadChart memberWorkload={stats.memberWorkload} />
        </div>

        {/* Row 3: Recent Activity (full width) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <RecentActivityWidget workspaceId={currentWorkspace.id} />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
