import React, {ReactNode} from 'react';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import useStyles from '../../../../shared/jss/common/common.style';

const useStyle = makeStyles(() => ({
  appAuth: {
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
  },
}));

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
  useStyles();
  const classes = useStyle();
  return <Box className={classes.appAuth}>{children}</Box>;
};

export default AuthLayout;
