import React from 'react';

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import UserPlaceholder from 'components/svg/UserPlaceholder';

const useStyles = makeStyles(theme => ({
  root: {
    width: 40,
    height: 40,
    borderRadius: theme.shape.borderRadius,
  },
}));

const UserAvatar: React.FC<{
  src: string;
  username: string;
  className?: string;
}> = ({ src, username, className, ...props }) => {
  const classes = useStyles();

  const hasAvatar = !!src;

  return (
    <div {...props} className={[classes.root, className].join(' ')}>
      {hasAvatar ? (
        <Avatar className={className || classes.root} src={src} />
      ) : (
        <UserPlaceholder num={username?.length || 0} />
      )}
    </div>
  );
};

export default React.memo(UserAvatar);
