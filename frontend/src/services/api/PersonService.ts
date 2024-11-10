import api from 'services/api/api';
import { AxiosResponse } from 'axios';
import { SearchDto } from 'interfaces/dto/search/SearchDto';
import { PersonDto } from 'interfaces/dto/people/PersonDto';
import { PersonCreateDto } from 'interfaces/dto/people/PersonCreateDto';
import { PersonUpdateDto } from 'interfaces/dto/people/PersonUpdateDto';
import CrudService, { staticImplements } from 'interfaces/crud/CrudService';
import Paged from 'interfaces/models/Paged';

@staticImplements<CrudService<PersonDto, PersonCreateDto, PersonUpdateDto>>()
export default class PersonService {
  static async getAll(page: number, size: number, sort: string): Promise<AxiosResponse<Paged<PersonDto>>> {
    return api.get<Paged<PersonDto>>(`/people?page=${page}&size=${size}&sort=${sort}`);
  }

  static async get(id: number): Promise<AxiosResponse<PersonDto>> {
    return api.get<PersonDto>(`/people/${id}`);
  }

  static async search(search: SearchDto, page: number, size: number, sort: string): Promise<AxiosResponse<Paged<PersonDto>>> {
    return api.post<Paged<PersonDto>>(`/people/search?page=${page}&size=${size}&sort=${sort}`, search);
  }

  static async create(Person: PersonCreateDto): Promise<AxiosResponse<PersonDto>> {
    return api.post<PersonDto>('/people', Person);
  }

  static async update(id: number, Person: PersonUpdateDto): Promise<AxiosResponse<PersonDto>> {
    return api.patch<PersonDto>(`/people/${id}`, Person);
  }

  static async delete(id: number): Promise<AxiosResponse> {
    return api.delete(`/people/${id}`);
  }
}
