import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import CustomParabolaButton from '../component/CustomParabolaButton';
import {BusinessCenter} from '@mui/icons-material';
import HorizontalLine from '../component/HorizontalLine';
import SkillInfo from '../SkillInfo';
import CircularProgressWithLabel from '../component/CircularProgressWithLabel';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import {createStyles, makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import PersonalInformationEdit from './PersonalInformationEdit';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {YouthAuthUser} from '../../../../types/models/CommonAuthUser';
import {useDispatch} from 'react-redux';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {isResponseSuccess} from '../../../../@softbd/utilities/helpers';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {UPDATE_AUTH_USER} from '../../../../types/actions/Auth.actions';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    aboutYouth: {
      [theme.breakpoints.between('xs', 'sm')]: {
        justifyContent: 'center',
      },
    },
    editButton: {
      textAlign: 'right',
      [theme.breakpoints.only('xs')]: {
        textAlign: 'center',
      },
    },

    dividerStyle: {
      margin: '10px 30px',
      borderWidth: 1,
      [theme.breakpoints.only('xs')]: {
        height: 25,
        marginLeft: 10,
        width: 1,
      },
    },
    skillInfoGrid: {
      [theme.breakpoints.only('xs')]: {
        flexDirection: 'column',
      },
    },
  }),
);

const PersonalInfoSection = () => {
  const {messages} = useIntl();
  const classes = useStyles();
  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();
  console.log('profile ', authUser);

  const [
    isOpenPersonalInformationEditForm,
    setIsOpenPersonalInformationEditForm,
  ] = useState<boolean>(false);

  const openPersonalInformationEditForm = useCallback(() => {
    setIsOpenPersonalInformationEditForm(true);
  }, []);

  const closePersonalInformationEditForm = useCallback(() => {
    setIsOpenPersonalInformationEditForm(false);
    updateProfile();
  }, []);

  const updateProfile = () => {
    (async () => {
      const response = await getYouthProfile();
      if (isResponseSuccess(response) && response.data) {
        dispatch({
          type: UPDATE_AUTH_USER,
          payload: getYouthAuthUserObject({...authUser, ...response.data}),
        });
      }
    })();
  };

  return isOpenPersonalInformationEditForm ? (
    <PersonalInformationEdit onClose={closePersonalInformationEditForm} />
  ) : (
    <Card>
      <CardContent>
        <Grid item container spacing={2} className={classes.aboutYouth}>
          <Grid item xs={12} sm={2}>
            <Avatar
              alt='youth profile pic'
              src={'/images/userPageImages/profileImage.jpeg'}
              sx={{height: 100, width: 100, margin: 'auto'}}
            />
          </Grid>
          <Grid item xs={12} sm={10} md={10}>
            <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
              <Box>
                <Typography variant={'h6'}>
                  {authUser?.first_name} {authUser?.last_name}
                </Typography>
                <Typography variant={'subtitle2'}>
                  {messages['common.email']}: {authUser?.email}
                </Typography>
                <Typography variant={'subtitle2'}>
                  {messages['common.mobile']}: {authUser?.mobile}
                </Typography>
              </Box>
              <Box>
                <CustomParabolaButton
                  title={messages['youth_profile.edit_profile'] as string}
                  icon={<BusinessCenter />}
                  onClick={openPersonalInformationEditForm}
                />
              </Box>
            </Box>
            <Typography variant={'body1'} mt={1}>
              {authUser?.bio}
            </Typography>
          </Grid>
        </Grid>

        <HorizontalLine />

        <Grid item xs={12} md={10}>
          <Grid container className={classes.skillInfoGrid}>
            <Grid item>
              <SkillInfo
                icon={<CircularProgressWithLabel value={40} size={30} />}
                text1={messages['common.complete'] as string}
                text2={messages['common.profile'] as string}
              />
            </Grid>

            <Divider
              orientation='vertical'
              flexItem
              className={classes.dividerStyle}
            />

            <Grid item>
              <SkillInfo
                icon={<BusinessCenter />}
                text1={
                  5 + ' ' + (messages['common.year_of_experience'] as string)
                }
                text2={messages['common.experience'] as string}
              />
            </Grid>

            <Divider
              orientation='vertical'
              flexItem
              className={classes.dividerStyle}
            />

            <Grid item>
              <SkillInfo
                icon={<BusinessCenter />}
                text1={5 + ' ' + (messages['common.certificate'] as string)}
                text2={messages['common.achieved'] as string}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;
