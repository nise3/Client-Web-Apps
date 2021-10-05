import React from 'react';
import {Divider, ListItemText, MenuItem, MenuList, Paper} from '@mui/material';
import Link from 'next/link';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => {
  return {
    link: {
      color: theme.palette.primary.dark,
      textDecoration: 'none',
    },
  };
});

const YouthProfileNavigationSidebar = () => {
  const classes = useStyles();

  return (
    <Paper>
      <MenuList>
        <MenuItem>
          <Link href={'../../youth-profile-edit/job-experience/null'}>
            <ListItemText>
              <a className={classes.link}>Personal Information</a>
            </ListItemText>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link href={'../../youth-profile-edit/education/null'}>
            <ListItemText>
              <a className={classes.link}>Education</a>
            </ListItemText>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link href={'../../youth-profile-edit/reference/null'}>
            <ListItemText>
              <a className={classes.link}>Reference</a>
            </ListItemText>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link href={'../../youth-profile-edit/job-experience/null'}>
            <ListItemText>
              <a className={classes.link}>Job Experience</a>
            </ListItemText>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link href={'../../youth-profile-edit/language/null'}>
            <ListItemText>
              <a className={classes.link}>Language</a>
            </ListItemText>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem>
          <Link href={'../../youth-profile-edit/portfolio/null'}>
            <ListItemText>
              <a className={classes.link}>Portfolio</a>
            </ListItemText>
          </Link>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};

export default YouthProfileNavigationSidebar;
