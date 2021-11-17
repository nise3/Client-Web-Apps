import {styled} from '@mui/material/styles';
// import Link from 'next/link';
import {ListItem} from '@mui/material';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';
import {useContext} from 'react';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import {AppContext} from '../../../index';

const PREFIX = 'VerticalItem';

export const classes = {
  navItem: `${PREFIX}-navItem`,
  listIcon: `${PREFIX}-listIcon`,
  listItemText: `${PREFIX}-listItemText`,
};

export const StyledListItem = styled(ListItem)(({theme}) => {
  const {sidebarColors} = useContext<AppContextPropsType>(AppContext);

  return {
    [`&.${classes.navItem}`]: {
      height: 40,
      marginTop: 2,
      marginBottom: 2,
      cursor: 'pointer',
      textDecoration: 'none !important',
      width: 'calc(100% - 16px)',
      borderRadius: '0 30px 30px 0',
      paddingLeft:
        theme.direction === 'ltr'
          ? (props: {level: number; themeMode: ThemeMode}) =>
              24 + 40 * props.level
          : 12,
      paddingRight:
        theme.direction === 'rtl'
          ? (props: {level: number; themeMode: ThemeMode}) =>
              24 + 40 * props.level
          : 12,
      '&.nav-item-header': {
        textTransform: 'uppercase',
      },
      '&.active': {
        backgroundColor: theme.palette.primary.main,
        pointerEvents: 'none',
        transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
        '& .nav-item-text': {
          color: theme.palette.common.white + '!important',
          fontWeight: Fonts.MEDIUM,
        },
        '& .nav-item-icon': {
          color: theme.palette.common.white + '!important',
        },
      },

      '&:hover, &:focus': {
        '& .nav-item-text': {
          color: (props: {level: number; themeMode: ThemeMode}) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon': {
          color: (props: {level: number; themeMode: ThemeMode}) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },

        '& .nav-item-icon-arrow': {
          color: (props: {level: number; themeMode: ThemeMode}) =>
            props.themeMode === ThemeMode.LIGHT
              ? theme.palette.primary.main
              : '#fff',
        },
      },
      '& .nav-item-icon': {
        color: sidebarColors?.textColor,
      },
      '& .nav-item-text': {
        color: sidebarColors?.textColor,
        fontWeight: Fonts.MEDIUM,
      },
    },
    [`& .${classes.listIcon}`]: {
      fontSize: 18,
      [theme.breakpoints.up('xl')]: {
        // fontSize: 20,
      },
    },
    [`& .${classes.listItemText}`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: Fonts.REGULAR,
    },
  };
});
