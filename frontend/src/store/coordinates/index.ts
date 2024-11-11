import CoordinateService from 'services/api/CoordinatesService';
import { CoordinateDto } from 'interfaces/dto/coordinates/CoordinateDto';
import { CoordinateCreateDto } from 'interfaces/dto/coordinates/CoordinateCreateDto';
import { CoordinateUpdateDto } from 'interfaces/dto/coordinates/CoordinateUpdateDto';
import createCrudSlice, { CrudState } from 'utils/CrudSlice';

const coordinateSlice = createCrudSlice<CoordinateDto, CoordinateCreateDto, CoordinateUpdateDto>(
  'coordinate',
  CoordinateService
);

export const {
  fetchItems: fetchCoordinates,
  getItem: getCoordinate,
  createItem: createCoordinate,
  updateItem: updateCoordinate,
  deleteItem: deleteCoordinate
} = coordinateSlice.actions;

export default coordinateSlice.slice.reducer;