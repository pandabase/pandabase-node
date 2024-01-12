declare interface Base {
  message: string;
  statusCode: number;
}

declare module "user-interfaces" {
  interface GetUserResponse extends Base {
    payload: {
      image_hash: string;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      country: string;
      phone: string;
      deleted: boolean;
      balance: number;
      created_at: string;
      updated_at: string;
    };
  }
}

declare module "shop-interfaces" {
  type IShoptype = "NORMAL" | "CONNECTED";

  interface GetShopsResponse extends Base {
    payload: {
      id: string;
      image_hash: string;
      title: string;
      description: string;
      category: string[];
      verified: boolean;
      signed_image_url: string;
    }[];
  }

  interface GetShopResponse extends Base {
    payload: {
      id: string;
      image_hash: string;
      title: string;
      description: string;
      category: string[];
      plan: string;
      domain: boolean;
      record: string;
      handle: string;
      balance: number;
      sales: number;
      total_earned: number;
      has_storefront: boolean;
      force_ssl: boolean;
      timezone: string;
      verified: boolean;
      links: string[];
      banners: {
        img1: string;
        img2: string;
      };
      type: IShoptype;
      blocked: boolean;
      created_at: string;
      updated_at: string;
      signed_image_url: string;
    };
  }
}

declare module "product-interfaces" {
  interface GetProductsResponse extends Base {
    payload: {
      id: string;
      title: string;
      subtitle: string;
      description: string;
      handle: string;
      price: number;
      currency: string;
      images: string[];
      in_stock: boolean;
      discountable: boolean;
      discount: number;
      discount_type: "FIXED" | "PERCENTAGE";
      type: "SERIAL" | "SERVICE";
      created_at: string;
      serial_count?: number;
    }[];
  }

}