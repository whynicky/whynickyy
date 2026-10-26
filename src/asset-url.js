// Resolve public assets under both local development and a Pages subdirectory.
export const assetUrl = path => import.meta.env.BASE_URL + path.replace(/^\/+/, '');
