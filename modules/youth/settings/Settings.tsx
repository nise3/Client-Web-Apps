import React, {useState} from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from './Settings.style';
import clsx from 'clsx';
import {Box, Container, Grid, Paper, Typography} from '@mui/material';
import SideMenu from '../../../@softbd/elements/YouthSideMenu';
import SettingOptions from './SettingOptions';
import ChangeUserIdView from './ChangeUserIdView';
import ChangePasswordView from './ChangePasswordView';
import DeleteAccountView from './DeleteAccountView';
import {useIntl} from 'react-intl';

const Settings = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const [isSettingsOpened, setIsSettingsOpened] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>('');

  const showView = (view: string) => {
    setIsSettingsOpened(false);
    setCurrentView(view);
  };
  const getView = () => {
    switch (currentView) {
      case SettingOptions.CHANGE_USER_ID:
        return <ChangeUserIdView onBack={handleBack} />;
      case SettingOptions.CHANGE_PASSWORD:
        return <ChangePasswordView onBack={handleBack} />;
      case SettingOptions.DELETE_ACCOUNT:
        return <DeleteAccountView onBack={handleBack} />;
      default:
        return <React.Fragment />;
    }
  };

  const handleBack = () => {
    setIsSettingsOpened(true);
  };

  return (
    <Container maxWidth={'xl'} className={classes.container}>
      <Grid container spacing={5}>
        <Grid item sm={4} md={4}>
          <SideMenu />
        </Grid>

        <Grid item sm={8} md={8}>
          {isSettingsOpened ? (
            <Paper>
              <Box className={classes.box}>
                <Typography variant={'h6'} style={{marginBottom: '10px'}}>
                  {messages['common.settings']}
                </Typography>
                <Grid container spacing={6}>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box
                      className={classes.settingBox}
                      onClick={() => showView(SettingOptions.CHANGE_USER_ID)}>
                      <Box className={classes.boxItem + ' ' + classes.userItem}>
                        <PeopleAltIcon
                          fontSize={'large'}
                          className='icon'
                          style={{color: '#2494df'}}
                        />
                      </Box>
                      <Typography className='textUser'>
                        {messages['common.change_user_id']}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={6}>
                    <Box
                      className={classes.settingBox}
                      onClick={() => showView(SettingOptions.CHANGE_PASSWORD)}>
                      <Box
                        className={clsx(classes.boxItem, classes.passwordItem)}>
                        <VpnKeyIcon
                          fontSize={'large'}
                          className='icon'
                          style={{color: 'green'}}
                        />
                      </Box>
                      <Typography className='textPassword'>
                        {messages['common.change_password']}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Box
                      className={classes.settingBox}
                      onClick={() => showView(SettingOptions.DELETE_ACCOUNT)}>
                      <Box
                        className={clsx(classes.boxItem, classes.deleteItem)}>
                        <DeleteIcon
                          fontSize={'large'}
                          className='icon'
                          style={{color: 'red'}}
                        />
                      </Box>
                      <Typography className='textDelete'>
                        {messages['common.delete_account']}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          ) : (
            getView()
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
