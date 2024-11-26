import React, { useState } from 'react';
import { GiQueenCrown } from 'react-icons/gi';
import dayjs from 'dayjs';
import { GridRenderCellParams } from '@mui/x-data-grid-pro';
import { makeStyles } from '@material-ui/core';

import User from 'interfaces/models/User';
import UserAvatar from 'components/blocks/UserAvatar';
import { Role } from 'interfaces/models/Role';

const ICON_SIZE = 30;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing(1.5, 0),
  },
  id: {
    display: 'flex',
    flexGrow: 1,
    marginRight: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  admin: {
    fontWeight: 800,
    color: '#dacc0f',
  },
  avatar: {
    display: 'flex',
    flexGrow: 1,
    marginRight: theme.spacing(2),
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: theme.shape.borderRadius,
  },
}));

export const renderDateTime = (params: GridRenderCellParams) => {
  if (!params.value) return;
  return (
    <span>{dayjs(new Date(params.value.toString())).calendar().toLowerCase()}</span>
  );
};

export const renderUser = (params: GridRenderCellParams) => {
  const user: User = params.value as User;
  if (!user) return;

  const classes = useStyles();

  return (
    <span className={classes.root}>
      {user.role === Role.ROLE_ADMIN
        ? <GiQueenCrown size={ICON_SIZE} color={'#dacc0f'} className={classes.avatar}/>
        : <UserAvatar src='' username={user.username} className={classes.avatar}/>
      }
      <span className={classes.id}>#{user.id}</span>
      <span className={user.role === Role.ROLE_ADMIN ? classes.admin : ''}>{user.username}</span>
    </span>
  );
};
