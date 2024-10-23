// @type Base Type

export type BasePaymentData = {};

// @type Requests

export interface CreatePaymentRequestBody {}
export interface UpdatePaymentRequestBody {}

// @type Responses

export type ListPaymentResponse = { payments: BasePaymentData[] };
export type RetrievePaymentResponse = { payment: BasePaymentData };
export type CreatePaymentResponse = { payment: BasePaymentData };
export type UpdatePaymentResponse = { payment: BasePaymentData };
export type DeletePaymentResponse = { payment: BasePaymentData };
