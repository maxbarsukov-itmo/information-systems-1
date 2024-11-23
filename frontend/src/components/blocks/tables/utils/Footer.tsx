import React from 'react';
import { Box, makeStyles } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';
import { ReadyState } from 'react-use-websocket';
import { GridFooterContainer } from '@mui/x-data-grid-pro';
import Pagination from './Pagination';

const useStyles = makeStyles({
  root: {
    padding: 8,
    display: 'flex',
  },
  status: {
    fontWeight: 800,
  },
  Connecting: {
    marginRight: 2,
    color: '#64e268',
  },
  Open: {
    marginRight: 2,
    color: '#4caf50',
  },
  Closing: {
    marginRight: 2,
    color: '#d9182e',
  },
  Closed: {
    marginRight: 2,
    color: '#d9182e',
  },
  Uninstantiated: {
    marginRight: 2,
    color: '#ecc800',
  },
});

const StatusComponent = ({ status }: { status: ReadyState }) => {
  const classes = useStyles();

  const connectionStatuses = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[status];

  const isOutlined = ['Connecting', 'Closing'].includes(connectionStatuses);

  return (
    <div className={classes.root}>
      {isOutlined
       ? <FiberManualRecordOutlinedIcon fontSize="small" className={classes[connectionStatuses]} />
       : <FiberManualRecordIcon fontSize="small" className={classes[connectionStatuses]} />
      }
      Status:&nbsp;<span className={classes.status}>{connectionStatuses}</span>
    </div>
  );
};

const Footer = ({ status }: { status: ReadyState }) =>{
  return (
    <GridFooterContainer>
      <StatusComponent status={status} />
      <Box sx={{ flexGrow: 1 }} />
      <Pagination />
    </GridFooterContainer>
  );
};

export default React.memo(Footer);
