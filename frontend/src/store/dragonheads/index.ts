import DragonHeadService from 'services/api/DragonHeadService';
import { DragonHeadDto } from 'interfaces/dto/dragonheads/DragonHeadDto';
import { DragonHeadCreateDto } from 'interfaces/dto/dragonheads/DragonHeadCreateDto';
import { DragonHeadUpdateDto } from 'interfaces/dto/dragonheads/DragonHeadUpdateDto';
import createCrudSlice from 'interfaces/crud/CrudSlice';

const dragonHeadSlice = createCrudSlice<DragonHeadDto, DragonHeadCreateDto, DragonHeadUpdateDto>(
  'dragonHead',
  DragonHeadService
);

export const {
  fetchItems: fetchDragonHeads,
  getItem: getDragonHead,
  searchItems: searchDragonHeads,
  createItem: createDragonHead,
  updateItem: updateDragonHead,
  deleteItem: deleteDragonHead,
} = dragonHeadSlice.actions;

export default dragonHeadSlice.slice.reducer;
