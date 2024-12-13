import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { BatchOperationDto } from 'interfaces/dto/batchoperations/BatchOperationDto';
import Paged from 'interfaces/models/Paged';
import { createCrudUri } from './utils/uri';

export default class BatchOperationService {
  static async getAll(page: number, size: number, sort: string[]): Promise<AxiosResponse<Paged<BatchOperationDto>>> {
    return api.get<Paged<BatchOperationDto>>(`/batch-operations${createCrudUri(page, size, sort)}`);
  }

  static async getById(id: number): Promise<AxiosResponse<BatchOperationDto>> {
    return api.get<BatchOperationDto>(`/batch-operations/${id}`);
  }
}