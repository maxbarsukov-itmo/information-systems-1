import React from 'react';
import { Box } from '@material-ui/core';
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid-pro';
import QuickSearchToolbar from './QuickFilteringGrid';

const Toolbar = (props) => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <Box sx={{ flexGrow: 1 }} />
      <GridToolbarExport variant='outlined' />
      <QuickSearchToolbar {...props}/>
    </GridToolbarContainer>
  );
};

export default React.memo(Toolbar);
