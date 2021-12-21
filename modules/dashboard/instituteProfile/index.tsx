import {Avatar, Button, Divider, Grid, Typography} from '@mui/material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {Call, Email} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {RiEditBoxFill} from 'react-icons/ri';
import {H4, H6} from '../../../@softbd/elements/common';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import InstituteProfileEditPopup from './InstituteProfileEditPopup';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {useFetchInstituteProfile} from '../../../services/instituteManagement/hooks';

const PREFIX = 'InstituteProfile';

const classes = {
  card: `${PREFIX}-card`,
  form: `${PREFIX}-form`,
  contact_person_avatar: `${PREFIX}-contact_person_avatar`,
  divider: `${PREFIX}-divider`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  marginTop: '20px',
  marginBottom: '20px',
  justifyContent: 'space-around',

  [`& .${classes.contact_person_avatar}`]: {
    width: '100px',
    height: '100px',
    boxShadow: '0px 0px 5px 2px #e9e9e9',
    marginTop: '10px',
    [`& img`]: {
      objectFit: 'unset',
    },
  },
  [`& .${classes.card}`]: {
    background: theme.palette.common.white,
    border: '1px solid #e9e9e9',
    borderRadius: '7px',
  },
  [`& .${classes.form}`]: {
    background: theme.palette.common.white,
    borderRadius: '7px',
    padding: '40px',
  },
  [`& .${classes.divider}`]: {
    width: '100%',
  },
}));

const InstituteProfile = () => {
  const {messages} = useIntl();
  const [closeEditModal, setCloseEditModal] = useState<boolean>(true);
  const authUser = useAuthUser();
  const {data: profileData} = useFetchInstituteProfile(authUser?.institute_id);
  const onClickCloseEditModal = useCallback(() => {
    setCloseEditModal((previousToggle) => !previousToggle);
  }, []);
  const institute_types = [
    {
      key: 0,
      label: messages['common.government'],
    },
    {
      key: 1,
      label: messages['common.non_government'],
    },
  ];
  return (
    <>
      <StyledGrid container>
        <Grid item xs={4}>
          <Grid container className={classes.card}>
            <Grid
              item
              xs={12}
              padding={1}
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}>
              <Avatar
                className={classes.contact_person_avatar}
                src={'https://www.bgmea.com.bd/img/logo.png?v=5'}
              />
              <H6 fontWeight={'bold'} mt={1}>
                {profileData?.title}
              </H6>
              <Typography variant={'subtitle2'}>
                {institute_types[profileData?.institute_type_id]?.label}
              </Typography>
            </Grid>
            <Divider orientation={'horizontal'} className={classes.divider} />
            <Grid
              item
              xs={12}
              sx={{padding: '8px 0 8px 30px'}}
              display={'flex'}
              alignItems={'center'}>
              <Email sx={{color: '#F0B501'}} />
              <Typography sx={{marginLeft: '10px'}} variant={'subtitle2'}>
                {profileData?.email}
              </Typography>
            </Grid>
            <Divider orientation={'horizontal'} className={classes.divider} />
            <Grid
              item
              xs={12}
              sx={{padding: '8px 0 8px 30px'}}
              display={'flex'}
              alignItems={'center'}>
              <Call sx={{color: '#3FB0EF'}} />
              <Typography sx={{marginLeft: '10px'}} variant={'subtitle2'}>
                {profileData?.mobile}
              </Typography>
            </Grid>
            <Divider orientation={'horizontal'} className={classes.divider} />
            <Grid
              item
              xs={12}
              padding={2}
              mb={10}
              display={'flex'}
              justifyContent={'center'}>
              <Button
                onClick={onClickCloseEditModal}
                sx={{borderRadius: '10px'}}
                variant='outlined'
                color='primary'
                startIcon={<RiEditBoxFill />}>
                {messages['youth_profile.edit_profile']}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={7}>
          <Grid container className={classes.form} spacing={2}>
            <Grid item xs={12}>
              <H4>{messages['common.institute_information']}</H4>
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.institute_name']}
                value={profileData?.title}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.institute_name_bn']}
                value={profileData?.title_bn}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.institute_type']}
                value={institute_types[profileData?.institute_type_id]?.label}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.domain']}
                value={profileData?.domain}
                isLoading={false}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['association.head_of_office_or_chairman']}
                value={'Mr Atiqur Rahman'}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.designation']}
                value={'Designation'}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </StyledGrid>
      {!closeEditModal && (
        <InstituteProfileEditPopup onClose={onClickCloseEditModal} />
      )}
    </>
  );
};

export default InstituteProfile;
