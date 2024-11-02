export type ErrorResponse = {
  status: string;
  message: string;
  errors: string[];
};

type Response<T> = T | ErrorResponse;

export default Response;
