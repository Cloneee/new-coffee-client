export interface PaginationParams {
  limit?: number;
  currentPage: number;
  totalPage: number;
}

export interface ListResponse<T> {
  data: T[];
  limit?: number;
  currentPage: number;
  totalPage: number;
}
export interface LoginResponseType {
  name: string;
  role: string | null | undefined;
  token: string;
}

export interface FilterFormat {
  text: string;
  value: string;
}

export interface ListParams {
  page: number;
  limit?: number;
  sort?: number;
  order?: 'asc' | 'desc';
  id?: string
}


