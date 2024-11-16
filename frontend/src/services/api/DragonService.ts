import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { DragonDto } from 'interfaces/dto/dragons/DragonDto';
import { DragonCreateDto } from 'interfaces/dto/dragons/DragonCreateDto';
import { DragonUpdateDto } from 'interfaces/dto/dragons/DragonUpdateDto';
import CrudService, { staticImplements } from 'interfaces/crud/CrudService';
import Paged from 'interfaces/models/Paged';
import { createCrudUri } from './utils/uri';

@staticImplements<CrudService<DragonDto, DragonCreateDto, DragonUpdateDto>>()
export default class DragonService {
  static async getAll(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<DragonDto>>> {
    return api.get<Paged<DragonDto>>(`/dragons${createCrudUri(page, size, sort)}`);
  }

  static async get(id: number): Promise<AxiosResponse<DragonDto>> {
    return api.get<DragonDto>(`/dragons/${id}`);
  }

  static async search(search: SearchDto, page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<DragonDto>>> {
    return api.post<Paged<DragonDto>>(`/dragons/search${createCrudUri(page, size, sort)}`, search);
  }

  static async create(dragon: DragonCreateDto): Promise<AxiosResponse<DragonDto>> {
    return api.post<DragonDto>('/dragons', dragon);
  }

  static async update(id: number, dragon: DragonUpdateDto): Promise<AxiosResponse<DragonDto>> {
    return api.patch<DragonDto>(`/dragons/${id}`, dragon);
  }

  static async delete(id: number): Promise<AxiosResponse> {
    return api.delete(`/dragons/${id}`);
  }
}
