export interface PandabaseOptions {
  idempotency_enabled?: boolean | true;
  retries: {
    max_retries?: number;
    base_delay?: number;
    max_delay?: number;
  };
  sandbox?: boolean;
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  payload: T;
}

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};

export type PaginationMeta = {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  next_page_url: string | null;
  previous_page_url: string | null;
  first_page_url: string;
  last_page_url: string;
};

export type PaginatedResponse<K extends string, T> = {
  [key in K]: T;
} & {
  meta: PaginationMeta;
};

export type PaginationQuerystring = {
  page_size: number;
  page: number;
  filter?: string;
  sort?: string;
  search?: string;
};
