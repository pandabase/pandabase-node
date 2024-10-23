import { PaginatedResponse } from "./common";

// @type Unions

export type CouponType = "PERCENTAGE" | "FIXED";

// @type Base Type

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
  updated_at: string;
}

// @type Requests

export interface CreateCouponRequestBody
  extends Pick<BaseCouponData, "name" | "type" | "code" | "value" | "limit"> {
  limited: boolean;
}

export type UpdateCouponRequestBody = Partial<CreateCouponRequestBody>;

// @type Responses

export type ListCouponResponse = PaginatedResponse<
  "coupons",
  Omit<BaseCouponData, "created_at" | "updated_at">[]
>;

export type RetrieveCouponResponse = {
  coupon: Omit<BaseCouponData, "updated_at">[];
};

export type CreateCouponResponse = { coupon: Pick<BaseCouponData, "id"> };

export type UpdateCouponResponse = { coupon: Pick<BaseCouponData, "id"> };

export type DeleteCouponResponse = { coupon: Pick<BaseCouponData, "id"> };
