import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useCreateTask } from '@/hooks/useCreateTask';
import { Modal } from '@/components/ui';

const createTaskSchema = z.object({
  title: z.string().min(2, 'Tiêu đề tối thiểu 2 ký tự').max(200, 'Tiêu đề tối đa 200 ký tự'),
  description: z.string().max(2000, 'Mô tả tối đa 2000 ký tự').optional(),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).default('TODO'),
  priority: z.enum(['URGENT', 'HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
  dueDate: z.string().optional(),
});

type CreateTaskForm = z.infer<typeof createTaskSchema>;

interface CreateTaskModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTaskModal({ projectId, isOpen, onClose }: CreateTaskModalProps) {
  const createTask = useCreateTask();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'TODO',
      priority: 'MEDIUM',
      dueDate: '',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: CreateTaskForm) => {
    createTask.mutate(
      {
        projectId,
        data: {
          title: data.title,
          description: data.description?.trim() || undefined,
          status: data.status,
          priority: data.priority,
          dueDate: data.dueDate || undefined,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo task mới" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="task-title" className="label">
            Tiêu đề
          </label>
          <input
            id="task-title"
            type="text"
            {...register('title')}
            className={`input ${errors.title ? 'input-error' : ''}`}
            placeholder="Tên công việc"
            autoFocus
            aria-invalid={errors.title ? 'true' : undefined}
            aria-describedby={errors.title ? 'task-title-error' : undefined}
          />
          {errors.title && (
            <p id="task-title-error" className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="task-status" className="label">
              Trạng thái
            </label>
            <select id="task-status" {...register('status')} className="input">
              <option value="TODO">Cần làm</option>
              <option value="IN_PROGRESS">Đang làm</option>
              <option value="DONE">Hoàn thành</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-priority" className="label">
              Ưu tiên
            </label>
            <select id="task-priority" {...register('priority')} className="input">
              <option value="LOW">Thấp</option>
              <option value="MEDIUM">Trung bình</option>
              <option value="HIGH">Cao</option>
              <option value="URGENT">Khẩn cấp</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="task-dueDate" className="label">
            Hạn hoàn thành
          </label>
          <input id="task-dueDate" type="date" {...register('dueDate')} className="input" />
        </div>

        <div>
          <label htmlFor="task-description" className="label">
            Mô tả
          </label>
          <textarea
            id="task-description"
            {...register('description')}
            className={`input min-h-24 resize-none ${errors.description ? 'input-error' : ''}`}
            placeholder="Mô tả chi tiết công việc (tùy chọn)"
            aria-invalid={errors.description ? 'true' : undefined}
            aria-describedby={errors.description ? 'task-desc-error' : undefined}
          />
          {errors.description && (
            <p id="task-desc-error" className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Hủy
          </button>
          <button type="submit" disabled={createTask.isPending} className="btn-primary">
            {createTask.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang tạo...
              </>
            ) : (
              'Tạo task'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
