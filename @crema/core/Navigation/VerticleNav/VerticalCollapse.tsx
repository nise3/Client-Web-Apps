import React, {useContext, useEffect, useState} from 'react';
import {
  Collapse,
  Icon,
  IconButton,
  ListItem,
  ListItemText,
} from '@mui/material';
import clsx from 'clsx';
import VerticalItem from './VerticalItem';
import AppContext from '../../../utility/AppContext';
import Box from '@mui/material/Box';
import IntlMessages from '../../../utility/IntlMessages';
import {useRouter} from 'next/router';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import {NavItemProps} from '../../../../modules/routesConfig';
import {styled} from '@mui/material/styles';
import {Fonts, ThemeMode} from '../../../../shared/constants/AppEnums';

const PREFIX = 'VerticalCollapse';

export const classes = {
  navItem: `${PREFIX}-navItem`,
  listItemText: `${PREFIX}-listItemText`,
  listIcon: `${PREFIX}-listIcon`,
};

const StyledListItem = styled(ListItem)(({theme}) => {
  const {sidebarColors, themeMode} =
    useContext<AppContextPropsType>(AppContext);
  return {
    height: 40,
    marginTop: 2,
    marginBottom: 2,
    width: 'calc(100% - 16px)',
    borderRadius: '0 30px 30px 0',
    '& .nav-item-text': {
      fontWeight: Fonts.REGULAR,
      color: sidebarColors?.textColor,
      [theme.breakpoints.up('xl')]: {
        marginTop: 4,
        marginBottom: 4,
      },
    },

    '& .nav-item-icon': {
      color: sidebarColors?.textColor,
    },

    '& .nav-item-icon-arrow': {
      color: sidebarColors?.textColor,
    },

    '& .MuiIconButton-root': {
      marginRight: -16,
    },

    '&.open, &:hover, &:focus': {
      '& .nav-item-text': {
        fontWeight: Fonts.MEDIUM,
        color: themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
      },

      '& .nav-item-icon': {
        color: themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
      },

      '& .nav-item-icon-arrow': {
        color: themeMode === ThemeMode.LIGHT ? '#313541' : '#fff',
      },
    },
    [`& .${classes.listItemText}`]: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    [`& .${classes.listIcon}`]: {
      fontSize: 18,
    },
  };
});

const needsToBeOpened = (pathname: string, item: NavItemProps): boolean => {
  if (pathname) {
    return isUrlInChildren(item, pathname);
  }
  return false;
};

const isUrlInChildren = (parent: any, url: string) => {
  if (!parent.children) {
    return false;
  }

  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].children) {
      if (isUrlInChildren(parent.children[i], url)) {
        return true;
      }
    }

    if (
      parent.children[i].url === url ||
      url.includes(parent.children[i].url)
    ) {
      return true;
    }
  }

  return false;
};

interface VerticalCollapseProps {
  item: NavItemProps;
  level: number;
}

const VerticalCollapse: React.FC<VerticalCollapseProps> = ({item, level}) => {
  const {theme} = useContext<AppContextPropsType>(AppContext);

  const {pathname} = useRouter();
  const [open, setOpen] = useState(() => needsToBeOpened(pathname, item));

  useEffect(() => {
    if (needsToBeOpened(pathname, item)) {
      setOpen(true);
    }
  }, [pathname, item]);

  const handleClick = () => {
    setOpen(!open);
  };
  console.log('VerticalCollapse-level', level);
  return (
    <>
      <StyledListItem
        //@ts-ignore
        button
        component='li'
        className={clsx('nav-item', open && 'open')}
        style={{
          paddingLeft: 24 + 20 * level,
          paddingRight: 12,
        }}
        onClick={handleClick}>
        {item.icon && (
          <Box component='span' mr={3}>
            <Icon
              color='action'
              className={clsx('nav-item-icon', classes.listIcon)}>
              {item.icon}
            </Icon>
          </Box>
        )}
        <ListItemText
          classes={{primary: clsx('nav-item-text', classes.listItemText)}}
          primary={<IntlMessages id={item.messageId} />}
        />
        <Box>
          <IconButton disableRipple>
            <Icon className='nav-item-icon-arrow' color='inherit'>
              {open
                ? 'expand_more'
                : theme.direction === 'ltr'
                ? 'chevron_right'
                : 'chevron_left'}
            </Icon>
          </IconButton>
        </Box>
      </StyledListItem>

      {item.children && Array.isArray(item.children) && (
        <Collapse in={open} className='collapse-children'>
          {item.children.map((item: any) => (
            <React.Fragment key={item.id}>
              {item.type === 'collapse' && (
                <VerticalCollapse item={item} level={level + 1} />
              )}

              {item.type === 'item' && (
                <VerticalItem item={item} level={level + 1} />
              )}
            </React.Fragment>
          ))}
        </Collapse>
      )}
    </>
  );
};

export default React.memo(VerticalCollapse);
