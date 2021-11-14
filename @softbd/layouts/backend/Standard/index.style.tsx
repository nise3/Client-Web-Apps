import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import {useContext} from 'react';
import AppContext from '../../../../@crema/utility/AppContext';
import {ThemeStyle} from '../../../../shared/constants/AppEnums';

const PREFIX = 'StandardLayout';

export const classes = {
  appMain: `${PREFIX}-appMain`,
  mainContent: `${PREFIX}-mainContent`,
  mainContainer: `${PREFIX}-mainContainer`,
  mainContainerFull: `${PREFIX}-mainContainerFull`,
  boxedLayout: `${PREFIX}-boxedLayout`,
};

export const StyledBox = styled(Box)(({theme}) => {
  const {themeStyle, footer} = useContext<AppContextPropsType>(AppContext);
  return {
    [`&.${classes.appMain}`]: {
      height: '100vh',
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
      backgroundColor: theme.palette.background.default,
      paddingTop: 56,
      [theme.breakpoints.up('sm')]: {
        paddingTop: 70,
      },
      '&.appMainFixedFooter': {
        paddingBottom: 48,
        [theme.breakpoints.up('xl')]: {
          paddingBottom: 58,
        },
        '& .scrollAppSidebar': {
          height:
            themeStyle === ThemeStyle.MODERN
              ? 'calc(100vh - 260px) !important'
              : 'calc(100vh - 198px) !important',
          [theme.breakpoints.up('xl')]: {
            height:
              themeStyle === ThemeStyle.MODERN
                ? 'calc(100vh - 300px) !important'
                : 'calc(100vh - 236px) !important',
          },
        },
        '& $mainContainer': {
          paddingBottom: 1,
        },
      },
    },
    [`& .${classes.mainContent}`]: {
      flex: 1,
      display: 'flex',
      [theme.breakpoints.up('lg')]: {
        marginLeft: '19rem',
      },
      [theme.breakpoints.up('xl')]: {
        marginLeft: '21.6rem',
      },
    },
    [`& .${classes.mainContainer}`]: {
      paddingBottom: footer ? 0 : 10,
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: `calc(100vw - 19rem)`,
      },
      [theme.breakpoints.up('xl')]: {
        width: `calc(100vw - 21.6rem)`,
      },

      '& > .scrollbar-container': {
        padding: '20px 20px 0',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          padding: '30px 32px 0',
        },
      },
    },
    [`& .${classes.mainContainerFull}`]: {
      width: '100vw',
      paddingBottom: footer ? 0 : 10,
      '& > .scrollbar-container': {
        padding: '20px 20px 0',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
          padding: '30px 32px 0',
        },
      },
    },
    [`& .${classes.boxedLayout}`]: {
      [theme.breakpoints.up('lg')]: {
        maxWidth: 1260,
        marginLeft: 'auto',
        marginRight: 'auto',
        boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.12)',
        '& .app-sidebar': {
          position: 'absolute',
        },
        '& .fixed-footer': {
          position: 'sticky',
          width: '100%',
        },
        '& $mainContent': {
          width: 'calc(100% - 19rem)',
          flex: 'auto',
        },
        '& $mainContainer': {
          width: '100%',
        },
        '& .app-bar': {
          width: 'calc(100% - 19rem)',
          position: 'absolute',
          boxShadow: '0px 0px 4px 2px rgba(0,0,0,0.12)',
        },
        '& .grid-btn': {
          fontSize: 11,
        },
      },
      [theme.breakpoints.up('xl')]: {
        maxWidth: 1680,
        '& $mainContent, & .app-bar': {
          width: 'calc(100% - 21.6rem)',
        },
      },
    },
  };
});
