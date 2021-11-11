import React, {ReactNode} from 'react';
import {styled} from '@mui/material/styles';
import {Box} from '@mui/material';
import Card from '@mui/material/Card';
import clsx from 'clsx';

const PREFIX = 'UnstyledAppsContainer';

const classes = {
  appsContainer: `${PREFIX}-appsContainer`,
  appsMainContent: `${PREFIX}-appsMainContent`,
};

interface UnstyledAppsContainerProps {
  fullView?: boolean;
  fullHeight?: boolean;
  cardStyle?: any;
  children: ReactNode;
}

const UnstyledAppsContainer: React.FC<UnstyledAppsContainerProps> = ({
  cardStyle,
  fullView = false,
  children,
  fullHeight = false,
}) => {
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

const getHeaderHeight = (screenSize: number) => {
  return screenSize >= 600 ? 70 : 60;
};

const AppsContainer = styled(UnstyledAppsContainer)(({theme}) => ({
  minHeight: `calc(100vh - ${
    55 + // AppContainerHeader Height
    20 + //Container Padding
    getHeaderHeight(0)
  }px) !important`,
  [theme.breakpoints.up('sm')]: {
    minHeight: `calc(100vh - ${
      55 + // AppContainerHeader Height
      20 + //Container Padding
      getHeaderHeight(600)
    }px) !important`,
  },
  [theme.breakpoints.up('md')]: {
    minHeight: `calc(100vh - ${
      55 + // AppContainerHeader Height
      30 + //Container Padding
      getHeaderHeight(960)
    }px) !important`,
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: `calc(100vh - ${
      43 + // AppContainerHeader Height
      30 + //Container Padding
      getHeaderHeight(1280)
    }px) !important`,
  },
  [theme.breakpoints.up('xl')]: {
    minHeight: `calc(100vh - ${
      64 + // AppContainerHeader Height
      30 + //Container Padding
      getHeaderHeight(1920)
    }px) !important`,
  },
  display: 'flex',
  [`& .${classes.appsMainContent}`]: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: `${(props: any) =>
        'calc(100% - ' + (props.fullView ? 0 : 17) + 'rem)'}`,
      paddingLeft: `${(props: any) => (props.fullView ? 0 : 40)}`,
    },
    [theme.breakpoints.up('xl')]: {
      width: `${(props: any) =>
        'calc(100% - ' + (props.fullView ? 0 : 20) + 'rem)'}`,
    },
  },
}));

export default AppsContainer;
