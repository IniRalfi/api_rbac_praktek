export interface PaginationParams {
  page?: any;
  limit?: any;
}

export interface PaginationResult {
  skip: number;
  take: number;
}

// 1. Mengubah query string 'page' dan 'limit' menjadi parameter Prisma (skip & take)
export const getPaginationResult = (params: PaginationParams): PaginationResult => {
  const page = Math.max(1, parseInt(params.page, 10) || 1);
  const limit = Math.max(1, parseInt(params.limit, 10) || 10);
  return {
    skip: (page - 1) * limit,
    take: limit,
  };
};

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 2. Format metadata pagination untuk disertakan di success response API
export const getMetaResult = (
  page: any,
  limit: any,
  total: number
): PaginationMeta => {
  const parsedPage = Math.max(1, parseInt(page, 10) || 1);
  const parsedLimit = Math.max(1, parseInt(limit, 10) || 10);

  return {
    page: parsedPage,
    limit: parsedLimit,
    total,
    totalPages: Math.ceil(total / parsedLimit),
  };
};

