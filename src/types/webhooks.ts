// @type Base Type

export type BaseWebhookData = {
  id: string;
  name: string;
  url: string;
  secret: string;
  events: WebhookEvent[];
  disabled: boolean;
  created_at: string;
  updated_at: string;
};

export enum WebhookEvent {
  ORDER_CREATED = "ORDER_CREATED",
  ORDER_UPDATED = "ORDER_UPDATED",
  ORDER_COMPLETED = "ORDER_COMPLETED",
  ORDER_CANCELLED = "ORDER_CANCELLED",
  ORDER_REFUNDED = "ORDER_REFUNDED",
  PAYMENT_CREATED = "PAYMENT_CREATED",
  PAYMENT_UPDATED = "PAYMENT_UPDATED",
  PAYMENT_SUCCEEDED = "PAYMENT_SUCCEEDED",
  PAYMENT_FAILED = "PAYMENT_FAILED",
  PAYMENT_REFUNDED = "PAYMENT_REFUNDED",
  PAYMENT_PENDING = "PAYMENT_PENDING",
  DISPUTE_CREATED = "DISPUTE_CREATED",
  DISPUTE_UPDATED = "DISPUTE_UPDATED",
  DISPUTE_WON = "DISPUTE_WON",
  DISPUTE_LOST = "DISPUTE_LOST",
  SUBSCRIPTION_CREATED = "SUBSCRIPTION_CREATED",
  SUBSCRIPTION_UPDATED = "SUBSCRIPTION_UPDATED",
  SUBSCRIPTION_CANCELLED = "SUBSCRIPTION_CANCELLED",
  SUBSCRIPTION_TRIAL_STARTED = "SUBSCRIPTION_TRIAL_STARTED",
  SUBSCRIPTION_TRIAL_ENDED = "SUBSCRIPTION_TRIAL_ENDED",
  SUBSCRIPTION_RENEWED = "SUBSCRIPTION_RENEWED",
  SUBSCRIPTION_PAUSED = "SUBSCRIPTION_PAUSED",
  SUBSCRIPTION_RESUMED = "SUBSCRIPTION_RESUMED",
  INVOICE_CREATED = "INVOICE_CREATED",
  INVOICE_UPDATED = "INVOICE_UPDATED",
  INVOICE_PAID = "INVOICE_PAID",
  INVOICE_PAYMENT_FAILED = "INVOICE_PAYMENT_FAILED",
  INVOICE_SENT = "INVOICE_SENT",
  INVOICE_VOIDED = "INVOICE_VOIDED",
  INVOICE_FINALIZED = "INVOICE_FINALIZED",
  INVOICE_MARKED_UNCOLLECTIBLE = "INVOICE_MARKED_UNCOLLECTIBLE",
  INVOICE_DELETED = "INVOICE_DELETED",
}

// @type Requests

export interface CreateWebhookRequestBody
  extends Pick<BaseWebhookData, "name" | "events" | "url" | "disabled"> {}

export interface UpdateWebhookRequestBody
  extends Partial<CreateWebhookRequestBody> {}

// @type Responses

export type ListWebhookResponse = {
  webhooks: Pick<
    BaseWebhookData,
    "id" | "name" | "url" | "disabled" | "events"
  >;
};

export type RetrieveWebhookResponse = {
  webhook: Omit<BaseWebhookData, "secret">;
};

export type CreateWebhookResponse = {
  webhook: Pick<BaseWebhookData, "id" | "name" | "url" | "secret">;
};

export type UpdateWebhookResponse = { webhook: Pick<BaseWebhookData, "id"> };

export type DeleteWebhookResponse = { webhook: Pick<BaseWebhookData, "id"> };
