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

const SideMenu = () => {
  const {messages} = useIntl();

  return (
    <Card>
      <MenuList>
        <MenuItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>{messages['youth_feed_menu.my_profile']}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Receipt />
          </ListItemIcon>
          <ListItemText>{messages['youth_feed_menu.my_cv']}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <DesktopMac />
          </ListItemIcon>
          <ListItemText>{messages['youth_feed_menu.my_courses']}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Business />
          </ListItemIcon>
          <ListItemText>{messages['youth_feed_menu.my_jobs']}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText>{messages['youth_feed_menu.my_locker']}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          <ListItemText>{messages['youth_feed_menu.my_calender']}</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Score />
          </ListItemIcon>
          <ListItemText>
            {messages['youth_feed_menu.freelance_corner']}
          </ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText>{messages['youth_feed_menu.settings']}</ListItemText>
        </MenuItem>
      </MenuList>
    </Card>
  );
};

export default SideMenu;
