import React, {Fragment} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Image from 'next/image';
import profileImage from '../../public/images/userPageImages/profileImage.jpeg';
import {AccessTime, BusinessCenter} from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: '#eee',
    },
    aboutYouth: {
      [theme.breakpoints.between('xs', 'sm')]: {
        justifyContent: 'center',
      },
    },
    profileImage: {
      border: '1px solid #eee',
      borderRadius: '50%',
      width: '100px',
      height: '100px',
    },
    editButton: {
      flexDirection: 'row',
    },
    horizontalLine: {
      height: '2px',
      width: '120%',
      marginLeft: '-20px',
      marginTop: '17px',
      marginBottom: '6px',
    },
    vBar: {
      height: '30px',
      width: '2px',
      background: '#ddd',
    },
    youthJobExperiences: {
      // display: 'flex',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      marginTop: '10px',
      // width: '100%',
    },
    CustomParabolaButton: {
      backgroundColor: 'green',
      border: '1px solid green',
      borderRadius: '40px',
      color: '#fff',
    },
    youthJobExperienceCard: {
      width: '100%',
    },
    youthJobExperienceCompanyInfo: {
      display: 'flex',
      flexDirection: 'row',
    },
    jobDurationDate: {
      display: 'flex',
      flexDirection: 'row',
      color: 'green',
    },
    jobAccessTime: {
      marginTop: '2px',
      marginLeft: '5px',
    },
    companyIcon: {
      height: '100px',
      width: '100px',
    },
  }),
);

type CustomParabolaButtonProps = {
  icon?: any;
  title: string;
  color?: string;
  buttonVariant?: 'text' | 'contained' | 'outlined';
};
const CustomParabolaButton = ({
  buttonVariant,
  icon,
  title,
}: CustomParabolaButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      variant={buttonVariant ? buttonVariant : 'contained'}
      startIcon={icon}
      className={classes.CustomParabolaButton}>
      {title}
    </Button>
  );
};
const bull = (
  <Box component='span' sx={{display: 'inline-block', mx: '4px'}}>
    •
  </Box>
);
type SkillInfoProps = {
  icon?: any;
  text1?: string;
  text2?: string;
  vBar?: boolean;
};
const SkillInfo = ({icon, text1, text2, vBar}: SkillInfoProps) => {
  const classes = useStyles();

  return (
    <Grid item container md={4}>
      <Grid item md={2}>
        {icon}
      </Grid>
      <Grid item md={6}>
        <Typography variant={'subtitle2'}>{text1}</Typography>
        <Typography>{text2}</Typography>
      </Grid>
      {vBar && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Box className={classes.vBar} />
        </Box>
      )}
    </Grid>
  );
};

const YouthProfile = () => {
  const classes = useStyles();

  return (
    <Fragment>
      <Grid container xl={12} spacing={2} className={classes.root}>
        <Grid item container sm={12} md={10}>
          <Card>
            <CardContent>
              <Grid item container spacing={2} className={classes.aboutYouth}>
                <Grid item sm={2}>
                  <Image
                    src={profileImage}
                    className={classes.profileImage}
                    alt='Picture of the author'
                    height={100}
                    width={100}
                  />
                </Grid>
                <Grid item sm={6}>
                  <Typography variant={'subtitle2'}>
                    Md. Sakibul Islam
                  </Typography>
                  <Typography variant={'overline'}>
                    Software Engineer
                  </Typography>
                  <Typography variant={'body1'}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                    ad amet, autem explicabo natus reiciendis rem sunt. Aut
                    beatae doloremque, est hic ipsa iste, libero officiis quis
                    rem reprehenderit tempora!
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  sm={4}
                  justifyContent={'flex-end'}
                  className={classes.editButton}>
                  <Grid item>
                    <CustomParabolaButton
                      title={'Edit Profile'}
                      icon={<BusinessCenter />}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Divider
                variant={'fullWidth'}
                light={true}
                className={classes.horizontalLine}
              />

              <Grid item container md={10}>
                <SkillInfo
                  icon={<BusinessCenter htmlColor={'green'} />}
                  text1={'Complete'}
                  text2={'Profile'}
                  vBar={true}
                />
                <SkillInfo
                  icon={<BusinessCenter htmlColor={'green'} />}
                  text1={'5+ year jobs'}
                  text2={'Experience'}
                  vBar={true}
                />
                <SkillInfo
                  icon={<BusinessCenter htmlColor={'green'} />}
                  text1={'5 Certificates'}
                  text2={'Achieved'}
                />
              </Grid>
            </CardContent>
          </Card>

          <Grid container xl={12} className={classes.youthJobExperiences}>
            <Card className={classes.youthJobExperienceCard}>
              <CardContent>
                <Grid item container sm={12} justifyContent={'space-between'}>
                  <Grid item sm={6}>
                    <Typography variant={'h6'}>
                      <Box component={'span'} fontWeight='fontWeightBold'>
                        Job Experience
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item container sm={6} justifyContent={'flex-end'}>
                    <CustomParabolaButton
                      buttonVariant={'outlined'}
                      title={'Add New Experience'}
                      icon={<BusinessCenter />}
                    />
                  </Grid>
                </Grid>
                <Divider
                  variant={'fullWidth'}
                  light={true}
                  className={classes.horizontalLine}
                />
                {/*//job experience*/}
                <Grid item container>
                  <Grid
                    item
                    container
                    className={classes.youthJobExperienceCompanyInfo}>
                    <Grid item>
                      <BusinessCenter />
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant={'subtitle2'}>SoftBd Ltd</Typography>
                      <Typography variant={'caption'}>
                        Ui/Ux designer
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container>
                  <Box className={classes.jobDurationDate} mb={2}>
                    <AccessTime />
                    <Typography className={classes.jobAccessTime}>
                      May 2016 - Present
                    </Typography>
                    <Box ml={2} className={classes.vBar} />
                    <Box className={classes.jobDurationDate}>
                      <LocationOnIcon />
                      <Typography>Sylhet, Bangladesh</Typography>
                    </Box>
                  </Box>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
                    accusamus blanditiis qui! Accusamus consequatur consequuntur
                    dolor earum enim, esse itaque natus non repellendus
                    similique. Et fugit quam quibusdam. Beatae, facilis.
                  </Typography>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid item md={2} sm={12}>
          <Card>
            <CardContent>
              <li>One {bull}</li>
              <li>One {bull}</li>
              <li>One {bull}</li>
              <li>One {bull}</li>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default YouthProfile;
