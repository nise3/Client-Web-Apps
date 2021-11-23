import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import {styled} from '@mui/material/styles';
import CustomParabolaButton from '../component/CustomParabolaButton';
import {BorderColor, EmojiEventsOutlined, Schedule} from '@mui/icons-material';
import HorizontalLine from '../component/HorizontalLine';
import SkillInfo from '../SkillInfo';
import CircularProgressWithLabel from '../component/CircularProgressWithLabel';
import React, {useCallback, useState} from 'react';
import {useIntl} from 'react-intl';
import PersonalInformationEdit from './PersonalInformationEdit';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import {useDispatch} from 'react-redux';
import {getYouthProfile} from '../../../../services/youthManagement/YouthService';
import {
  getIntlNumber,
  isResponseSuccess,
} from '../../../../@softbd/utilities/helpers';
import {getYouthAuthUserObject} from '../../../../redux/actions';
import {UPDATE_AUTH_USER} from '../../../../redux/types/actions/Auth.actions';
import {YouthAuthUser} from '../../../../redux/types/models/CommonAuthUser';
import {ThemeMode} from '../../../../shared/constants/AppEnums';

const PREFIX = 'PersonalInfoSection';

const classes = {
  aboutYouth: `${PREFIX}-aboutYouth`,
  editButton: `${PREFIX}-editButton`,
  dividerStyle: `${PREFIX}-dividerStyle`,
  skillInfoGrid: `${PREFIX}-skillInfoGrid`,
  iconSizes: `${PREFIX}-iconSizes`,
  textColor: `${PREFIX}-textColor`,
  grayText: `${PREFIX}-grayText`,
};

const StyledCard = styled(Card)(({theme}) => ({
  [`& .${classes.aboutYouth}`]: {
    [theme.breakpoints.between('xs', 'sm')]: {
      justifyContent: 'center',
    },
  },

  [`& .${classes.editButton}`]: {
    textAlign: 'right',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  [`& .${classes.iconSizes}`]: {
    width: 43,
    height: 43,
  },

  [`& .${classes.dividerStyle}`]: {
    margin: '10px 30px',
    borderWidth: 1,
    [theme.breakpoints.only('xs')]: {
      height: 25,
      marginLeft: 10,
      width: 1,
    },
  },

  [`& .${classes.skillInfoGrid}`]: {
    [theme.breakpoints.only('xs')]: {
      flexDirection: 'column',
    },
  },

  [`& .${classes.textColor}`]: {
    color:
      theme.palette.mode === ThemeMode.DARK
        ? theme.palette.common.white
        : theme.palette.common.black,
  },

  [`& .${classes.grayText}`]: {
    color: theme.palette.grey[500],
  },
}));

/** component loaded in /youth => first section */
const PersonalInfoSection = () => {
  const {messages, formatNumber} = useIntl();

  const authUser = useAuthUser<YouthAuthUser>();
  const dispatch = useDispatch();
  /*  console.log('profile ', authUser);*/

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
    <StyledCard>
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
                <Typography variant={'h5'} className={classes.textColor}>
                  {authUser?.first_name} {authUser?.last_name}
                </Typography>
                <Typography variant={'subtitle2'} className={classes.grayText}>
                  {messages['common.email']}: {authUser?.email}
                </Typography>
                <Typography variant={'subtitle2'} className={classes.grayText}>
                  {messages['common.mobile']}: {authUser?.mobile}
                </Typography>
              </Box>
              <Box>
                <CustomParabolaButton
                  title={messages['youth_profile.edit_profile'] as string}
                  icon={<BorderColor />}
                  onClick={openPersonalInformationEditForm}
                />
              </Box>
            </Box>
            <Typography variant={'body1'} mt={1} className={classes.grayText}>
              {authUser?.bio}
            </Typography>
          </Grid>
        </Grid>

        <HorizontalLine />

        <Grid item xs={12} md={10}>
          {/** profile completed in percentage section */}
          <Grid container className={classes.skillInfoGrid}>
            <Grid item>
              <SkillInfo
                icon={
                  <CircularProgressWithLabel
                    value={55}
                    text={getIntlNumber(
                      formatNumber,
                      authUser?.profile_completed || '0',
                    )}
                    size={35}
                    className={classes.iconSizes}
                  />
                }
                text1={messages['common.complete'] as string}
                text2={messages['common.profile'] as string}
              />
            </Grid>

            <Divider
              orientation='vertical'
              flexItem
              className={classes.dividerStyle}
            />

            {/** year_of_experience section */}
            <Grid item>
              <SkillInfo
                icon={
                  <Schedule color={'primary'} className={classes.iconSizes} />
                }
                text1={
                  getIntlNumber(
                    formatNumber,
                    authUser?.total_job_experience?.year || '0',
                  ) +
                  ' ' +
                  (messages['common.year_of'] as string)
                }
                text2={messages['common.experience'] as string}
              />
            </Grid>
            <Divider
              orientation='vertical'
              flexItem
              className={classes.dividerStyle}
            />

            {/** total_certificates section */}
            <Grid item>
              <SkillInfo
                icon={
                  <EmojiEventsOutlined
                    color={'primary'}
                    className={classes.iconSizes}
                  />
                }
                text1={
                  getIntlNumber(
                    formatNumber,
                    authUser?.total_certificates
                      ? authUser.total_certificates
                      : '0',
                  ) +
                  ' ' +
                  (messages['common.certificate'] as string)
                }
                text2={messages['common.achieved'] as string}
              />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default PersonalInfoSection;
