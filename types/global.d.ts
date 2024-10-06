export interface PandabaseOptions {
  idempotency_enabled?: boolean;
  base_url?: string;
  max_retries: number;
}

export interface PaginationMeta {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
  next_page_url: string | null;
  previous_page_url: string | null;
  first_page_url: string;
  last_page_url: string;
}

type CouponType = "PERCENTAGE" | "FIXED";

export interface Coupon {
  id: string;
  name: string;
  code: string;
  type: CouponType;
  value: number;
  limit: number;
  limit_enabled: boolean;
  enabled: boolean;
  times_used: number;
  created_at: string;
}

export interface CreateCoupon {
  name: string;
  type: CouponType;
  code: string;
  value: number;
  limit: number;
  limited: boolean;
}

export interface CouponListResponse {
  coupons: Coupon[];
  meta: PaginationMeta;
}
