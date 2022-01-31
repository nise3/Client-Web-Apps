import React, {useContext} from 'react';
import {Icon, ListItem, ListItemText} from '@mui/material';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import {Badge} from '../../../index';
import Box from '@mui/material/Box';
import IntlMessages from '../../../utility/IntlMessages';
import Link from 'next/link';
import {NavItemProps} from '../../../../modules/routesConfig';
import {styled} from '@mui/material/styles';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import AppContext from '../../../utility/AppContext';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';

const PREFIX = 'VerticalItem';

export const classes = {
  listIcon: `${PREFIX}-listIcon`,
  listItemText: `${PREFIX}-listItemText`,
};
const StyledListItem = styled(ListItem)(({theme}) => {
  const {sidebarColors, themeMode} =
    useContext<AppContextPropsType>(AppContext);

  return {
    minHeight: 40,
    marginTop: 2,
    marginBottom: 2,
    cursor: 'pointer',
    textDecoration: 'none !important',
    width: 'calc(100% - 16px)',
    borderRadius: '0 30px 30px 0',
    '&.nav-item-header': {
      textTransform: 'uppercase',
    },
    '&.active': {
      backgroundColor: theme.palette.primary.main,
      pointerEvents: 'none',
      transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
      '& .nav-item-text': {
        color: theme.palette.grey['200'],
      },
      '& .nav-item-icon': {
        color: theme.palette.grey['200'],
      },
    },

    '&:hover, &:focus': {
      '& .nav-item-text': {
        color:
          themeMode === ThemeMode.LIGHT
            ? theme.palette.primary.main
            : theme.palette.grey['200'],
      },

      '& .nav-item-icon': {
        color:
          themeMode === ThemeMode.LIGHT
            ? theme.palette.primary.main
            : theme.palette.grey['200'],
      },

      '& .nav-item-icon-arrow': {
        color:
          themeMode === ThemeMode.LIGHT
            ? theme.palette.primary.main
            : theme.palette.grey['200'],
      },
    },
    '& .nav-item-icon': {
      color: sidebarColors?.textColor,
    },
    '& .nav-item-text': {
      color: sidebarColors?.textColor,
    },
    listIcon: {
      fontSize: 18,
      [theme.breakpoints.up('xl')]: {},
    },
    listItemText: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontWeight: Fonts.REGULAR,
    },
  };
});

interface VerticalItemProps {
  item: NavItemProps;
  level: number;
}

const VerticalItem: React.FC<VerticalItemProps> = ({item, level}) => {
  const router = useRouter();
  const {pathname} = router;
  return (
    // @ts-ignore
    <Link href={item.url!} as={item.as}>
      <StyledListItem
        // @ts-ignore
        button
        className={clsx('nav-item', {
          active: item.url === pathname,
        })}
        style={{
          paddingLeft: 24 + 20 * level,
          paddingRight: 12,
          paddingTop: 0,
          paddingBottom: 0,
        }}>
        {item.icon && (
          <Box component='span' mr={3}>
            <Icon
              className={clsx(classes.listIcon, 'nav-item-icon')}
              color='action'>
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          primary={<IntlMessages id={item.messageId} />}
          classes={{primary: 'nav-item-text'}}
        />
        {item.count && (
          <Box mr={1}>
            <Badge count={item.count} color={item.color} />
          </Box>
        )}
      </StyledListItem>
    </Link>
  );
};

export default React.memo(VerticalItem);
