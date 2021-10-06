import React, {ReactNode, useContext} from 'react';
import {Box} from '@mui/material';
import Card from '@mui/material/Card';
import useStyles from './index.style';
import {AppContext} from '../../index';
import clsx from 'clsx';

interface AppsContainerProps {
  fullView?: boolean;
  fullHeight?: boolean;
  cardStyle?: any;
  children: ReactNode;
}

const AppsContainer: React.FC<AppsContainerProps> = ({
  cardStyle,
  fullView = false,
  children,
  fullHeight = false,
}) => {
  const {footer, navStyle} = useContext(AppContext);
  const classes = useStyles({footer, navStyle, fullView});

  return (
    <Box flex={1} display='flex' flexDirection='column'>
      <Box className={classes.appsContainer}>
        <Box className={clsx(classes.appsMainContent)}>
          <Card
            style={{
              height: fullHeight ? '100%' : 'auth',
              display: 'flex',
              flexDirection: 'column',
              ...cardStyle,
            }}>
            {children}
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AppsContainer;
