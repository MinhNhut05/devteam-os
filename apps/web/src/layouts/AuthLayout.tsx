import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 dark:text-primary-400">
            DevTeamOS
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
            Quản lý tiến độ dự án hiệu quả
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
