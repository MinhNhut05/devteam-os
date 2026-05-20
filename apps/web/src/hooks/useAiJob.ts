import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import api from '@/services/api';

interface AiJobAccepted {
  jobId: string;
  status: 'pending';
}

interface AiJobResponse<T> {
  jobId: string;
  status: 'pending' | 'done' | 'failed';
  result?: T;
  error?: string;
}

const POLL_INTERVAL_MS = 1500;

export function useAiJob<TRequest, TResult>(endpoint: string) {
  const [jobId, setJobId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: TRequest): Promise<AiJobAccepted> => {
      const res = await api.post<AiJobAccepted>(endpoint, data);
      return res.data;
    },
    onSuccess: (resp) => setJobId(resp.jobId),
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'AI không phản hồi, thử lại sau';
      toast.error(message);
      setJobId(null);
    },
  });

  const job = useQuery({
    queryKey: ['ai-job', jobId],
    queryFn: async (): Promise<AiJobResponse<TResult>> => {
      const res = await api.get<AiJobResponse<TResult>>(`/ai/jobs/${jobId}`);
      return res.data;
    },
    enabled: !!jobId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return !status || status === 'pending' ? POLL_INTERVAL_MS : false;
    },
  });

  useEffect(() => {
    if (job.data?.status === 'failed') {
      toast.error(job.data.error || 'AI không phản hồi, thử lại sau');
    }
  }, [job.data?.status, job.data?.error]);

  const isPolling = !!jobId && (!job.data || job.data.status === 'pending');
  const isPending = mutation.isPending || isPolling;
  const data = job.data?.status === 'done' ? job.data.result : undefined;
  const isError = mutation.isError || job.data?.status === 'failed';
  const isSuccess = job.data?.status === 'done';

  const reset = useCallback(() => {
    mutation.reset();
    setJobId(null);
  }, [mutation]);

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    data,
    isPending,
    isError,
    isSuccess,
    reset,
    jobId,
  };
}
