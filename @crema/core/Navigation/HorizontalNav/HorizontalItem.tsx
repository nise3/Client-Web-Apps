import React from 'react';
import {Icon, ListItemText} from '@mui/material';
import {Badge} from '../../../../@crema';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import IntlMessages from '../../../utility/IntlMessages';
import {classes, StyledListItem} from './HorizontalItem.style';
import Box from '@mui/material/Box';
import {NavItemProps} from '../../../../modules/routesConfig';

interface HorizontalItemProps {
  item: NavItemProps;
  dense?: string;
}

const HorizontalItem: React.FC<HorizontalItemProps> = ({item, dense}) => {
  const router = useRouter();
  const {pathname} = router;
  const active = isUrlInChildren(item, pathname);

  function isUrlInChildren(parent: any, url: string) {
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
  }

  return (
    <StyledListItem
      onClick={() => router.push(item.url ? item.url : '/')}
      className={clsx('navItemSubmenu', classes.root, dense && 'dense', {
        active: pathname === item.url,
      })}>
      {item.icon && (
        <Box fontSize={{xs: 16, xl: 18}} mr={3}>
          <Icon style={{color: active ? 'white' : 'action'}}>{item.icon}</Icon>
        </Box>
      )}
      <ListItemText
        className='navLinkTextSubmenu'
        primary={<IntlMessages id={item.messageId} />}
      />
      {item.count && (
        <Box ml={4}>
          <Badge count={item.count} color={item.color} />
        </Box>
      )}
    </StyledListItem>
  );
};

export default React.memo(HorizontalItem);
