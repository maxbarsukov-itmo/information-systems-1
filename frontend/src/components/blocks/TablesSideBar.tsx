import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import {
  GiDoubleDragon,
  GiDragonHead,
  GiCaveEntrance,
  GiPositionMarker,
  GiBlackKnightHelm,
  GiSpookyHouse,
} from 'react-icons/gi';
import SideBlock from 'components/blocks/SideBlock';
import Sidebar from 'components/blocks/Sidebar';

import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  tablesChildrenContainerProps: {
    marginBottom: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
  },
}));

const useSideBarItemStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none !important',
    background: 'transparent !important',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transitionDuration: `${theme.transitions.duration.shortest}ms`,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:first-child': {
      marginTop: 0,
    },
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  matchIcon: {
    color: theme.palette.text.primary,
    '&:hover': {
      color: theme.palette.text.primary,
    },
    marginRight: theme.spacing(1.5),
    width: 36,
    height: 36,
    borderRadius: 4,
  },
  icon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1.5),
    width: 36,
    height: 36,
    borderRadius: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: 700,
    lineHeight: '18px',
    textDecoration: 'none',
  },
}));

const icons = {
  GiDoubleDragon,
  GiDragonHead,
  GiCaveEntrance,
  GiPositionMarker,
  GiBlackKnightHelm,
  GiSpookyHouse,
};

type SideBarAlias = string;

interface SideBarCard {
  alias: SideBarAlias;
  title: string;
  icon: keyof typeof icons;
}

const SideBarItem: React.FC<{ data: SideBarCard }> = ({ data }) => {
  const history = useHistory();
  const classes = useSideBarItemStyles();
  const Icon = icons[data.icon];

  const currentTable = () => {
    if (history.location.pathname === `/${data.alias}`) {
      return true;
    }
    return data.alias === 'dragons' && history.location.pathname === '/';
  };

  const onTableClick = _e => {
    if (data.alias === 'dragons') {
      history.push('/');
    }
    history.push(`/${data.alias}`);
  };

  return (
    <div className={classes.root} onClick={onTableClick}>
      <Icon className={currentTable() ? classes.matchIcon : classes.icon}/>
      <span className={classes.title}>{data.title}</span>
    </div>
  );
};


const TablesSidebar = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const sideBarAliasToIcon: { [key in Partial<SideBarAlias>]: keyof typeof icons} = {
    dragons: 'GiDoubleDragon',
    people: 'GiBlackKnightHelm',
    dragonHeads: 'GiDragonHead',
    dragonCaves: 'GiCaveEntrance',
    locations: 'GiSpookyHouse',
    coordinates: 'GiPositionMarker',
  };

  const tablesItems: SideBarCard[] = Object.keys(sideBarAliasToIcon).map(alias => ({
    alias: alias as SideBarAlias,
    title: t(`pages.Home.Sidebar.Tables.${alias}`),
    icon: sideBarAliasToIcon[alias],
  }));

  return (
    <Sidebar>
      <SideBlock
        childrenContainerProps={{
          className: classes.tablesChildrenContainerProps,
        }}
        title={t`pages.Home.Sidebar.Tables.Title`}
      >
        { tablesItems.map((e, i) => (
            <>
              <SideBarItem data={e} key={e.alias} />
              {tablesItems.length - 1 !== i && <Divider />}
            </>
          ))}
      </SideBlock>
    </Sidebar>
  );
};

export default React.memo(TablesSidebar);
