import {H4, H6} from '../../../@softbd/elements/common';
import {styled} from '@mui/material/styles';
import {Avatar, Button, Divider, Grid, Typography} from '@mui/material';
import {Call, Email} from '@mui/icons-material';
import {RiEditBoxFill} from 'react-icons/ri';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import OrganizationProfileEditPopup from './OrganizationProfileEditPopup';
import {useFetchOrganizationProfile} from '../../../services/organaizationManagement/hooks';

const PREFIX = 'OrganizationProfile';

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
    border: '1px solid #e9e9e9',
    borderRadius: '7px',
    padding: '40px',
  },
  [`& .${classes.divider}`]: {
    width: '100%',
  },
}));

const OrganizationProfile = () => {
  const {messages} = useIntl();

  const [closeEditModal, setCloseEditModal] = useState<boolean>(true);
  const [profileFilter] = useState({});
  const {
    data: profileData,
    isLoading,
    mutate: mutateOrganizationProfile,
  } = useFetchOrganizationProfile(profileFilter);

  const onClickCloseEditModal = useCallback(() => {
    setCloseEditModal((previousToggle) => !previousToggle);
    mutateOrganizationProfile();
  }, []);

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
                src={'/images/lead_soft.svg'}
              />
              <H6 fontWeight={'bold'} mt={1}>
                {profileData?.title}
              </H6>
              <Typography variant={'subtitle2'}>
                {profileData?.organization_type_title}
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
          <Grid container spacing={2} className={classes.form}>
            <Grid item xs={12}>
              <H4>{messages['common.organization_info']}</H4>
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['common.organization_name']}
                value={profileData?.title}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['organization_type.label']}
                value={profileData?.organization_type_title}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['divisions.label']}
                value={profileData?.loc_division_title}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['districts.label']}
                value={profileData?.loc_district_title}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['upazilas.label']}
                value={profileData?.loc_upazila_title}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{padding: '0 20px 20px 0'}}>
              <DetailsInputView
                label={messages['association.head_of_office_or_chairman']}
                value={profileData?.name_of_the_office_head}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{padding: '0 20px 20px 0'}}>
              <DetailsInputView
                label={messages['common.organization_address']}
                value={profileData?.address}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_name']}
                value={profileData?.contact_person_name}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_designation']}
                value={profileData?.contact_person_designation}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_mobile']}
                value={profileData?.contact_person_mobile}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_email']}
                value={profileData?.contact_person_email}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['institute.name_of_the_office_head']}
                value={profileData?.name_of_the_office_head}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['institute.name_of_the_office_head']}
                value={profileData?.name_of_the_office_head}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={6}>
              <DetailsInputView
                label={
                  messages['institute.name_of_the_office_head_designation']
                }
                value={profileData?.name_of_the_office_head_designation}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Grid>
      </StyledGrid>
      {!closeEditModal && (
        <OrganizationProfileEditPopup onClose={onClickCloseEditModal} />
      )}
    </>
  );
};

export default OrganizationProfile;
