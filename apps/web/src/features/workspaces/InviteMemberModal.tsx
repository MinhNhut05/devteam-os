import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useInviteMember } from '@/hooks/useInviteMember';
import { Modal } from '@/components/ui';

// Validation schema
const inviteSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  role: z.enum(['ADMIN', 'MEMBER', 'VIEWER']),
});

type InviteForm = z.infer<typeof inviteSchema>;

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
}

const roleOptions = [
  { value: 'ADMIN' as const, label: 'Quản trị', description: 'Quản lý thành viên và cài đặt' },
  { value: 'MEMBER' as const, label: 'Thành viên', description: 'Tạo và chỉnh sửa tasks' },
  { value: 'VIEWER' as const, label: 'Xem', description: 'Chỉ xem, không chỉnh sửa' },
];

export default function InviteMemberModal({ isOpen, onClose, workspaceId }: InviteMemberModalProps) {
  const inviteMember = useInviteMember();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteForm>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: '',
      role: 'MEMBER',
    },
  });

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  // Submit handler
  const onSubmit = (data: InviteForm) => {
    inviteMember.mutate(
      {
        workspaceId,
        data: {
          email: data.email,
          role: data.role,
        },
      },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Mời thành viên">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="invite-email" className="label">
            Email
          </label>
          <input
            id="invite-email"
            type="email"
            {...register('email')}
            className={`input ${errors.email ? 'input-error' : ''}`}
            placeholder="member@example.com"
            autoFocus
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'invite-email-error' : undefined}
          />
          {errors.email && (
            <p id="invite-email-error" className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="invite-role" className="label">
            Vai trò
          </label>
          <select
            id="invite-role"
            {...register('role')}
            className="input"
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} — {option.description}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="mt-1 text-sm text-danger-600 dark:text-danger-400" role="alert">
              {errors.role.message}
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
            disabled={inviteMember.isPending}
            className="btn-primary"
          >
            {inviteMember.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Đang gửi...
              </>
            ) : (
              'Gửi lời mời'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
