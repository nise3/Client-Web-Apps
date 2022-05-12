import {Button, Divider, Grid, Skeleton, Typography} from '@mui/material';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {Call, Email} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {RiEditBoxFill} from 'react-icons/ri';
import {H4, H6} from '../../../@softbd/elements/common';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import InstituteProfileEditPopup from './InstituteProfileEditPopup';
import {useFetchInstituteProfile} from '../../../services/instituteManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import AvatarImageView from '../../../@softbd/elements/display/ImageView/AvatarImageView';

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
  const {data: profileData, isLoading: isLoadingUserData} =
    useFetchInstituteProfile();
  const onClickCloseEditModal = useCallback(() => {
    setCloseEditModal((previousToggle) => !previousToggle);
  }, []);
  const institute_types = [
    {
      key: 0,
      label: messages['common.non_government'],
    },
    {
      key: 1,
      label: messages['common.government'],
    },
  ];
  return (
    <>
      <StyledGrid container>
        {isLoadingUserData ? (
          <>
            <Skeleton variant='rectangular' width={'30%'} height={340} />
            <Skeleton variant='rectangular' width={'50%'} height={340} />
          </>
        ) : (
          <Grid item xs={4}>
            <Grid container className={classes.card} spacing={3}>
              <Grid
                item
                xs={12}
                padding={1}
                display={'flex'}
                alignItems={'center'}
                flexDirection={'column'}>
                <AvatarImageView
                  className={classes.contact_person_avatar}
                  src={profileData?.logo}
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
                  {profileData?.contact_person_mobile}
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
        )}
        <Grid item xs={7}>
          <Grid container className={classes.form} spacing={3}>
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
            {/*<Grid item xs={12} md={6}>*/}
            {/*  <DetailsInputView*/}
            {/*    label={messages['common.domain']}*/}
            {/*    value={profileData?.domain}*/}
            {/*    isLoading={false}*/}
            {/*  />*/}
            {/*</Grid>*/}
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['divisions.label']}
                value={profileData?.division_title}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['districts.label']}
                value={profileData?.district_title}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['upazilas.label']}
                value={profileData?.upazila_title}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['association.association_address']}
                value={profileData?.address}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_name']}
                value={profileData?.contact_person_name}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_name_en']}
                value={profileData?.contact_person_name_en}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_designation']}
                value={profileData?.contact_person_designation}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_designation_en']}
                value={profileData?.contact_person_designation_en}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_mobile']}
                value={profileData?.contact_person_mobile}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.contact_person_email']}
                value={profileData?.contact_person_email}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['institute.name_of_the_office_head']}
                value={profileData?.name_of_the_office_head}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['institute.name_of_the_office_head_en']}
                value={profileData?.name_of_the_office_head_en}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={
                  messages['institute.name_of_the_office_head_designation']
                }
                value={profileData?.name_of_the_office_head_designation}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={
                  messages['institute.name_of_the_office_head_designation_en']
                }
                value={profileData?.name_of_the_office_head_designation_en}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.mobile']}
                value={profileData?.primary_mobile}
                isLoading={false}
              />
            </Grid>
            {profileData?.mobile_numbers &&
              Array.isArray(profileData.mobile_numbers) &&
              profileData.mobile_numbers.map((mobile: any, index: any) => {
                return (
                  <Grid item xs={6} key={index}>
                    <DetailsInputView
                      label={messages['common.mobile'] + ' #' + (index + 1)}
                      value={mobile}
                      isLoading={false}
                    />
                  </Grid>
                );
              })}
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.country']}
                value={profileData?.country}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomChipRowStatus
                label={messages['common.active_status']}
                value={profileData?.row_status}
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
