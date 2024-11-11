import DragonHeadService from 'services/api/DragonHeadService';
import { DragonHeadDto } from 'interfaces/dto/dragonheads/DragonHeadDto';
import { DragonHeadCreateDto } from 'interfaces/dto/dragonheads/DragonHeadCreateDto';
import { DragonHeadUpdateDto } from 'interfaces/dto/dragonheads/DragonHeadUpdateDto';
import createCrudSlice from 'utils/CrudSlice';

const dragonHeadSlice = createCrudSlice<DragonHeadDto, DragonHeadCreateDto, DragonHeadUpdateDto>(
  'dragonHead',
  DragonHeadService
);

export const {
  fetchItems: fetchDragonHeads,
  getItem: getDragonHead,
  createItem: createDragonHead,
  updateItem: updateDragonHead,
  deleteItem: deleteDragonHead
} = dragonHeadSlice.actions;

export default dragonHeadSlice.slice.reducer;