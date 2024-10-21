import { PaginatedResponse, PaginationMeta } from "../common";

// UNION TYPES
type CouponType = "PERCENTAGE" | "FIXED";

// BASE

export interface BaseCouponData {
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

// REQUEST

export interface CreateCouponRequestBody {
  name: string;
  type: CouponType;
  code: string;
  value: number;
  limit: number;
  limited: boolean;
}

export type UpdateCouponRequestBody = Partial<CreateCouponRequestBody>;

// RESPONSE

export type ListCouponResponse = PaginatedResponse<"coupons", BaseCouponData[]>;

export type RetrieveCouponResponse = { coupon: BaseCouponData };

export type CreateCouponResponse = { coupon: Pick<BaseCouponData, "id"> };

export type UpdateCouponResponse = { coupon: Pick<BaseCouponData, "id"> };

export type DeleteCouponResponse = { coupon: Pick<BaseCouponData, "id"> };
