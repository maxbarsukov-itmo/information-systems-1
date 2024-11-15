import DragonService from 'services/api/DragonService';
import { DragonDto } from 'interfaces/dto/dragons/DragonDto';
import { DragonCreateDto } from 'interfaces/dto/dragons/DragonCreateDto';
import { DragonUpdateDto } from 'interfaces/dto/dragons/DragonUpdateDto';
import createCrudSlice from 'interfaces/crud/CrudSlice';

const dragonSlice = createCrudSlice<DragonDto, DragonCreateDto, DragonUpdateDto>(
  'dragon',
  DragonService
);

export const {
  fetchItems: fetchDragons,
  getItem: getDragon,
  searchItems: searchDragons,
  createItem: createDragon,
  updateItem: updateDragon,
  deleteItem: deleteDragon,
} = dragonSlice.actions;

export default dragonSlice.slice.reducer;
