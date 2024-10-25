export type ShopPlan = "FREE" | "PREMIUM" | "BUSINESS";

export type PaymentMethod =
  | "multiple_cards"
  | "cashapp"
  | "apple_pay"
  | "google_pay"
  | "link"
  | "paypal"
  | "venmo"
  | "bitcoin"
  | "litecoin"
  | "ethereum";

export type ShopCategory =
  | "FASHION"
  | "ELECTRONICS"
  | "HOME_LIVING"
  | "BEAUTY"
  | "SPORTS"
  | "TOYS"
  | "FOOD_BEVERAGE"
  | "HEALTH_WELLNESS"
  | "ART_CRAFTS"
  | "PET_SUPPLIES"
  | "AUTOMOTIVE"
  | "BOOKS"
  | "MUSIC"
  | "GIFT_SHOPS"
  | "TRAVEL"
  | "TECHNOLOGY"
  | "OFFICE_SUPPLIES"
  | "DIGITAL_PRODUCTS"
  | "SOFTWARE"
  | "EBOOKS"
  | "ONLINE_COURSES"
  | "GRAPHIC_DESIGN"
  | "WEB_DEV_SERVICES"
  | "MARKETING_SERVICES"
  | "SOCIAL_MEDIA_TOOLS"
  | "PHOTOGRAPHY"
  | "STOCK_MEDIA"
  | "APPS"
  | "VIRTUAL_EVENTS"
  | "SUBSCRIPTIONS"
  | "CONSULTING"
  | "DIGITAL_MARKETING";

export type BaseShopFlagData = {
  id: string;
  payment_methods: PaymentMethod[];
  storefront_enabled: boolean;
  custom_domain: boolean;
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
  tax_calculation_enabled: boolean;
  localized_pricing_enabled: boolean;
  regional_pricing_enabled: boolean;
  checkout_collect_phone_enabled: boolean;
  checkout_verify_email_enabled: boolean;
  plan: ShopPlan;
};

export type BaseShopData = {
  id: string;
  icon: string | null;
  icon_url: string | null;
  title: string;
  description: string;
  category: ShopCategory;
  links: string[];
  banners: string[];
  plan: ShopPlan;
  type: string;
  handle: string;
  balance: number;
  total_sales: number;
  total_revenue: number;
  terms: string | null;
  privacy_policy: string | null;
  refund_policy: string | null;
};

// @type Responses

export type RetrieveShopResponse = { shop: BaseShopData };

export type ListShopResponse = {
  shops: (Pick<
    BaseShopData,
    "id" | "title" | "description" | "icon" | "icon_url"
  > & {
    owner: boolean;
  })[];
};

export type RetrieveFlagsResponse = { flags: BaseShopFlagData };
