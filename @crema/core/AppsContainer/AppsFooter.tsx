import React, {ReactNode} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import {grey} from '@mui/material/colors';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const PREFIX = 'AppsFooter';

const classes = {
  paginationRoot: `${PREFIX}-paginationRoot`,
  paddingY: `${PREFIX}-paddingY`
};

const StyledBox = styled(Box)((
  {
    theme: CremaTheme
  }
) => ({
  [`&.${classes.paginationRoot}`]: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
    paddingTop: 8,
    borderTop: '1px solid',
    borderColor: grey[300],
  },

  [`& .${classes.paddingY}`]: {
    paddingTop: 0,
    paddingBottom: 0,
  }
}));

interface AppsFooterProps {
  children: ReactNode;

  [x: string]: any;
}

const AppsFooter: React.FC<AppsFooterProps> = ({children, ...rest}) => {

  return (
    <StyledBox className={classes.paginationRoot} {...rest}>
      {children}
    </StyledBox>
  );
};

export default AppsFooter;
