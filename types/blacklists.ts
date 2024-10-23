// @type Base Type

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

export interface CreateBlacklistRequestBody {}
export interface UpdateBlacklistRequestBody {}

// @type Responses

export type ListBlacklistResponse = { blacklist: BaseBlacklistData[] };
export type RetrieveBlacklistResponse = { blacklist: BaseBlacklistData };
export type CreateBlacklistResponse = { blacklist: BaseBlacklistData };
export type UpdateBlacklistResponse = { blacklist: BaseBlacklistData };
export type DeleteBlacklistResponse = { blacklist: BaseBlacklistData };
