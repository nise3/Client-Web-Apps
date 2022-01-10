import {Avatar, Button, Divider, Grid, Typography} from '@mui/material';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {H4, H6} from '../../../@softbd/elements/common';
import {Call, Email} from '@mui/icons-material';
import {styled} from '@mui/material/styles';
import {RiEditBoxFill} from 'react-icons/ri';
import AssociationProfileEditPopup from './AssociationProfileEditPopup';

const PREFIX = 'AssociationProfile';

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

const AssociationProfile = () => {
  const {messages} = useIntl();

  const [closeEditModal, setCloseEditModal] = useState<boolean>(true);

  const onClickCloseEditModal = useCallback(() => {
    setCloseEditModal((previousToggle) => !previousToggle);
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
                src={'https://www.bgmea.com.bd/img/logo.png?v=5'}
              />
              <H6 fontWeight={'bold'} mt={1}>
                {'BGMEA'}
              </H6>
              <Typography variant={'subtitle2'}>
                {'Trade Association'}
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
                {'bgmea@gmail.com'}
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
                {'01849862976'}
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
          <Grid container className={classes.form}>
            <Grid item xs={12}>
              <H4>{messages['association_information']}</H4>
            </Grid>
            <Grid item xs={6} sx={{padding: '0 20px 20px 0'}}>
              <DetailsInputView
                label={messages['association.association_name']}
                value={'BGMEA'}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['association.association_type']}
                value={'Association Type'}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6} sx={{padding: '0 20px 20px 0'}}>
              <DetailsInputView
                label={messages['association.trade_no']}
                value={'2635'}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['districts.label']}
                value={'Dhaka'}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6} sx={{padding: '0 20px 20px 0'}}>
              <DetailsInputView
                label={messages['association.head_of_office_or_chairman']}
                value={'Mr Atiqur Rahman'}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6}>
              <DetailsInputView
                label={messages['common.designation']}
                value={'Designation'}
                isLoading={false}
              />
            </Grid>
            <Grid item xs={6} sx={{padding: '0 20px 20px 0'}}>
              <DetailsInputView
                label={messages['association.association_address']}
                value={'Mirpur -10'}
                isLoading={false}
              />
            </Grid>
          </Grid>
        </Grid>
      </StyledGrid>
      {!closeEditModal && (
        <AssociationProfileEditPopup onClose={onClickCloseEditModal} />
      )}
    </>
  );
};

export default AssociationProfile;
