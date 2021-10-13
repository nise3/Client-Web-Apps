import React from 'react';
import {
  Card,
  Divider,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@mui/material';
import {
  Business,
  CalendarToday,
  DesktopMac,
  Person,
  Receipt,
  Score,
  Settings,
} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {Link} from '../common';
import {
  LINK_FRONTEND_YOUTH_FREELANCE_CORNER,
  LINK_FRONTEND_YOUTH_MY_COURSES,
  LINK_FRONTEND_YOUTH_MY_CV,
  LINK_FRONTEND_YOUTH_ROOT,
  LINK_FRONTEND_YOUTH_SETTINGS,
} from '../../common/appLinks';

const SideMenu = () => {
  const {messages} = useIntl();

  return (
    <Card>
      <MenuList>
        <Link href={LINK_FRONTEND_YOUTH_ROOT}>
          <MenuItem>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>
              {messages['youth_feed_menu.my_profile']}
            </ListItemText>
          </MenuItem>
        </Link>

        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_MY_CV}>
          <MenuItem>
            <ListItemIcon>
              <Receipt />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.my_cv']}</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_MY_COURSES}>
          <MenuItem>
            <ListItemIcon>
              <DesktopMac />
            </ListItemIcon>
            <ListItemText>
              {messages['youth_feed_menu.my_courses']}
            </ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_ROOT}>
          <MenuItem>
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.my_jobs']}</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_ROOT}>
          <MenuItem>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.my_locker']}</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_ROOT}>
          <MenuItem>
            <ListItemIcon>
              <CalendarToday />
            </ListItemIcon>
            <ListItemText>
              {messages['youth_feed_menu.my_calender']}
            </ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_FREELANCE_CORNER}>
          <MenuItem>
            <ListItemIcon>
              <Score />
            </ListItemIcon>
            <ListItemText>
              {messages['youth_feed_menu.freelance_corner']}
            </ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_SETTINGS}>
          <MenuItem>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.settings']}</ListItemText>
          </MenuItem>
        </Link>
      </MenuList>
    </Card>
  );
};

export default SideMenu;
