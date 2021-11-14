import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import {grey} from '@mui/material/colors';

const StyledBox = styled(Box)(({theme}) => ({
  height: 60,
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${grey[300]}`,
  [theme.breakpoints.up('xl')]: {
    height: 77,
  },
}));

interface AppsFooterProps {
  children: ReactNode;
}

const AppsHeader: React.FC<AppsFooterProps> = ({children}) => {
  return <StyledBox px={6}>{children}</StyledBox>;
};

export default AppsHeader;
