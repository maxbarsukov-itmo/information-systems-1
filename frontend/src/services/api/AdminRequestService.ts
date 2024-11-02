import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { AdminRequestDto } from 'interfaces/dto/adminrequests/AdminRequestDto';
import Paged from 'interfaces/models/Paged';

export default class AdminRequestService {
  static async getAll(page: number, size: number, sort: string): Promise<AxiosResponse<Paged<AdminRequestDto>>> {
    return api.get<Paged<AdminRequestDto>>(`/admin-requests?page=${page}&size=${size}&sort=${sort}`);
  }

  static async getPending(page: number, size: number, sort: string): Promise<AxiosResponse<Paged<AdminRequestDto>>> {
    return api.get<Paged<AdminRequestDto>>(`/admin-requests/pending?page=${page}&size=${size}&sort=${sort}`);
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
