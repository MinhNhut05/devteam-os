export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function createPaginationMeta(total: number, page: number, limit: number): PaginationMeta {
  const totalPages = Math.max(1, Math.ceil(total / Math.max(limit, 1)));
  return { total, page, limit, totalPages };
}

export function paginateArray<T>(items: T[], page: number, limit: number): { data: T[]; meta: PaginationMeta } {
  const safePage = Math.max(page, 1);
  const safeLimit = Math.max(limit, 1);
  const start = (safePage - 1) * safeLimit;
  const data = items.slice(start, start + safeLimit);
  return {
    data,
    meta: createPaginationMeta(items.length, safePage, safeLimit),
  };
}
