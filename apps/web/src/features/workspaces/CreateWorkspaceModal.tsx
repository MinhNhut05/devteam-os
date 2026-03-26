import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace';
import { useWorkspaceStore } from '@/stores/workspace.store';
import { Modal } from '@/components/ui';

// Validation schema
const createSchema = z.object({
  name: z.string().min(2, 'Tên tối thiểu 2 ký tự').max(50, 'Tên tối đa 50 ký tự'),
  slug: z
    .string()
    .min(2, 'Slug tối thiểu 2 ký tự')
    .max(50, 'Slug tối đa 50 ký tự')
    .regex(/^[a-z0-9-]+$/, 'Chỉ cho phép chữ thường, số và dấu gạch ngang'),
});

type CreateWorkspaceForm = z.infer<typeof createSchema>;

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateWorkspaceModal({ isOpen, onClose }: CreateWorkspaceModalProps) {
  const createWorkspace = useCreateWorkspace();
  const setCurrentWorkspace = useWorkspaceStore((s) => s.setCurrentWorkspace);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: '',
      slug: '',
    },
  });

  // Auto-generate slug from name
  const watchName = watch('name');
  useEffect(() => {
    if (watchName) {
      const slug = watchName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
      setValue('slug', slug, { shouldValidate: true });
    }
  }, [watchName, setValue]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Submit handler
  const onSubmit = (data: CreateWorkspaceForm) => {
    createWorkspace.mutate(
      {
        name: data.name,
        slug: data.slug,
      },
      {
        onSuccess: (newWorkspace) => {
          setCurrentWorkspace({ ...newWorkspace, role: 'OWNER' });
          onClose();
          navigate(`/workspaces/${newWorkspace.id}/settings`);
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tạo workspace mới">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="create-name" className="label">
            Tên workspace
          </label>
          <input
            id="create-name"
            type="text"
            {...register('name')}
            className={`input ${errors.name ? 'input-error' : ''}`}
            placeholder="My Workspace"
            autoFocus
            aria-invalid={errors.name ? 'true' : undefined}
            aria-describedby={errors.name ? 'create-name-error' : undefined}
          />
          {errors.name && (
            <p id="create-name-error" className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="create-slug" className="label">
            Slug
          </label>
          <input
            id="create-slug"
            type="text"
            {...register('slug')}
            className={`input ${errors.slug ? 'input-error' : ''}`}
            placeholder="my-workspace"
            aria-invalid={errors.slug ? 'true' : undefined}
            aria-describedby={errors.slug ? 'create-slug-error' : 'create-slug-helper'}
          />
          {errors.slug ? (
            <p id="create-slug-error" className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.slug.message}
            </p>
          ) : (
            <p id="create-slug-helper" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Tự động tạo từ tên. Có thể chỉnh sửa.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
          >
            Hủy
          </button>
          <button
            type="submit"
            disabled={createWorkspace.isPending}
            className="btn-primary"
          >
            {createWorkspace.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang tạo...
              </>
            ) : (
              'Tạo workspace'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
