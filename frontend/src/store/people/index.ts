import PersonService from 'services/api/PersonService';
import { PersonDto } from 'interfaces/dto/people/PersonDto';
import { PersonCreateDto } from 'interfaces/dto/people/PersonCreateDto';
import { PersonUpdateDto } from 'interfaces/dto/people/PersonUpdateDto';
import createCrudSlice from 'interfaces/crud/CrudSlice';

const personSlice = createCrudSlice<PersonDto, PersonCreateDto, PersonUpdateDto>(
  'person',
  PersonService
);

export const {
  fetchItems: fetchPeople,
  getItem: getPerson,
  searchItems: searchPeople,
  createItem: createPerson,
  updateItem: updatePerson,
  deleteItem: deletePerson,
} = personSlice.actions;

export default personSlice.slice.reducer;
