// @type Base Type

export type BaseOrderData = {};

// @type Requests

export interface CreateOrderRequestBody {}
export interface UpdateOrderRequestBody {}

// @type Responses

export type ListOrderResponse = { orders: BaseOrderData[] };
export type RetrieveOrderResponse = { order: BaseOrderData };
export type CreateOrderResponse = { order: BaseOrderData };
export type UpdateOrderResponse = { order: BaseOrderData };
export type DeleteOrderResponse = { order: BaseOrderData };
