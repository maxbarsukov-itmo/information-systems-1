import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { LinearProgress, Paper } from '@material-ui/core';
import { DataGridPro, GridCellParams, GridColDef } from '@mui/x-data-grid-pro';
import { Skeleton } from '@material-ui/lab';
import { ReadyState } from 'react-use-websocket';
import Footer from './Footer';
import Toolbar from './Toolbar';

const useStyles = makeStyles(theme => ({
  cell: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

// Pseudo random number. See https://stackoverflow.com/a/47593316
function mulberry32(a: number): () => number {
  return () => {
    /* eslint-disable */
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    /* eslint-enable */
  };
}

function randomBetween(seed: number, min: number, max: number): () => number {
  const random = mulberry32(seed);
  return () => min + (max - min) * random();
}

const SkeletonLoadingOverlay: React.FC<{ columns: GridColDef[]; pageSize: number; readyStatus: ReadyState }> = ({ columns, pageSize, readyStatus }) => {
  const classes = useStyles();
  const data = Array.from(Array(pageSize).keys()).map(id => { return {id}; });

  let key = 0;
  const columnsCells = columns.map(column => {
    key++;
    return {
      ...column,
      renderCell: (_params: GridCellParams) => (
        <div className={classes.cell} key={`col-${column.field}-${key}`} style={{ justifyContent: column.align }}>
          <Skeleton
            style={{
              marginLeft: 1,
              marginRight: 1,
              width: `${ (() => Math.round(randomBetween(Math.floor(Math.random() * 1000), 25, 75)()))() }%`,
            }}
          />
        </div>
      ),
    };
  });

  return (
    <Paper style={{ width: '100%' }}>
      <DataGridPro
        components={{
          Toolbar,
          Footer,
          LoadingOverlay: LinearProgress,
        }}
        componentsProps={{
          footer: { status: readyStatus },
        }}

        autoHeight
        rows={data}
        columns={columnsCells}
        pageSize={pageSize}
        loading={true}
      />
    </Paper>
  );
};

export default SkeletonLoadingOverlay;
