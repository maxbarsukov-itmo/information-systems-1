import { GridSortModel } from '@mui/x-data-grid-pro';

export const sortModelToArgs = (model: GridSortModel): string[] =>
  model
    .filter(item => item.sort === 'asc' || item.sort === 'desc')
    .map(sortItem => `${sortItem.field},${sortItem.sort}`);
