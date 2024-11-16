import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppWindow from 'components/blocks/AppWindow';
import { FlowAlias, Tables } from 'config/constants';

import DragonCavesTable from 'components/blocks/tables/DragonCavesTable';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.background.default,
    padding: 0,
    width: '100%',
  },
}));

const Home = ({ variant = 'tables', table = 'dragons' }: { variant: FlowAlias; table?: Tables }) => {
  const classes = useStyles();

  return (
    <AppWindow flow={'tables'}>
      <div className={classes.root}>
        {variant === 'tables' && (
          (table === 'coordinates' && <DragonCavesTable />) ||
          (table === 'dragonCaves' && <DragonCavesTable />) ||
          (table === 'dragonHeads' && <DragonCavesTable />) ||
          (table === 'dragons' && <DragonCavesTable />) ||
          (table === 'locations' && <DragonCavesTable />) ||
          (table === 'people' && <DragonCavesTable />)
        )}
        {variant === 'chart' && <DragonCavesTable />}
      </div>
    </AppWindow>
  );
};

export default React.memo(Home);
