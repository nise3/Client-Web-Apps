import React, {useCallback, useState} from 'react';
import Image from 'next/image';
import profileImage from '../../public/images/userPageImages/profileImage.jpeg';
import {CremaTheme} from '../../types/AppContextPropsType';
import CustomCarousel from '../../@softbd/elements/display/CustomCarousel/CustomCarousel';
import youthCV from '../../public/images/youth/youth-cv.jpg';
import Footer from '../home/Footer';
import {useIntl} from 'react-intl';
import CircularProgressWithLabel from './component/CircularProgressWithLabel';
import CustomParabolaButton from './component/CustomParabolaButton';
import HorizontalLine from './component/HorizontalLine';
import CardHeader from './CardHeader';
import JobExperience from './JobExperience';
import Skill from './Skills';
import CardItem from './component/CardItem';
import SkillInfo from './SkillInfo';
import JobExperienceAddEditPopup from './JobExperienceAddEditPopup';
import {
  Add,
  BorderColor,
  BusinessCenter,
  CheckCircle,
} from '@mui/icons-material';
import {createStyles, makeStyles} from '@mui/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Switch,
  Typography,
} from '@mui/material';

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

    cardSpaceBetween: {
      // display: 'flex',
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      marginTop: '20px',
      // width: '100%',
    },

    youthJobExperienceCard: {
      width: '100%',
    },
    youthJobExperienceCompanyInfo: {
      display: 'flex',
      flexDirection: 'row',
    },

    companyIcon: {
      height: '100px',
      width: '100px',
    },
  }),
);

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

const YouthProfile = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  return (
    <>
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
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      A ad amet, autem explicabo natus reiciendis rem sunt. Aut
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
                        title={messages['youth_profile.edit_profile'] as string}
                        icon={<BusinessCenter />}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <HorizontalLine />

                <Grid item xs={12} md={10}>
                  <Grid container>
                    <Grid item md={4} xs={12}>
                      <SkillInfo
                        icon={
                          <CircularProgressWithLabel value={40} size={30} />
                        }
                        text1={messages['common.complete'] as string}
                        text2={messages['common.profile'] as string}
                        vBar={true}
                      />
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <SkillInfo
                        icon={<BusinessCenter htmlColor={'green'} />}
                        text1={
                          5 +
                          ' ' +
                          (messages['common.year_of_experience'] as string)
                        }
                        text2={messages['common.experience'] as string}
                        vBar={true}
                      />
                    </Grid>
                    <Grid item md={4} xs={12}>
                      <SkillInfo
                        icon={<BusinessCenter htmlColor={'green'} />}
                        text1={
                          5 + ' ' + (messages['common.certificate'] as string)
                        }
                        text2={messages['common.achieved'] as string}
                        vBar={false}
                      />
                    </Grid>
                  </Grid>
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
                          {messages['common.job_experience']}
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item container sm={6} justifyContent={'flex-end'}>
                      <CustomParabolaButton
                        buttonVariant={'outlined'}
                        title={
                          messages['youth_profile.add_new_experience'] as string
                        }
                        icon={<BusinessCenter />}
                        onclick={openAddEditModal}
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
                    headerTitle={messages['common.skills'] as string}
                    buttonLabel={messages['common.add_new_skill'] as string}
                    buttonIcon={<Add />}
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
                    headerTitle={messages['common.portfolio'] as string}
                    buttonLabel={messages['common.edit_btn'] as string}
                    buttonIcon={<BorderColor />}
                  />
                </CardContent>
                <HorizontalLine />
                <Box>
                  <CustomCarousel>
                    {items.map((item: any, key: number) => CardItem(item, key))}
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
                  <Typography variant={'h6'}>
                    {messages['common.freelance_profile']}
                  </Typography>
                  <Typography variant={'body2'}>
                    {messages['youth_profile.freelance_profile_turing_on_hint']}
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
                      <Typography variant={'h6'}>
                        {messages['youth_profile.my_cv']}
                      </Typography>
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
                          <Add />
                        </Button>
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item xs={8}>
                          <Image src={youthCV} />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Box mt={2} width={'100%'}>
                      <Grid item xs={12}>
                        <Grid container spacing={3}>
                          <Grid item xs={6}>
                            <Button
                              variant={'contained'}
                              color={'primary'}
                              fullWidth={true}>
                              {messages['common.view']}
                            </Button>
                          </Grid>
                          <Grid item xs={6}>
                            <Button
                              variant={'outlined'}
                              color={'primary'}
                              fullWidth={true}>
                              {messages['common.download']}
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
        <Footer />
      </Container>
      {isOpenAddEditModal && (
        <JobExperienceAddEditPopup
          key={1}
          onClose={closeAddEditModal}
          itemId={selectedItemId}
        />
      )}
    </>
  );
};

export default YouthProfile;
