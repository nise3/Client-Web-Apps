import React, {useCallback, useState} from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from './Settings.style';
import ChangeYouthUserIDPopup from './ChangeYouthUserIDPopup';
import ConfirmPasswordPopup from './ConfirmPasswordPopup';
import DeactivateAccountPopup from './DeactivateAccountPopup';
import clsx from 'clsx';
import {Box, Container, Grid, Paper, Typography} from '@mui/material';
// import SideMenu from '../../@softbd/elements/YouthSideMenu';

const Settings = () => {
  const classes = useStyles();
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenPasswordChangeModal, setIsOpenPasswordChangeModal] =
    useState(false);
  const [isOpenDeactivateModal, setIsOpenDeactivateModal] = useState(false);

  const openEditModal = useCallback(() => {
    setIsOpenEditModal(true);
  }, []);
  const closeEditModal = useCallback(() => {
    setIsOpenEditModal(false);
  }, []);

  const openPasswordChangeModal = useCallback(() => {
    setIsOpenPasswordChangeModal(true);
  }, []);
  const closePasswordChangeModal = useCallback(() => {
    setIsOpenPasswordChangeModal(false);
  }, []);

  const openDeactivateModal = useCallback(() => {
    setIsOpenDeactivateModal(true);
  }, []);
  const closeDeactivateModal = useCallback(() => {
    setIsOpenDeactivateModal(false);
  }, []);

  return (
    <Container className={classes.container}>
      <Grid container spacing={6}>
        <Grid item sm={4} md={4}>
          {/*<SideMenu />*/}
        </Grid>

        <Grid item sm={8} md={8}>
          <Paper className={classes.paper}>
            <Box className={classes.box}>
              <Typography variant={'h6'} style={{marginBottom: '10px'}}>
                Settings
              </Typography>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6} md={6}>
                  <Box
                    className={classes.settingBox}
                    onClick={() => openEditModal()}>
                    <Box className={classes.boxItem + ' ' + classes.userItem}>
                      <PeopleAltIcon
                        fontSize={'large'}
                        className='icon'
                        style={{color: '#2494df'}}
                      />
                    </Box>
                    <Typography className='textUser'>Change User Id</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                  <Box
                    className={classes.settingBox}
                    onClick={() => openPasswordChangeModal()}>
                    <Box
                      className={clsx(classes.boxItem, classes.passwordItem)}>
                      <VpnKeyIcon
                        fontSize={'large'}
                        className='icon'
                        style={{color: 'green'}}
                      />
                    </Box>
                    <Typography className='textPassword'>
                      Change Password
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Box
                    className={classes.settingBox}
                    onClick={() => openDeactivateModal()}>
                    <Box className={classes.boxItem + ' ' + classes.deleteItem}>
                      <DeleteIcon
                        fontSize={'large'}
                        className='icon'
                        style={{color: 'red'}}
                      />
                    </Box>
                    <Typography className='textDelete'>
                      Deactivate Account
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {isOpenEditModal && (
        <ChangeYouthUserIDPopup key={1} onClose={closeEditModal} />
      )}
      {isOpenPasswordChangeModal && (
        <ConfirmPasswordPopup key={1} onClose={closePasswordChangeModal} />
      )}
      {isOpenDeactivateModal && (
        <DeactivateAccountPopup key={1} onClose={closeDeactivateModal} />
      )}
    </Container>
  );
};

export default Settings;
