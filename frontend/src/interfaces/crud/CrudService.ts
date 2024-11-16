import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import Paged from 'interfaces/models/Paged';

export function staticImplements<T>() {
  return <U extends T>(constructor: U) => {constructor;};
}

export default interface CrudService<Dto, CreateDto, UpdateDto> {
  getAll(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<Dto>>>;

  get(id: number): Promise<AxiosResponse<Dto>>;

  search(search: SearchDto, page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<Dto>>>;

  create(dto: CreateDto): Promise<AxiosResponse<Dto>>;

  update(id: number, dto: UpdateDto): Promise<AxiosResponse<Dto>>;

  delete(id: number): Promise<AxiosResponse>;
}
