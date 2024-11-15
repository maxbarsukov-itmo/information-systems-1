export default interface ApiError {
  code: string;
  status: string;
  message: string;
  errors: string[];
}
