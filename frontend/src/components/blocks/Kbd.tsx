import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, TypographyProps } from '@material-ui/core';
import getSecondaryAppBarColor from 'utils/getSecondaryAppBarColor';
import getInvertedContrastPaperColor from 'utils/getInvertedContrastPaperColor';

const useStyles = makeStyles(theme => ({
  kbd: {
    color: theme.palette.text.primary,
    fontFamily: 'monospace',
    fontSize: 11,
    fontWeight: 300,
    borderColor: getInvertedContrastPaperColor(theme),
    borderStyle: 'solid',
    borderWidth: '1px 1px 3px',
    backgroundColor: getSecondaryAppBarColor(theme),
    borderRadius: '0.35rem',
    px: 0.5,
    py: 0,
  },
}));

type KbdProps = TypographyProps;
const Kbd: React.FC<KbdProps> = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Typography
      component="kbd"
      className={classes.kbd}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Kbd;
