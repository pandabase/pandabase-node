type ShopPlanType = "STANDARD" | "PREMIUM" | "BUSINESS";

export type StoreFlagData = {
  id: string;
  payment_methods: string[];
  storefront_enabled: boolean;
  custom_domain: boolean;
  stripe_connect: boolean;
  is_verified: boolean;
  is_blocked: boolean;
  is_under_review: boolean;
  dispute_protection: boolean;
  is_high_risk: boolean;
  mor_mode: boolean;
  statement_descriptor: string | null;
  customer_support_email: string | null;
  cname_record: string | null;
  timezone: string;
  taxes_enabled: boolean;
  carts_enabled: boolean;
  categories_enabled: boolean;
  blacklists_enabled: boolean;
  payments_enabled: boolean;
  plan: string;
  type: ShopPlanType;
};

export type ShopData = {
  id: string;
  icon: string | null;
  title: string;
  description: string;
  category: string;
  statement_descriptor: string | null;
  customer_support_email: string | null;
  plan: string;
  type: string;
  handle: string;
  balance: number;
  total_sales: number;
  total_revenue: number;
  terms: string | null;
  privacy_policy: string | null;
  refund_policy: string | null;
  links: string[];
  banners: string[];
};

export type RetrieveShopResponse = ShopData;

export type ListShopResponse = {
  shops: Pick<
    ShopData,
    "id" | "title" | "description" | "icon" | "plan" | "balance"
  > & {
    owner: boolean;
  };
};

export type RetrieveFlagsResponse = StoreFlagData;
