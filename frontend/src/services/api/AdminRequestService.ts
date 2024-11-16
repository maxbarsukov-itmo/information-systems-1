import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import Paged from 'interfaces/models/Paged';
import { createCrudUri } from './utils/uri';

export default class AdminRequestService {
  static async getAll(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<AdminRequestDto>>> {
    return api.get<Paged<AdminRequestDto>>(`/admin-requests${createCrudUri(page, size, sort)}`);
  }

  static async getPending(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<AdminRequestDto>>> {
    return api.get<Paged<AdminRequestDto>>(`/admin-requests/pending${createCrudUri(page, size, sort)}`);
  }

  static async get(id: number): Promise<AxiosResponse<AdminRequestDto>> {
    return api.get<AdminRequestDto>(`/admin-requests/${id}`);
  }

  static async create(): Promise<AxiosResponse<AdminRequestDto>> {
    return api.post<AdminRequestDto>('/admin-requests');
  }

  static async process(id: number, approved: boolean): Promise<AxiosResponse<AdminRequestDto>> {
    return api.put<AdminRequestDto>(`/admin-requests/${id}?approved=${approved}`);
  }
}
