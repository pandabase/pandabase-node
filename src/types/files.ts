// @type Base Type

export type BaseFileData = {
  id: string;
  path: string;
  preview_url: string;
  hash: string;
  resolutions: number[];
};

export type DownloadableFile = {
  id: string;
  name: string;
  size: string;
  path: string;
  hash: string;
  created_at: string;
};
