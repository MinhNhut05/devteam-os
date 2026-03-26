import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import ColorPresetPicker from '@/components/ColorPresetPicker';
import ProjectIconPicker from '@/components/ProjectIconPicker';
import { useCreateProject } from '@/hooks/useCreateProject';
import { Modal } from '@/components/ui';

const createProjectSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự').max(80, 'Tên tối đa 80 ký tự'),
  description: z.string().max(500, 'Mô tả tối đa 500 ký tự').optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Màu không hợp lệ'),
  icon: z.string().nullable().optional(),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

interface CreateProjectModalProps {
  workspaceId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectModal({
  workspaceId,
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const createProject = useCreateProject();
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      color: '#6366f1',
      icon: null,
    },
  });

  const currentColor = watch('color');

  useEffect(() => {
    if (!isOpen) {
      reset();
      setSelectedIcon(null);
    }
  }, [isOpen, reset]);

  const handleIconChange = (icon: string | null) => {
    setSelectedIcon(icon);
    setValue('icon', icon);
  };

  const onSubmit = (data: CreateProjectForm) => {
    createProject.mutate(
      {
        workspaceId,
        data: {
          name: data.name,
          description: data.description?.trim() || undefined,
          color: data.color,
          icon: data.icon ?? undefined,
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
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo dự án mới" size="lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Icon picker */}
        <div>
          <ProjectIconPicker
            currentIcon={selectedIcon}
            currentImage={null}
            onIconChange={handleIconChange}
          />
        </div>

        <div>
          <label htmlFor="project-name" className="label">
            Tên dự án
          </label>
          <input
            id="project-name"
            type="text"
            {...register('name')}
            className={`input ${errors.name ? 'input-error' : ''}`}
            placeholder="Website khách hàng"
            autoFocus
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'project-name-error' : undefined}
          />
          {errors.name && (
            <p id="project-name-error" className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="project-description" className="label">
            Mô tả
          </label>
          <textarea
            id="project-description"
            {...register('description')}
            className={`input min-h-24 resize-none ${errors.description ? 'input-error' : ''}`}
            placeholder="Mô tả ngắn về mục tiêu dự án"
            aria-invalid={errors.description ? 'true' : undefined}
            aria-describedby={errors.description ? 'project-desc-error' : undefined}
          />
          {errors.description && (
            <p id="project-desc-error" className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Color preset picker */}
        <div>
          <label className="label">Màu đại diện</label>
          <ColorPresetPicker
            value={currentColor}
            onChange={(color) => setValue('color', color)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Hủy
          </button>
          <button type="submit" disabled={createProject.isPending} className="btn-primary">
            {createProject.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang tạo...
              </>
            ) : (
              'Tạo dự án'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
