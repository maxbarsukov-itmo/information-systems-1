import DragonService from 'services/api/DragonService';
import { DragonDto } from 'interfaces/dto/dragons/DragonDto';
import { DragonCreateDto } from 'interfaces/dto/dragons/DragonCreateDto';
import { DragonUpdateDto } from 'interfaces/dto/dragons/DragonUpdateDto';
import createCrudSlice, { CrudState } from 'utils/CrudSlice';

const dragonSlice = createCrudSlice<DragonDto, DragonCreateDto, DragonUpdateDto>(
  'dragon',
  DragonService
);

export const {
  fetchItems: fetchDragons,
  getItem: getDragon,
  createItem: createDragon,
  updateItem: updateDragon,
  deleteItem: deleteDragon
} = dragonSlice.actions;

export default dragonSlice.slice.reducer;