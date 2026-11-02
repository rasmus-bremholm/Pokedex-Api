export const getIdFromUrl = (url: string) => Number(url.split("/").filter(Boolean).at(-1));
