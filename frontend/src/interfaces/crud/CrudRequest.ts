import { SearchDto } from 'interfaces/dto/search/SearchDto';

export default interface CrudRequest {
  page?: number;
  size?: number;
  sort?: string[];
  search?: SearchDto;
}
