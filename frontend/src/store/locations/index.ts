import LocationService from 'services/api/LocationService';
import { LocationDto } from 'interfaces/dto/locations/LocationDto';
import { LocationCreateDto } from 'interfaces/dto/locations/LocationCreateDto';
import { LocationUpdateDto } from 'interfaces/dto/locations/LocationUpdateDto';
import createCrudSlice from 'interfaces/crud/CrudSlice';

const LocationSlice = createCrudSlice<LocationDto, LocationCreateDto, LocationUpdateDto>(
  'location',
  LocationService
);

export const {
  fetchItems: fetchLocations,
  getItem: getLocation,
  searchItems: searchLocations,
  createItem: createLocation,
  updateItem: updateLocation,
  deleteItem: deleteLocation,
} = LocationSlice.actions;

export default LocationSlice.slice.reducer;
