import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';

import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';

import { useDispatch, useSelector } from 'hooks';
import { DragonCaveDto } from 'interfaces/dto/dragoncaves/DragonCaveDto';
import Paged from 'interfaces/models/Paged';
import { ELEMENTS_ON_PAGE } from 'config/constants';
import { fetchDragonCaves } from 'store/dragoncaves';
import ErrorComponent from 'components/blocks/Error';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
  loading: {
    minWidth: '10vh',
    minHeight: '10vh',
  },
}));

const DragonCavesTable = () => {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(ELEMENTS_ON_PAGE);
  const [sort, setSort] = useState<string>('id,desc');

  const dragonCaves: Paged<DragonCaveDto> = useSelector(state => state.dragonCaves.items);
  const loading = useSelector(state => state.dragonCaves.loading);
  const errors = useSelector(state => state.dragonCaves.error);

  const fetch = () => {
    dispatch(fetchDragonCaves({ page, size, sort }));
  };

  useEffect(() => {
    fetch();
  }, [location.pathname, location.search]);

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
    },
    {
      field: 'depth',
      headerName: 'Depth',
      width: 150,
    },
  ];

  return (
    <>
      {loading.fetch && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress className={classes.loading} color="primary" />
        </Box>
      )}
      {!loading.fetch && !errors.fetch && dragonCaves && (
        <DataGridPro autoHeight rows={dragonCaves.content} columns={columns} />
      )}
      {errors.fetch && <ErrorComponent code={errors.fetch.code} message={errors.fetch.message} />}
    </>
  );
};

export default React.memo(DragonCavesTable);
