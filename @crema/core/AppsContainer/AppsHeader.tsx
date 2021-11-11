import React, {ReactNode} from 'react';
import { styled } from '@mui/material/styles';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';
import makeStyles from '@mui/styles/makeStyles';

const PREFIX = 'AppsHeader';

const classes = {
  appHeader: `${PREFIX}-appHeader`,
  checkboxRoot: `${PREFIX}-checkboxRoot`,
  pointer: `${PREFIX}-pointer`
};

const StyledBox = styled(Box)((
  {
    theme
  }
) => ({
  [`&.${classes.appHeader}`]: {
    height: 60,
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${grey[300]}`,
    [theme.breakpoints.up('xl')]: {
      height: 77,
    },
  },

  [`& .${classes.checkboxRoot}`]: {
    marginRight: 8,
  },

  [`& .${classes.pointer}`]: {
    cursor: 'pointer',
  }
}));

interface AppsFooterProps {
  children: ReactNode;
}

const AppsHeader: React.FC<AppsFooterProps> = ({children}) => {

  return (
    <StyledBox px={6} className={classes.appHeader}>
      {children}
    </StyledBox>
  );
};

export default AppsHeader;
AppsHeader.defaultProps = {};
