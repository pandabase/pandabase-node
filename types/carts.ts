// @type Base Type

export type BaseCartData = {};

// @type Requests

export interface CreateCartRequestBody {}
export interface UpdateCartRequestBody {}

// @type Responses

export type RetrieveCartResponse = { cart: BaseCartData };
export type CreateCartResponse = { cart: BaseCartData };
export type UpdateCartResponse = { cart: BaseCartData };
export type DeleteCartResponse = { cart: BaseCartData };
