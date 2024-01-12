import axios, { AxiosResponse } from "axios";

import { GetUserResponse } from "user-interfaces";
import { GetShopResponse, GetShopsResponse } from "shop-interfaces";
import { GetProductsResponse } from "product-interfaces";

class Client {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  protected async makeRequest<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    path: string,
    data?: Record<string, any>
  ): Promise<T> {
    try {
      const url = `https://api.pandabase.io/${path}`;
      const headers = {
        Authorization: `Bearer ${this.secret}`,
      };
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data,
        headers,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const APIError: Base = {
          statusCode: error.response?.status || 500,
          message: error.response?.data?.message || error.message,
        };
        throw APIError;
      } else {
        throw error;
      }
    }
  }
}

class Pandabase extends Client {
  constructor(secret: string) {
    super(secret);

    this.user = {
      get: this.getUser.bind(this),
    };

    this.shop = {
      list: this.getShops.bind(this),
      get: this.getShop.bind(this),
    };

    this.product = {
      list: this.getProducts.bind(this),
      get: this.getProduct.bind(this),
    };
  }

  user: {
    get: () => Promise<GetUserResponse>;
  };

  shop: {
    list: () => Promise<GetShopsResponse>;
    get: (id: string) => Promise<GetShopResponse>;
  };

  product: {
    list: (shop_id: string) => Promise<GetProductsResponse>;
    get: (shop_id: string, id: string) => Promise<GetProductsResponse>;
  };

  // @getUser - fetches information about current user
  private async getUser(): Promise<GetUserResponse> {
    const endpoint: string = "user";
    return this.makeRequest("GET", endpoint);
  }

  // @getShop - Get the shop
  private async getShops(): Promise<any> {
    const endpoint: string = "shop";
    return this.makeRequest("GET", endpoint);
  }

  private async getShop(id: string): Promise<GetShopResponse> {
    const endpoint: string = "shop/" + id;
    return this.makeRequest("GET", endpoint);
  }

  // @getProducts - Get all products
  private async getProducts(shop_id: string): Promise<GetProductsResponse> {
    const endpoint: string = "shop/" + shop_id + "/products";
    return this.makeRequest("GET", endpoint);
  }

  // @getProduct - Get a product with its id
  private async getProduct(
    shop_id: string,
    id: string
  ): Promise<GetProductsResponse> {
    const endpoint: string = "shop/" + shop_id + "/products/" + id;
    return this.makeRequest("GET", endpoint);
  }
}

export { Pandabase };