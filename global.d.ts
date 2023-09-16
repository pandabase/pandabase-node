declare module "user-interfaces" {
  interface GetUserResponse {
    id: number;
    image_hash: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    country: string;
    balance: number;
    metadata: string[];
    verified: boolean;
    limit: number;
    role: string;
    created_at: string;
    updated_at: string;
  }
}

declare module "customer-interfaces" {
  interface GetCustomersResponse {
    data: Array<{}>;
  }

  interface GetCustomerResponse {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone: number;
    currency: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
  }

  interface CreateCustomerRequest {
    email: string;
    first_name: string;
    last_name: string;
    phone?: number | null | undefined;
    currency: string | null | undefined;
  }

  interface UpdateCustomerRequest {
    id: number;
    data: {
      email?: string;
      first_name?: string;
      last_name?: string;
      phone?: number | null | undefined;
      currency?: string | null | undefined;
    };
  }
}

declare module "shop-interfaces" {
  interface GetShopResponse {
    id: number;
    image_hash: string;
    title: string;
    description: string;
    meta_data: string[];
    css: string?;
    category: string[];
    plan: "Free" | "Pro" | "Enterprise";
    domain: boolean;
    handle: string;
    has_storefront: boolean;
    force_ssl: boolean;
    checkout_api_supported: boolean;
    timezone: string;
    created_at: string;
  }
}

declare module "product-interfaces" {
  interface GetProductResponse {
    id: number;
    title: string;
    description: string;
    price_usd: number;
    handle: string;
    images: string[];
    in_stock: boolean;
    tags: string[];
    discount: string;
    created_at: string;
    updated_at: string;
  }

  interface CreateProductRequest {
    title: string;
    description: string;
    price_usd: number;
    handle: string;
    images: string[];
    in_stock: boolean;
    tags: string[];
  }

  interface UpdateProductRequest {
    id: number;
    data: {
      title?: string;
      description?: string;
      price_usd?: number;
      handle?: string;
      images?: string[];
      in_stock?: boolean;
      tags?: string[];
    };
  }
}

declare module "transaction-interfaces" {
  interface CreateTransactionRequest {
    product_id: number;
    customer_id: number;
    provider: "Stripe" | "PayPal" | "Coinbase";
  }

  interface GetCreatedTransactionResponse {
    id: number;
    intent_id: string;
    status: "Success" | "Pending" | "Failed";
    amount: number;
    order_information: {
      order_id: number;
      customer_id: number;
      product_id: number;
      order_status: "pending" | "processing" | "completed" | "cancelled";
    };
    provider: "Stripe" | "PayPal" | "Coinbase";
    checkout_url: string;
  }

  interface GetTransactionResponse {
    id: number;
    intent_id: string;
    status: "Success" | "Pending" | "Failed";
    amount: number;
    order_information: {
      order_id: number;
      customer_id: number;
      product_id: number;
      order_status: "pending" | "processing" | "completed" | "cancelled";
    };
    provider: "Stripe" | "PayPal" | "Coinbase";
  }
}
