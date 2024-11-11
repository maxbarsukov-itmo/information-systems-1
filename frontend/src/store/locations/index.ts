import LocationService from 'services/api/LocationService';
import { LocationDto } from 'interfaces/dto/locations/LocationDto';
import { LocationCreateDto } from 'interfaces/dto/locations/LocationCreateDto';
import { LocationUpdateDto } from 'interfaces/dto/locations/LocationUpdateDto';
import createCrudSlice, { CrudState } from 'utils/CrudSlice';

const locationSlice = createCrudSlice<LocationDto, LocationCreateDto, LocationUpdateDto>(
  'location',
  LocationService
);

export const {
  fetchItems: fetchLocations,
  getItem: getLocation,
  createItem: createLocation,
  updateItem: updateLocation,
  deleteItem: deleteLocation
} = locationSlice.actions;

export default locationSlice.slice.reducer;