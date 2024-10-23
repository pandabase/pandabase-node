// @type Base Type

import { PaginatedResponse } from "./common";

export type BaseBlacklistData = {
  id: string;
  name: string;
  ips: string[];
  ip_ranges: string[];
  asns: string[];
  countries: string[];
  created_at: string;
  updated_at: string;
};

// @type Requests

export interface CreateBlacklistRequestBody {
  blacklist: Pick<BaseBlacklistData, "id">;
}
export interface UpdateBlacklistRequestBody {
  blacklist: Pick<BaseBlacklistData, "id">;
}

// @type Responses

export type ListBlacklistResponse = PaginatedResponse<
  "blacklists",
  Pick<BaseBlacklistData, "id" | "asns" | "ips" | "ip_ranges" | "countries">[]
>;

export type RetrieveBlacklistResponse = {
  blacklist: Pick<
    BaseBlacklistData,
    "id" | "asns" | "ips" | "ip_ranges" | "countries"
  >;
};

export type CreateBlacklistResponse = {
  blacklist: Pick<BaseBlacklistData, "id">;
};

export type UpdateBlacklistResponse = {
  blacklist: Pick<BaseBlacklistData, "id">;
};

export type DeleteBlacklistResponse = {
  blacklist: Pick<BaseBlacklistData, "id">;
};
