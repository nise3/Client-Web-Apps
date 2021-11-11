import React, {ReactNode} from 'react';
import { styled } from '@mui/material/styles';
import Scrollbar from '../Scrollbar';
import makeStyles from '@mui/styles/makeStyles';
import {alpha} from '@mui/material';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';

const PREFIX = 'AppsContent';

const classes = {
  appsContentContainer: `${PREFIX}-appsContentContainer`
};

const StyledScrollbar = styled(Scrollbar)((
  {
    theme: CremaTheme
  }
) => ({
  [`&.${classes.appsContentContainer}`]: (props: {
    isDetailView: boolean;
    fullView: boolean;
  }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - ${props.isDetailView ? 60 : 115}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${props.fullView ? 0 : 60}px)`,
    },
    [theme.breakpoints.up('xl')]: {
      height: `calc(100% - ${props.fullView ? 0 : 77}px)`,
    },
    '& .scrum-absolute': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    },
    '& .scrum-row': {
      display: 'inline-flex',
      minWidth: '100%',
      height: '100%',
      marginLeft: '-10px',
      marginRight: '-10px',
    },
    '& .scrum-col': {
      minWidth: '280px',
      maxWidth: '280px',
      marginLeft: '10px',
      marginRight: '10px',
      borderRadius: theme.components.MuiCard.styleOverrides.root.borderRadius,
      backgroundColor: alpha(theme.palette.background.paper, 0.45),
      height: '100% !important',
      [theme.breakpoints.up('md')]: {
        minWidth: '354px',
        maxWidth: '354px',
      },
    },
    '& .scroll-scrum-item': {
      height: 'auto !important',
    },
  })
}));

export const useAppsContentStyles = makeStyles((
  {
    theme: CremaTheme
  }
) => ({
  [`&.${classes.appsContentContainer}`]: (props: {
    isDetailView: boolean;
    fullView: boolean;
  }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: `calc(100% - ${props.isDetailView ? 60 : 115}px)`,
    [theme.breakpoints.up('sm')]: {
      height: `calc(100% - ${props.fullView ? 0 : 60}px)`,
    },
    [theme.breakpoints.up('xl')]: {
      height: `calc(100% - ${props.fullView ? 0 : 77}px)`,
    },
    '& .scrum-absolute': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    },
    '& .scrum-row': {
      display: 'inline-flex',
      minWidth: '100%',
      height: '100%',
      marginLeft: '-10px',
      marginRight: '-10px',
    },
    '& .scrum-col': {
      minWidth: '280px',
      maxWidth: '280px',
      marginLeft: '10px',
      marginRight: '10px',
      borderRadius: theme.components.MuiCard.styleOverrides.root.borderRadius,
      backgroundColor: alpha(theme.palette.background.paper, 0.45),
      height: '100% !important',
      [theme.breakpoints.up('md')]: {
        minWidth: '354px',
        maxWidth: '354px',
      },
    },
    '& .scroll-scrum-item': {
      height: 'auto !important',
    },
  })
}));

interface AppsContentProps {
  isDetailView?: boolean;
  fullView?: boolean;
  style?: any;
  children: ReactNode;

  [x: string]: any;
}

const AppsContent: React.FC<AppsContentProps> = ({
  isDetailView = false,
  fullView = false,
  style = {},
  children,
}) => {
  const classes = useAppsContentStyles({
    isDetailView,
    fullView,
  });
  return (
    <StyledScrollbar className={classes.appsContentContainer} style={style}>
      {children}
    </StyledScrollbar>
  );
};

export default AppsContent;
