import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { DragonDto } from 'interfaces/dto/dragons/DragonDto';
import { DragonResultDto } from 'interfaces/dto/specialoperations/DragonResultDto';
import { AverageAgeDto } from 'interfaces/dto/specialoperations/AverageAgeDto';
import Paged from 'interfaces/models/Paged';

export default class SpecialOperationService {
  static async killDragon(id: number): Promise<AxiosResponse<DragonResultDto>> {
    return api.post<DragonResultDto>(`/special-operations/kill-dragon/${id}`);
  }

  static async oldestDragon(): Promise<AxiosResponse<DragonResultDto>> {
    return api.get<DragonResultDto>('/special-operations/oldest-dragon');
  }

  static async filterByName(name: string, page: number, size: number, sort: string): Promise<AxiosResponse<Paged<DragonDto>>> {
    return api.get<Paged<DragonDto>>(`/special-operations/filter-by-name?name=${name}&page=${page}&size=${size}&sort=${sort}`);
  }

  static async deepestCaveDragon(): Promise<AxiosResponse<DragonResultDto>> {
    return api.get<DragonResultDto>('/special-operations/deepest-cave-dragon');
  }

  static async averageAge(): Promise<AxiosResponse<AverageAgeDto>> {
    return api.get<AverageAgeDto>('/special-operations/average-age');
  }
}
