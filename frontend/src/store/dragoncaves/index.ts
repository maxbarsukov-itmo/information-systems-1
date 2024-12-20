import DragonCaveService from 'services/api/DragonCaveService';
import { DragonCaveDto } from 'interfaces/dto/dragoncaves/DragonCaveDto';
import { DragonCaveCreateDto } from 'interfaces/dto/dragoncaves/DragonCaveCreateDto';
import { DragonCaveUpdateDto } from 'interfaces/dto/dragoncaves/DragonCaveUpdateDto';
import createCrudSlice from 'interfaces/crud/CrudSlice';

const dragonCaveSlice = createCrudSlice<DragonCaveDto, DragonCaveCreateDto, DragonCaveUpdateDto>(
  'dragonCave',
  DragonCaveService
);

export const {
  fetchItems: fetchDragonCaves,
  getItem: getDragonCave,
  searchItems: searchDragonCaves,
  createItem: createDragonCave,
  updateItem: updateDragonCave,
  deleteItem: deleteDragonCave,
} = dragonCaveSlice.actions;

export default dragonCaveSlice.slice.reducer;
