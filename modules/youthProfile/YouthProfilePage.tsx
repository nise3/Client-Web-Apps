import React, {useCallback, useEffect, useState} from 'react';
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
import CardItem from './component/CardItem';
import SkillInfo from './SkillInfo';
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
import CustomContentCard from './CustomContentCard';
import referencePeopleAvatar from '../../public/images/youth/avatar.png';
import Reference from './Reference';
import {useRouter} from 'next/router';

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

type JobExperienceProp = {
  id?: number;
  position?: string;
  companyName?: string;
  companyLogo?: any;
  jobLocation?: string;
  jobPeriod?: string;
  jobDescription?: string;
};

const references = [
  {
    id: 1,
    name: 'Istiak',
    position: 'Ui/UX designer',
    image: referencePeopleAvatar,
    email: 'istiak@gmail.com',
    phone: '037583838',
    location: 'mirpur 292010',
  },
  {
    id: 2,
    name: 'Md. Istiak Ahmen',
    position: 'Software Engineer',
    image: referencePeopleAvatar,
    email: 'istiak@gmail.com',
    phone: '037583838',
    location: 'Mirpur 292010',
  },
];

const YouthProfile = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const [jobExperiences, setJobExperiences] = useState<
    Array<JobExperienceProp> | []
  >([]);

  const router = useRouter();

  useEffect(() => {
    setJobExperiences([
      {
        id: 1,
        companyName: 'softBD Ltd',
        companyLogo: <BusinessCenter fontSize={'large'} />,
        jobPeriod: '2010-present',
        jobLocation: 'panthapath',
        position: 'software engineer',
        jobDescription:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab commodi cumque error exercitationem modi nam nisi, quia sed. Animi eius excepturi nulla perspiciatis repellat? Distinctio natus neque nostrum quaerat tenetur?',
      },
      {
        id: 2,
        companyName: 'Google',
        companyLogo: <BusinessCenter fontSize={'large'} />,
        jobPeriod: '2020-present',
        jobLocation: 'CA',
        position: 'software engineer',
        jobDescription:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab commodi cumque error exercitationem modi nam nisi, quia sed. Animi eius excepturi nulla perspiciatis repellat? Distinctio natus neque nostrum quaerat tenetur?',
      },
    ]);
  }, []);

  const openJobExperienceAddEditPage = useCallback(
    (itemId: number | null = null) => {
      const URL = '/../../youth-profile-edit/job-experience/__'.replace(
        '__',
        String(itemId),
      );
      router.push(URL);
    },
    [],
  );

  const openReferenceAddEditPage = useCallback(
    (itemId: number | null = null) => {
      const URL = '/../../youth-profile-edit/reference/__'.replace(
        '__',
        String(itemId),
      );
      router.push(URL);
    },
    [],
  );

  const openPortfolioAddEditPage = useCallback(
    (itemId: number | null = null) => {
      const URL = '/../../youth-profile-edit/portfolio/__'.replace(
        '__',
        String(itemId),
      );
      router.push(URL);
    },
    [],
  );

  const openCertificateAddEdit = useCallback((itemId: number | null = null) => {
    const URL = '/../../youth-profile-edit/certificate/__'.replace(
      '__',
      String(itemId),
    );
    router.push(URL);
  }, []);

  const openEducationAddEditPage = useCallback(
    (itemId: number | null = null) => {
      const URL = '/../../youth-profile-edit/education/__'.replace(
        '__',
        String(itemId),
      );
      router.push(URL);
    },
    [],
  );

  const openLanguageAddEditPage = useCallback(() => {
    const URL = '/../../youth-profile-edit/language/null';
    router.push(URL);
  }, []);

  const openLanguageProficiencyViewPage = useCallback(
    (itemId: number | null = null) => {
      const URL = '/../../youth-profile-edit/view-language-proficiency';
      router.push(URL);
    },
    [],
  );

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
                        onclick={() => openJobExperienceAddEditPage(null)}
                      />
                    </Grid>
                  </Grid>

                  {jobExperiences.map((jobExperience: JobExperienceProp) => {
                    return (
                      <React.Fragment key={jobExperience.id}>
                        <JobExperience
                          companyName={jobExperience.companyName}
                          companyLogo={jobExperience.companyLogo}
                          jobPeriod={jobExperience.jobPeriod}
                          position={jobExperience.position}
                          jobLocation={jobExperience.jobLocation}
                          jobDescription={jobExperience.jobDescription}
                          openAddEditModal={() =>
                            openJobExperienceAddEditPage(jobExperience.id)
                          }
                        />
                      </React.Fragment>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>

            <Grid container xl={12} className={classes.cardSpaceBetween}>
              <Card className={classes.youthJobExperienceCard}>
                <CardContent>
                  <CardHeader
                    headerTitle={messages['common.education'] as string}
                    buttons={[
                      {
                        label: messages['common.add_new_education'] as string,
                        icon: <Add />,
                        onclick: () => openEducationAddEditPage(null),
                      },
                    ]}
                  />
                  <CustomContentCard
                    contentTitle={'Mobile Ux Design course'}
                    contentLogo={<BusinessCenter />}
                    contentServiceProvider={'Interaction Design Foundation'}
                    date={'Oct 2020'}
                    location={'Dhaka 1215'}
                    contentEditButton={() => openEducationAddEditPage(1)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid container xl={12} className={classes.cardSpaceBetween}>
              <Card className={classes.youthJobExperienceCard}>
                <CardContent>
                  <CardHeader
                    headerTitle={messages['common.certifications'] as string}
                    buttons={[
                      {
                        label: messages['common.add_new_certificate'] as string,
                        icon: <Add />,
                        onclick: () => openCertificateAddEdit(null),
                      },
                    ]}
                  />
                  <CustomContentCard
                    contentTitle={'Mobile Ux Design course'}
                    contentLogo={<BusinessCenter />}
                    contentServiceProvider={'Interaction Design Foundation'}
                    date={'Oct 2020'}
                    location={'Dhaka 1215'}
                    contentEditButton={() => openCertificateAddEdit(1)}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid container xl={12} className={classes.cardSpaceBetween}>
              <Card className={classes.youthJobExperienceCard}>
                <CardContent>
                  <CardHeader
                    headerTitle={messages['common.language'] as string}
                    buttons={[
                      {
                        label: messages['common.add_language'] as string,
                        icon: <Add />,
                        onclick: () => openLanguageAddEditPage(),
                      },
                      {
                        label: messages['common.edit_btn'] as string,
                        icon: <Add />,
                        onclick: () => openLanguageAddEditPage(),
                      },
                    ]}
                  />
                  <CustomContentCard
                    contentTitle={'English, Bangla, Hindi'}
                    contentLogo={<BusinessCenter />}
                    contentServiceProvider={
                      <Box
                        sx={{
                          '&:hover': {
                            cursor: 'pointer',
                          },
                        }}
                        component={'span'}
                        onClick={() => openLanguageProficiencyViewPage()}>
                        View language proficiency
                      </Box>
                    }
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid container xl={12} className={classes.cardSpaceBetween}>
              <Card className={classes.youthJobExperienceCard}>
                <CardContent>
                  <CardHeader
                    headerTitle={messages['references.label'] as string}
                    buttons={[
                      {
                        label: messages[
                          'references.add_new_reference'
                        ] as string,
                        icon: <BorderColor />,
                        onclick: () => openReferenceAddEditPage(null),
                      },
                    ]}
                  />

                  {references.map((reference: any, key: number) => (
                    <Reference
                      key={key}
                      name={reference.name}
                      image={reference.image}
                      position={reference.position}
                      phone={reference.phone}
                      email={reference.email}
                      location={reference.location}
                      onclick={() => openReferenceAddEditPage(reference.id)}
                    />
                  ))}
                </CardContent>
              </Card>
            </Grid>

            <Grid container xl={12} className={classes.cardSpaceBetween}>
              <Card className={classes.youthJobExperienceCard}>
                <CardContent>
                  <CardHeader
                    headerTitle={messages['common.portfolio'] as string}
                    buttons={[
                      {
                        label: messages['common.add_new_portfolio'] as string,
                        icon: <BorderColor />,
                        onclick: () => openPortfolioAddEditPage(null),
                      },
                      {
                        label: messages['common.edit_btn'] as string,
                        icon: <BorderColor />,
                        onclick: () => openPortfolioAddEditPage(1),
                      },
                    ]}
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
    </>
  );
};

export default YouthProfile;
