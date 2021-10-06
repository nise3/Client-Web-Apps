import React, {ReactNode} from 'react';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  appHeader: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${grey[300]}`,
    [theme.breakpoints.up('xl')]: {
      height: 77,
    },
  },
  checkboxRoot: {
    marginRight: 8,
  },
  pointer: {
    cursor: 'pointer',
  },
}));

interface AppsFooterProps {
  children: ReactNode;
}

const AppsHeader: React.FC<AppsFooterProps> = ({children}) => {
  const classes = useStyles();
  return (
    <Box px={6} className={classes.appHeader}>
      {children}
    </Box>
  );
};

export default AppsHeader;
AppsHeader.defaultProps = {};
