import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { LocationDto } from 'interfaces/dto/locations/LocationDto';
import { LocationCreateDto } from 'interfaces/dto/locations/LocationCreateDto';
import { LocationUpdateDto } from 'interfaces/dto/locations/LocationUpdateDto';
import Paged from 'interfaces/models/Paged';

export default class LocationService {
  static async getAll(page: number, size: number, sort: string): Promise<AxiosResponse<Paged<LocationDto>>> {
    return api.get<Paged<LocationDto>>(`/locations?page=${page}&size=${size}&sort=${sort}`);
  }

  static async get(id: number): Promise<AxiosResponse<LocationDto>> {
    return api.get<LocationDto>(`/locations/${id}`);
  }

  static async search(search: SearchDto, page: number, size: number, sort: string): Promise<AxiosResponse<Paged<LocationDto>>> {
    return api.post<Paged<LocationDto>>(`/locations/search?page=${page}&size=${size}&sort=${sort}`, search);
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
