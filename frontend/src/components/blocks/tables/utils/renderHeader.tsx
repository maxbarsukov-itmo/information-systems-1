import React from 'react';
import { GridColumnHeaderParams } from '@mui/x-data-grid-pro';
import Kbd from 'components/blocks/Kbd';

export const renderHeader = (params: GridColumnHeaderParams) => {
  return (
    <span style={{ paddingRight: '10px' }}>
      <span className='MuiDataGrid-columnHeaderTitle' style={{ paddingRight: '10px' }}>
        {params.colDef.headerName}:
      </span>
      <Kbd>{params.colDef.field}</Kbd>
    </span>
  );
};
