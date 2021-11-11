import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {grey} from '@mui/material/colors';

const PREFIX = 'AppsFooter';

const classes = {
  paginationRoot: `${PREFIX}-paginationRoot`,
  paddingY: `${PREFIX}-paddingY`,
};

const StyledBox = styled(Box)(({theme}) => ({
  paddingLeft: 24,
  paddingRight: 24,
  paddingBottom: 8,
  paddingTop: 8,
  borderTop: '1px solid',
  borderColor: grey[300],
  
  [`& .${classes.paddingY}`]: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

interface AppsFooterProps {
  children: ReactNode;

  [x: string]: any;
}

const AppsFooter: React.FC<AppsFooterProps> = ({children, ...rest}) => {
  return <StyledBox {...rest}>{children}</StyledBox>;
};

export default AppsFooter;
