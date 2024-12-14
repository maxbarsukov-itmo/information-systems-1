import React, { MemoExoticComponent } from 'react';
import { Theme } from '@material-ui/core';

import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';
import Settings from 'pages/Settings';
import SettingsAppearance from 'pages/Settings/Appearance';
import SettingsLanguage from 'pages/Settings/Language';

import i18n from 'config/i18n';
import getContrastPaperColor from 'utils/getContrastPaperColor';
import AdminRequestPanel from 'pages/AdminRequestPanel';
import BatchOperationsPanel from 'pages/BatchOperationPanel';

export interface Route {
  path: string | string[];
  component: MemoExoticComponent<() => React.ReactElement> | React.ReactElement;
  title?: string;
  alias: string;
  shouldShowAppBar?: boolean;
  appBarColor?: (theme: Theme) => string;
  shouldAppBarChangeColors?: boolean;
}

export const getRoutes = () => {
  const t = i18n.t.bind(i18n);
  const routes: Route[] = [
    {
      title: t`pages.app.routes.home`,
      path: ['/', '/home', '/dragons'],
      component: <Home variant='tables' table='dragons' />,
      alias: 'home',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.dragonCaves`,
      path: ['/dragonCaves'],
      component: <Home variant='tables' table='dragonCaves' />,
      alias: 'dragonCaves',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.dragonHeads`,
      path: ['/dragonHeads'],
      component: <Home variant='tables' table='dragonHeads' />,
      alias: 'dragonHeads',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.coordinates`,
      path: ['/coordinates'],
      component: <Home variant='tables' table='coordinates' />,
      alias: 'coordinates',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.locations`,
      path: ['/locations'],
      component: <Home variant='tables' table='locations' />,
      alias: 'locations',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.people`,
      path: ['/people'],
      component: <Home variant='tables' table='people' />,
      alias: 'people',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.chart`,
      path: '/chart',
      component: <Home variant='chart' />,
      alias: 'chart',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.settings`,
      path: '/settings',
      component: <Settings />,
      alias: 'settings',
      shouldShowAppBar: false,
      shouldAppBarChangeColors: false,
      appBarColor: theme => getContrastPaperColor(theme),
    },
    {
      title: t`pages.app.routes.settingsLanguage`,
      path: '/settings/language',
      component: <SettingsLanguage />,
      alias: 'settingsLanguage',
      shouldShowAppBar: false,
      shouldAppBarChangeColors: false,
      appBarColor: theme => getContrastPaperColor(theme),
    },
    {
      title: t`pages.app.routes.settingsAppearance`,
      path: '/settings/appearance',
      component: <SettingsAppearance />,
      alias: 'settingsAppearance',
      shouldShowAppBar: false,
      shouldAppBarChangeColors: false,
      appBarColor: theme => getContrastPaperColor(theme),
    },
    {
      title: t`pages.app.routes.login`,
      path: '/login',
      component: <Login />,
      alias: 'login',
      shouldShowAppBar: false,
      shouldAppBarChangeColors: false,
      appBarColor: theme => theme.palette.background.default,
    },
    {
      title: t`pages.app.routes.register`,
      path: '/register',
      component: <Login register />,
      alias: 'register',
      shouldShowAppBar: false,
      shouldAppBarChangeColors: false,
      appBarColor: theme => theme.palette.background.default,
    },
    {
      title: t`pages.app.routes.adminRequestPanel`,
      path: '/admin-panel',
      component: <AdminRequestPanel />,
      alias: 'admin-panel',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: t`pages.app.routes.batchOperationPanel`,
      path: '/batch-operation',
      component: <Home variant='batchOperationPanel' />,
      alias: 'batch-operation',
      shouldShowAppBar: true,
      shouldAppBarChangeColors: true,
      appBarColor: theme => theme.palette.background.paper,
    },
    {
      title: '404',
      path: '/:404*',
      component: <NotFound />,
      alias: '404',
      shouldShowAppBar: false,
      shouldAppBarChangeColors: false,
      appBarColor: theme => theme.palette.background.default,
    },
  ];
  return routes;
};
