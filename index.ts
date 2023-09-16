import axios, { AxiosResponse } from "axios";

import { GetUserResponse } from "user-interfaces";
import {
  GetCustomersResponse,
  GetCustomerResponse,
  CreateCustomerRequest,
  UpdateCustomerRequest,
} from "customer-interfaces";
import { GetShopResponse } from "shop-interfaces";
import {
  GetProductResponse,
  CreateProductRequest,
  UpdateProductRequest,
} from "product-interfaces";
import {
  GetTransactionResponse,
  GetCreatedTransactionResponse,
  CreateTransactionRequest,
} from "transaction-interfaces";

interface BaseError {
  message: string;
  statusCode: number;
}

class Client {
  private secret: string;
  private version: string;

  constructor(secret: string, version: string) {
    this.secret = secret;
    this.version = version;
  }

  protected async makeRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data?: Record<string, any>
  ): Promise<T> {
    try {
      const url = `https://api.pandabase.io/${this.version}/${path}`;
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
        const APIError: BaseError = {
          message: error.response?.data?.message || error.message,
          statusCode: error.response?.status || 500,
        };
        throw APIError;
      } else {
        throw error;
      }
    }
  }
}

class Pandabase extends Client {
  constructor(secret: string, version: string) {
    super(secret, version);

    this.user = {
      get: this.getUser.bind(this),
    };

    this.customer = {
      list: this.getCustomers.bind(this),
      get: this.getCustomer.bind(this),
      create: this.createCustomer.bind(this),
      update: this.updateCustomer.bind(this),
      delete: this.deleteCustomer.bind(this),
    };

    this.shop = {
      get: this.getShop.bind(this),
    };

    this.product = {
      list: this.getProducts.bind(this),
      get: this.getProduct.bind(this),
      create: this.createProduct.bind(this),
      update: this.updateProduct.bind(this),
      delete: this.deleteProduct.bind(this),
    };

    this.transaction = {
      create: this.createTransaction.bind(this),
      get: this.getTransaction.bind(this),
    };
  }

  user: {
    get: () => Promise<GetUserResponse>;
  };

  customer: {
    list: () => Promise<GetCustomersResponse>;
    get: (id: number) => Promise<GetCustomerResponse>;
    create: (data: CreateCustomerRequest) => Promise<GetCustomerResponse>;
    update: (data: UpdateCustomerRequest) => Promise<GetCustomerResponse>;
    delete: (id: number) => Promise<GetCustomerResponse>;
  };

  shop: {
    get: () => Promise<GetShopResponse>;
  };

  product: {
    list: () => Promise<GetProductResponse>;
    get: (id: number) => Promise<GetProductResponse>;
    create: (data: CreateProductRequest) => Promise<GetProductResponse>;
    update: (data: UpdateProductRequest) => Promise<GetProductResponse>;
    delete: (id: number) => Promise<GetProductResponse>;
  };

  transaction: {
    create: (
      data: CreateTransactionRequest
    ) => Promise<GetCreatedTransactionResponse>;
    get: (id: number) => Promise<GetTransactionResponse>;
  };

  // @User Methods

  // @getUser - fetches information about current user
  private async getUser(): Promise<GetUserResponse> {
    const endpoint: string = "/user";
    return this.makeRequest("GET", endpoint);
  }

  // @Customer Methods

  // @getCustomers - Fetches all customers
  private async getCustomers(): Promise<GetCustomersResponse> {
    const endpoint: string = "/customers";
    return this.makeRequest("GET", endpoint);
  }

  // @getCustomer - Fetches a customer using the id
  private async getCustomer(id: number): Promise<GetCustomerResponse> {
    const endpoint: string = "/customer/" + id;
    return this.makeRequest("GET", endpoint);
  }

  // @createCustomer - Creates a customer
  private async createCustomer(
    data: CreateCustomerRequest
  ): Promise<GetCustomerResponse> {
    const endpoint: string = "/customer";
    return this.makeRequest("POST", endpoint, data);
  }

  // @updateCustomer - Updates a customer
  private async updateCustomer(
    data: UpdateCustomerRequest
  ): Promise<GetCustomerResponse> {
    const endpoint: string = "/customer/" + data.id;
    return this.makeRequest("PUT", endpoint, data);
  }

  // @deleteCustomer - Delete a customer
  private async deleteCustomer(id: number): Promise<GetCustomerResponse> {
    const endpoint: string = "/customer/" + id;
    return this.makeRequest("DELETE", endpoint);
  }

  // @Shop Methods

  // @getShop - Get the shop
  private async getShop(): Promise<GetShopResponse> {
    const endpoint: string = "/shop";
    return this.makeRequest("GET", endpoint);
  }

  // @Product Methods

  // @getProducts - Get all products
  private async getProducts(): Promise<GetProductResponse> {
    const endpoint: string = "/products";
    return this.makeRequest("GET", endpoint);
  }

  // @getProduct - Get a product with its id
  private async getProduct(id: number): Promise<GetProductResponse> {
    const endpoint: string = "/product/" + id;
    return this.makeRequest("GET", endpoint);
  }

  // @createProduct - Create a product
  private async createProduct(
    data: CreateProductRequest
  ): Promise<GetProductResponse> {
    const endpoint: string = "/product";
    return this.makeRequest("POST", endpoint, data);
  }

  // @updateProduct - Update a product
  private async updateProduct(
    data: UpdateProductRequest
  ): Promise<GetProductResponse> {
    const endpoint: string = "/product/" + data.id;
    return this.makeRequest("PUT", endpoint, data);
  }

  // @deleteProduct - Delete a product
  private async deleteProduct(id: number): Promise<GetProductResponse> {
    const endpoint: string = "/product/" + id;
    return this.makeRequest("DELETE", endpoint);
  }

  // @Transaction Methods

  // @createCheckout - Creates a checkout session using transaction route
  private createTransaction(
    data: CreateTransactionRequest
  ): Promise<GetCreatedTransactionResponse> {
    const endpoint: string = "/transaction";
    return this.makeRequest("POST", endpoint, data);
  }

  private getTransaction(id: number): Promise<GetTransactionResponse> {
    const endpoint: string = "/transaction/" + id;
    return this.makeRequest("GET", endpoint);
  }
}

export default Pandabase;
