import ApiError from 'interfaces/errors/ApiError';

export default interface Loading {
  fetch: ApiError | null;
  get: ApiError | null;
  create: ApiError | null;
  update: ApiError | null;
  delete: ApiError | null;
  search: ApiError | null;
}
