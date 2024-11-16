import React, { useState, useEffect } from 'react';

import { Paper } from '@material-ui/core';
import { DataGridPro, GridColDef, GridSortModel, GridFilterModel } from '@mui/x-data-grid-pro';

import { useDispatch, useSelector } from 'hooks';
import { DragonCaveDto } from 'interfaces/dto/dragoncaves/DragonCaveDto';
import Paged from 'interfaces/models/Paged';
import { ELEMENTS_ON_PAGE } from 'config/constants';
import { fetchDragonCaves } from 'store/dragoncaves';
import ErrorComponent from 'components/blocks/Error';
import SkeletonLoadingOverlay from './utils/SkeletonCell';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    description: 'id',
    flex: 1,
  },
  {
    field: 'depth',
    headerName: 'Depth',
    description: 'depth',
    flex: 1,
  },
];

const DragonCavesTable = () => {
  const dispatch = useDispatch();

  const sortModelToArgs = (model) => model.filter(item => item.sort === 'asc' || item.sort === 'desc').map(sortItem => `${sortItem.field},${sortItem.sort}`);

  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] });
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(ELEMENTS_ON_PAGE);

  const dragonCaves: Paged<DragonCaveDto> = useSelector(state => state.dragonCaves.items);
  const loading = useSelector(state => state.dragonCaves.loading);
  const errors = useSelector(state => state.dragonCaves.error);

  const fetch = () => {
    dispatch(fetchDragonCaves({
      page,
      size,
      sort: sortModelToArgs(sortModel),
    }));
  };

  useEffect(() => {
    fetch();
  }, [page, size, JSON.stringify(sortModelToArgs(sortModel)), JSON.stringify(filterModel)]);

  return (
    <>
      {(loading.fetch || !dragonCaves) &&
        <SkeletonLoadingOverlay columns={columns} pageSize={ELEMENTS_ON_PAGE} />
      }
      {!loading.fetch && dragonCaves && !errors.fetch && (
        <Paper style={{ width: '100%' }}>
          <DataGridPro
            columns={columns}
            rows={dragonCaves.content}
            rowCount={dragonCaves.totalElements}
            page={page}
            autoHeight
            pageSize={dragonCaves.size}
            loading={loading.fetch}
            pagination
            sortingMode="server"
            sortModel={sortModel}
            filterMode="server"
            paginationMode="server"
            rowsPerPageOptions={[10, 20, 50]}
            onPageSizeChange={setSize}
            onPageChange={setPage}
            onSortModelChange={setSortModel}
            onFilterModelChange={setFilterModel}
          />
        </Paper>
      )}
      {errors.fetch && <ErrorComponent code={errors.fetch.code} message={errors.fetch.message} />}
    </>
  );
};

export default React.memo(DragonCavesTable);
