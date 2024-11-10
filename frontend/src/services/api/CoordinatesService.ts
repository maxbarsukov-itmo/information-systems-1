import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { CoordinateDto } from 'interfaces/dto/coordinates/CoordinateDto';
import { CoordinateCreateDto } from 'interfaces/dto/coordinates/CoordinateCreateDto';
import { CoordinateUpdateDto } from 'interfaces/dto/coordinates/CoordinateUpdateDto';
import CrudService, { staticImplements } from 'interfaces/crud/CrudService';
import Paged from 'interfaces/models/Paged';

@staticImplements<CrudService<CoordinateDto, CoordinateCreateDto, CoordinateUpdateDto>>()
export default class CoordinatesService {
  static async getAll(page: number, size: number, sort: string): Promise<AxiosResponse<Paged<CoordinateDto>>> {
    return api.get<Paged<CoordinateDto>>(`/coordinates?page=${page}&size=${size}&sort=${sort}`);
  }

  static async get(id: number): Promise<AxiosResponse<CoordinateDto>> {
    return api.get<CoordinateDto>(`/coordinates/${id}`);
  }

  static async search(search: SearchDto, page: number, size: number, sort: string): Promise<AxiosResponse<Paged<CoordinateDto>>> {
    return api.post<Paged<CoordinateDto>>(`/coordinates/search?page=${page}&size=${size}&sort=${sort}`, search);
  }

  static async create(Coordinates: CoordinateCreateDto): Promise<AxiosResponse<CoordinateDto>> {
    return api.post<CoordinateDto>('/coordinates', Coordinates);
  }

  static async update(id: number, Coordinates: CoordinateUpdateDto): Promise<AxiosResponse<CoordinateDto>> {
    return api.patch<CoordinateDto>(`/coordinates/${id}`, Coordinates);
  }

  static async delete(id: number): Promise<AxiosResponse> {
    return api.delete(`/coordinates/${id}`);
  }
}
