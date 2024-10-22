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

export type ListCategoryResponse = { blacklist: BaseBlacklistData[] };
export type RetrieveCategoryResponse = { blacklist: BaseBlacklistData };
export type CreateCategoryResponse = { blacklist: BaseBlacklistData };
export type UpdateCategoryResponse = { blacklist: BaseBlacklistData };
export type DeleteCategoryResponse = { blacklist: BaseBlacklistData };
