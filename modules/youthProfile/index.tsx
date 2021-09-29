import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Switch,
  Typography,
} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Image from 'next/image';
import profileImage from '../../public/images/userPageImages/profileImage.jpeg';
import {
  AccessTime,
  BorderColor,
  BusinessCenter,
  CheckCircle,
} from '@material-ui/icons';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {CremaTheme} from '../../types/AppContextPropsType';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import AddIcon from '@material-ui/icons/Add';
import youthCV from '../../public/images/youth/youth-cv.jpg';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    container: {
      margin: '20px auto',
    },
    root: {
      // backgroundColor: '#eee',
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
    cardSpaceBetween: {
      // display: 'flex',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      marginTop: '20px',
      // width: '100%',
    },
    CustomParabolaButton: {
      border: '1px solid green',
      borderRadius: '40px',
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
    image: {
      width: '100%',
      height: '200px',
    },
    skillCard: {
      marginTop: '16px',
    },
    overallInfo: {
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
      },
    },
    skillInfoVBar: {
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
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
      className={classes.CustomParabolaButton}
      color={'primary'}>
      {title}
    </Button>
  );
};

type SkillInfoProps = {
  icon?: any;
  text1?: string;
  text2?: string;
  vBar?: boolean;
};
const SkillInfo = ({icon, text1, text2, vBar}: SkillInfoProps) => {
  const classes = useStyles();

  return (
    <Grid container xs={12} md={4} className={classes.overallInfo}>
      <Grid item xs={2}>
        {icon}
      </Grid>
      <Grid item xs={6}>
        <Typography variant={'subtitle2'}>{text1}</Typography>
        <Typography>{text2}</Typography>
      </Grid>
      {vBar && (
        <Grid item xs={12} md={1} className={classes.skillInfoVBar}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Box className={classes.vBar} />
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

type VerticalLineProps = {
  lineHeight?: string;
  lineWidth?: string;
  marginLeft?: number;
  marginRight?: number;
  color?: string;
};

const VerticalLine = ({
  lineHeight,
  lineWidth,
  marginLeft,
  marginRight,
  color,
}: VerticalLineProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
      <Box
        ml={marginLeft ? marginLeft : 0}
        mr={marginRight ? marginRight : 0}
        sx={{
          height: lineHeight,
          width: lineWidth,
          bgcolor: color ? color : '#eee',
        }}
      />
    </Box>
  );
};

type CardHeaderProps = {
  headerTitle?: string;
  buttonLabel?: string;
  buttonIcon?: any;
};

const CardHeader = ({
  headerTitle,
  buttonLabel,
  buttonIcon,
}: CardHeaderProps) => {
  return (
    <Grid item container sm={12} justifyContent={'space-between'}>
      <Grid item sm={6}>
        <Typography variant={'h6'}>
          <Box component={'span'} fontWeight='fontWeightBold'>
            {headerTitle}
          </Box>
        </Typography>
      </Grid>
      {buttonLabel && (
        <Grid item container sm={6} justifyContent={'flex-end'}>
          <CustomParabolaButton
            buttonVariant={'outlined'}
            title={buttonLabel}
            icon={buttonIcon}
          />
        </Grid>
      )}
    </Grid>
  );
};

const HorizontalLine = () => {
  const classes = useStyles();
  return (
    <Divider
      variant={'fullWidth'}
      light={true}
      className={classes.horizontalLine}
    />
  );
};

type JobExperienceProp = {
  jobTitle?: string;
  postTitle?: string;
  companyName?: string;
  companyLogo?: any;
  jobLocation?: string;
  jobPeriod?: string;
  jobDescription?: string;
};
const JobExperience = ({
  jobTitle,
  postTitle,
  companyName,
  companyLogo,
  jobLocation,
  jobPeriod,
  jobDescription,
}: JobExperienceProp) => {
  const classes = useStyles();

  return (
    <>
      <HorizontalLine />
      <Grid item container sm={12} justifyContent={'space-between'}>
        <Grid item container sm={6}>
          {companyLogo && <Grid item>{companyLogo}</Grid>}

          <Grid item sm={4}>
            <Box ml={1} mb={2}>
              <Typography variant={'subtitle2'}>{companyName}</Typography>
              <Typography variant={'caption'}>{postTitle}</Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item container sm={6} justifyContent={'flex-end'}>
          <Box>
            <CustomParabolaButton
              buttonVariant={'outlined'}
              title={'Edit'}
              icon={<BorderColor />}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item container>
        <Box className={classes.jobDurationDate} mb={4}>
          <AccessTime />
          <Typography className={classes.jobAccessTime}>{jobPeriod}</Typography>
          <VerticalLine
            lineHeight={'15px'}
            lineWidth={'2px'}
            marginLeft={2}
            marginRight={2}
          />
          {jobLocation && (
            <Box className={classes.jobDurationDate}>
              <LocationOnIcon />
              <Typography>{jobLocation}</Typography>
            </Box>
          )}
        </Box>
        <Typography>{jobDescription}</Typography>
      </Grid>
    </>
  );
};

type SkillProp = {
  skillCourseTitle: string;
  skillCourseLogo: any;
  skillCourseProvider: string;
  date: string;
  location: string;
};

const Skill = ({
  skillCourseTitle,
  skillCourseLogo,
  skillCourseProvider,
  date,
  location,
}: SkillProp) => {
  const classes = useStyles();

  return (
    <>
      <HorizontalLine />

      <Grid
        item
        container
        sm={12}
        justifyContent={'space-between'}
        className={classes.skillCard}>
        <Grid item sm={6}>
          <Grid container sm={12}>
            {skillCourseLogo && <Grid item>{skillCourseLogo}</Grid>}
            <Grid item sm={6}>
              <Box ml={1} mb={2}>
                <Typography variant={'subtitle2'}>
                  {skillCourseTitle}
                </Typography>
                <Typography variant={'caption'}>
                  {skillCourseProvider}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container sm={6} justifyContent={'flex-end'}>
          <Box>
            <CustomParabolaButton
              buttonVariant={'outlined'}
              title={'Edit'}
              icon={<BorderColor />}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid item container>
        <Box className={classes.jobDurationDate} mb={4}>
          <AccessTime />
          <Typography className={classes.jobAccessTime}>{date}</Typography>
          <VerticalLine
            lineHeight={'15px'}
            lineWidth={'2px'}
            marginLeft={2}
            marginRight={2}
          />
          {location && (
            <Box className={classes.jobDurationDate}>
              <LocationOnIcon />
              <Typography>{location}</Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
};
let items = [
  {
    img: '/images/popular-course1.png',
    price: '৫০০০',
    title: 'লিডারশিপ স্কিল',
    duration: '১ ঘন্টা ৩০ মিনিট',
    enrolls: 'Student (16.1k)',
  },

  {
    img: '/images/popular-course2.png',
    price: '৩০০০',
    title: 'প্রফেশনাল মাস্টার ক্লাস',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
  {
    img: '/images/popular-course3.png',
    price: 'বিনামূল্যে',
    title: 'কম্পিঊটার স্কিল',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
  {
    img: '/images/popular-course4.png',
    price: '২০০০',
    title: 'সেলস ট্রেনিং',
    duration: '১ ঘন্টা',
    enrolls: 'Student (16.1k)',
  },
];

const cardItem = (item: any, key: number) => {
  const classes = useStyles();

  return (
    <Box mr={6} key={key}>
      <Card>
        <Box>
          <Image
            className={classes.image}
            src={item.img}
            alt='crema-logo'
            height={50}
            width={'100%'}
            layout={'responsive'}
          />
        </Box>
      </Card>
    </Box>
  );
};

const YouthProfile = () => {
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Grid container xl={12} spacing={2} className={classes.root}>
        <Grid item container sm={12} md={9}>
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

              <HorizontalLine />

              <Grid item container xs={12} md={10}>
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

          <Grid container xl={12} className={classes.cardSpaceBetween}>
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

                <JobExperience
                  jobDescription={
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab commodi cumque error exercitationem modi nam nisi, quia sed. Animi eius excepturi nulla perspiciatis repellat? Distinctio natus neque nostrum quaerat tenetur?'
                  }
                  companyName={'softBD Ltd'}
                  companyLogo={<BusinessCenter fontSize={'large'} />}
                  jobPeriod={'2010-present'}
                  postTitle={'software engineer'}
                  jobLocation={'panthapath, dhaka'}
                />
                <JobExperience
                  jobDescription={
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab commodi cumque error exercitationem modi nam nisi, quia sed. Animi eius excepturi nulla perspiciatis repellat? Distinctio natus neque nostrum quaerat tenetur?'
                  }
                  companyName={'softBD Ltd'}
                  companyLogo={<BusinessCenter fontSize={'large'} />}
                  jobPeriod={'2010-present'}
                  postTitle={'software engineer'}
                  jobLocation={'panthapath, dhaka'}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid container xl={12} className={classes.cardSpaceBetween}>
            <Card className={classes.youthJobExperienceCard}>
              <CardContent>
                <CardHeader
                  headerTitle={'Skills'}
                  buttonLabel={'Add New Skill'}
                  buttonIcon={<AddIcon />}
                />
                <Skill
                  skillCourseTitle={'Mobile UX Design Course'}
                  skillCourseLogo={<BusinessCenter />}
                  skillCourseProvider={'Interaction Design Foundation'}
                  date={'Oct 2020'}
                  location={'Dhaka 1215'}
                />
                <Skill
                  skillCourseTitle={'Mobile UX Design Course'}
                  skillCourseLogo={<BusinessCenter />}
                  skillCourseProvider={'Interaction Design Foundation'}
                  date={'Oct 2020'}
                  location={'Dhaka 1215'}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid container xl={12} className={classes.cardSpaceBetween}>
            <Card className={classes.youthJobExperienceCard}>
              <CardContent>
                <CardHeader
                  headerTitle={'Portfolio'}
                  buttonLabel={'Edit'}
                  buttonIcon={<BorderColor />}
                />
              </CardContent>
              <HorizontalLine />
              <Box>
                <CustomCarousel>
                  {items.map((item: any, key: number) => cardItem(item, key))}
                </CustomCarousel>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={11}>
                  Phone Number
                </Grid>
                <Grid item xs={1}>
                  <CheckCircle fontSize={'inherit'} color={'primary'} />
                </Grid>
              </Grid>
              <HorizontalLine />
              <Grid container>
                <Grid item xs={11}>
                  Email Address
                </Grid>
                <Grid item xs={1}>
                  <CheckCircle fontSize={'inherit'} color={'primary'} />
                </Grid>
              </Grid>
              <HorizontalLine />
              <Grid container>
                <Grid item xs={11}>
                  NID
                </Grid>
                <Grid item xs={1}>
                  <CheckCircle fontSize={'inherit'} color={'primary'} />
                </Grid>
              </Grid>
              <HorizontalLine />
              <Grid container>
                <Grid item xs={11}>
                  BRN
                </Grid>
                <Grid item xs={1}>
                  <CheckCircle fontSize={'inherit'} color={'primary'} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Box mt={4}>
            <Card>
              <CardContent>
                <Typography variant={'h6'}>Freelance profile</Typography>
                <Typography variant={'body2'}>
                  Turning this button on will show your profile in the freelance
                  list.
                </Typography>
                <Switch color={'primary'} defaultChecked />
              </CardContent>
            </Card>
          </Box>

          <Box mt={4}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={9}>
                    <Typography variant={'h6'}>My CV</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <input
                      type='file'
                      accept='image/pdf/doc/*'
                      style={{display: 'none'}}
                      id='contained-button-file'
                    />
                    <label htmlFor='contained-button-file'>
                      <Button
                        variant='contained'
                        color='primary'
                        component='span'>
                        <AddIcon />
                      </Button>
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container xs={12}>
                      <Grid item xs={8}>
                        <Image src={youthCV} />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box mt={2} width={'100%'}>
                    <Grid item xs={12}>
                      <Grid container spacing={3} xs={12}>
                        <Grid item xs={6}>
                          <Button
                            variant={'contained'}
                            color={'primary'}
                            fullWidth={true}>
                            View
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            variant={'outlined'}
                            color={'primary'}
                            fullWidth={true}>
                            Download
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default YouthProfile;
