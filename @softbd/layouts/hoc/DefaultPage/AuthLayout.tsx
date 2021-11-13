import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';

const StyledBox = styled(Box)(() => ({
  flex: 1,
  display: 'flex',
  position: 'relative',
  minHeight: '100vh',
  backgroundColor: '#f7fafc',
  /*background: `url(/images/auth-background.jpg) no-repeat center center`,*/
  backgroundSize: 'cover',

  '& .scrollbar-container': {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  '& .main-content-view': {
    padding: 20,
  },
  '& .footer': {
    marginRight: 0,
    marginLeft: 0,
  },
}));

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
  return <StyledBox>{children}</StyledBox>;
};

export default AuthLayout;
