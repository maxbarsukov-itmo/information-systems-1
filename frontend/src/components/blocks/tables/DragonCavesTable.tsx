import React from 'react';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid-pro';

import { getNumberFilterOperations, getDateTimeFilterOperations } from 'utils/search';
import { Event } from 'interfaces/events/Event';
import { DragonCaveDto } from 'interfaces/dto/dragoncaves/DragonCaveDto';
import { fetchDragonCaves, searchDragonCaves } from 'store/dragoncaves';
import { renderHeader } from 'components/blocks/tables/utils/renderHeader';
import TemplateTable from './TemplateTable';
import dayjs from 'dayjs';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    description: 'id',
    flex: 1,
    resizable: true,
    minWidth: 120,
    renderHeader,
    filterOperators: getNumberFilterOperations(),
  },
  {
    field: 'depth',
    headerName: 'Depth',
    description: 'depth',
    flex: 1,
    resizable: true,
    minWidth: 170,
    renderHeader,
    filterOperators: getNumberFilterOperations(),
  },
  {
    field: 'createdAt',
    headerName: 'Created At',
    description: 'createdAt',
    flex: 1,
    resizable: true,
    minWidth: 220,
    type: 'dateTime',
    renderHeader,
    filterOperators: getDateTimeFilterOperations(),
    renderCell: (params: GridRenderCellParams) => {
      if (!params.value) return;
      return (
        <span>{dayjs(new Date(params.value.toString())).calendar().toLowerCase()}</span>
      );
    },
  },
  {
    field: 'updatedAt',
    headerName: 'Updated At',
    description: 'updatedAt',
    flex: 1,
    resizable: true,
    minWidth: 220,
    type: 'dateTime',
    // renderHeader,
    filterOperators: getDateTimeFilterOperations(),
    renderCell: (params: GridRenderCellParams) => {
      if (!params.value) return;
      return (
        <span>{dayjs(new Date(params.value.toString())).calendar().toLowerCase()}</span>
      );
    },
  },
];

const DragonCavesTable = () => {
  const handleEvent = (event: Event<DragonCaveDto>) => {
    // TODO handle events
    return;
  };

  return (
    <TemplateTable<DragonCaveDto>
      resource={'dragonCave'}
      columns={columns}
      selector={state => state.dragonCaves}
      handleEvent={handleEvent}
      fetchAction={fetchDragonCaves}
      searchAction={searchDragonCaves}
    />
  );
};

export default React.memo(DragonCavesTable);
