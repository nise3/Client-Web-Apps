import React, {useContext} from 'react';
import {Icon, ListItem, ListItemText} from '@mui/material';
import {useRouter} from 'next/router';
import clsx from 'clsx';
import {Badge} from '../../../index';
import Box from '@mui/material/Box';
import IntlMessages from '../../../utility/IntlMessages';
import useStyles from './VerticalItem.style';
import AppContext from '../../../utility/AppContext';
import Link from 'next/link';
import {NavItemProps} from '../../../../modules/routesConfig';

interface VerticalItemProps {
  item: NavItemProps;
  level: number;
}

const VerticalItem: React.FC<VerticalItemProps> = ({item, level}) => {
  const {themeMode} = useContext(AppContext);
  const classes = useStyles({level, themeMode});
  const router = useRouter();
  const {pathname} = router;
  return (
    <Link href={item.url!} as={item.as}>
      <ListItem
        button
        className={clsx(classes.navItem, 'nav-item', {
          active: item.url === pathname,
        })}>
        {item.icon && (
          <Box component='span' mr={6}>
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
      </ListItem>
    </Link>
  );
};
export default React.memo(VerticalItem);
