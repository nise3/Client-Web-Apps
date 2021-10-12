import {
  Avatar,
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
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {useFetchYouthProfile} from '../../../../services/youthManagement/hooks';
import PersonalInformationEdit from './PersonalInformationEdit';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    aboutYouth: {
      [theme.breakpoints.between('xs', 'sm')]: {
        justifyContent: 'center',
      },
    },
    editButton: {
      flexDirection: 'row',
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
  const {data: youthInfo, mutate: mutateProfile} = useFetchYouthProfile();
  console.log('profile ', youthInfo);

  const [
    isOpenPersonalInformationEditForm,
    setIsOpenPersonalInformationEditForm,
  ] = useState<boolean>(false);

  const openPersonalInformationEditForm = useCallback(() => {
    setIsOpenPersonalInformationEditForm(true);
  }, []);

  const closePersonalInformationEditForm = useCallback(() => {
    setIsOpenPersonalInformationEditForm(false);
    mutateProfile();
  }, []);

  return isOpenPersonalInformationEditForm ? (
    <PersonalInformationEdit onClose={closePersonalInformationEditForm} />
  ) : (
    <Card>
      <CardContent>
        <Grid item container spacing={2} className={classes.aboutYouth}>
          <Grid item sm={2}>
            <Avatar
              alt='youth profile pic'
              src={'/images/userPageImages/profileImage.jpeg'}
              sx={{height: 100, width: 100}}
            />
          </Grid>
          <Grid item sm={6}>
            <Typography variant={'subtitle2'}>
              {youthInfo?.first_name} {youthInfo?.last_name}
            </Typography>
            {/*<Typography variant={'overline'}>Software Engineer</Typography>*/}
            <Typography variant={'body1'}>{youthInfo?.bio}</Typography>
          </Grid>
          <Grid
            item
            container
            sm={4}
            justifyContent={'flex-end'}
            className={classes.editButton}>
            <Grid item>
              <CustomParabolaButton
                title={messages['youth_profile.edit_profile'] as string}
                icon={<BusinessCenter />}
                onClick={openPersonalInformationEditForm}
              />
            </Grid>
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
