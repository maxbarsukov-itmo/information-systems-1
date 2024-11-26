import React from 'react';

import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import UserPlaceholder from 'components/svg/UserPlaceholder';

const hashCode = (s: string): number => {
  return s.split('').reduce(function(a, b) {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
};

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
        <UserPlaceholder num={Math.abs(hashCode(username)) || 0} />
      )}
    </div>
  );
};

export default React.memo(UserAvatar);
