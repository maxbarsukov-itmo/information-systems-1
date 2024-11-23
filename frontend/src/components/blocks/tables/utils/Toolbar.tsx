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
      <GridToolbarExport variant='outlined' />
      <Box sx={{ flexGrow: 1 }} />
      <QuickSearchToolbar {...props}/>
    </GridToolbarContainer>
  );
};

export default React.memo(Toolbar);
