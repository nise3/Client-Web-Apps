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
  CastForEducation,
  ContactPage,
  Folder,
  LaptopMac,
  PersonOutline,
  Settings,
  Today,
  Work,
} from '@mui/icons-material';
import {useIntl} from 'react-intl';
import {Link} from '../common';
import {
  LINK_FRONTEND_YOUTH_CALENDAR,
  LINK_FRONTEND_YOUTH_FREELANCE_CORNER,
  LINK_FRONTEND_YOUTH_MY_COURSES,
  LINK_FRONTEND_YOUTH_MY_CV,
  LINK_FRONTEND_YOUTH_MY_JOBS,
  LINK_FRONTEND_YOUTH_ROOT,
  LINK_FRONTEND_YOUTH_SETTINGS,
} from '../../common/appLinks';

const SideMenu: any = () => {
  const {messages} = useIntl();

  return (
    <Card>
      <MenuList>
        <Link href={LINK_FRONTEND_YOUTH_ROOT}>
          <MenuItem>
            <ListItemIcon>
              <PersonOutline />
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
              <ContactPage />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.my_cv']}</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_MY_COURSES}>
          <MenuItem>
            <ListItemIcon>
              <CastForEducation />
            </ListItemIcon>
            <ListItemText>
              {messages['youth_feed_menu.my_courses']}
            </ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_MY_JOBS}>
          <MenuItem>
            <ListItemIcon>
              <Work />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.my_jobs']}</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_ROOT}>
          <MenuItem>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            <ListItemText>{messages['youth_feed_menu.my_locker']}</ListItemText>
          </MenuItem>
        </Link>
        <Divider />
        <Link href={LINK_FRONTEND_YOUTH_CALENDAR}>
          <MenuItem>
            <ListItemIcon>
              <Today />
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
              <LaptopMac />
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
