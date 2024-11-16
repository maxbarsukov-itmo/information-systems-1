import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { LocationDto } from 'interfaces/dto/locations/LocationDto';
import { LocationCreateDto } from 'interfaces/dto/locations/LocationCreateDto';
import { LocationUpdateDto } from 'interfaces/dto/locations/LocationUpdateDto';
import CrudService, { staticImplements } from 'interfaces/crud/CrudService';
import Paged from 'interfaces/models/Paged';
import { createCrudUri } from './utils/uri';

@staticImplements<CrudService<LocationDto, LocationCreateDto, LocationUpdateDto>>()
export default class LocationService {
  static async getAll(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<LocationDto>>> {
    return api.get<Paged<LocationDto>>(`/locations${createCrudUri(page, size, sort)}`);
  }

  static async get(id: number): Promise<AxiosResponse<LocationDto>> {
    return api.get<LocationDto>(`/locations/${id}`);
  }

  static async search(search: SearchDto, page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<LocationDto>>> {
    return api.post<Paged<LocationDto>>(`/locations/search${createCrudUri(page, size, sort)}`, search);
  }

  static async create(Location: LocationCreateDto): Promise<AxiosResponse<LocationDto>> {
    return api.post<LocationDto>('/locations', Location);
  }

  static async update(id: number, Location: LocationUpdateDto): Promise<AxiosResponse<LocationDto>> {
    return api.patch<LocationDto>(`/locations/${id}`, Location);
  }

  static async delete(id: number): Promise<AxiosResponse> {
    return api.delete(`/locations/${id}`);
  }
}
