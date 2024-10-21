export const formatUrlParams = (
  baseUrl: string,
  params: Record<string, string | number | undefined>
): string => {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`
    )
    .join("&");

  return query ? `${baseUrl}?${query}` : baseUrl;
};
