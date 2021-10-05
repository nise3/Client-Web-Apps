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
import CustomContentCard from './CustomContentCard';
import EducationAddEditPopup from './EducationAddEditPopup';
import CertificateAddEditPage from './CertificateAddEditPage';
import LanguageAddEditPopup from './LanguageAddEditPopup';
import LanguageProficiencyViewPopup from './LanguageProficiencyViewPopup';
import referencePeopleAvatar from '../../public/images/youth/avatar.png';
import Reference from './Reference';
import ReferenceAddEditPopup from './ReferenceAddEditPopup';

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
    name: 'Istiak',
    position: 'Ui/UX designer',
    image: referencePeopleAvatar,
    email: 'istiak@gmail.com',
    phone: '037583838',
    location: 'mirpur 292010',
  },
  {
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

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenJobExperienceAddEditModal, setIsOpenJobExperienceAddEditModal] =
    useState(false);
  const [isOpenEducationAddEditModal, setIsOpenEducationAddEditModal] =
    useState(false);
  const [isOpenCertificateAddEditModal, setIsOpenCertificateAddEditModal] =
    useState(false);
  const [isOpenLanguageAddEditModal, setIsOpenLanguageAddEditModal] =
    useState(false);
  const [
    isOpenLanguageProficiencyViewModal,
    setIsOpenLanguageProficiencyViewModal,
  ] = useState(false);
  const [isOpenPortfolioAddEditModal, setIsOpenPortfolioAddEditModal] =
    useState(false);

  const [isOpenPersonalInfoAddEditModal, setIsOpenPersonalInfoAddEditModal] =
    useState(false);
  const [isOpenReferenceAddEditModal, setIsOpenReferenceAddEditModal] =
    useState(false);
  const [jobExperiences, setJobExperiences] = useState<
    Array<JobExperienceProp> | []
  >([]);

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

  const closeJobExperienceAddEditModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenJobExperienceAddEditModal(false);
  }, []);

  const openJobExperienceAddEditModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenJobExperienceAddEditModal(true);
    },
    [],
  );

  const closePersonalInfoAddEditModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenPersonalInfoAddEditModal(false);
  }, []);

  const openPersonalInfoAddEditModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenPersonalInfoAddEditModal(true);
    },
    [],
  );

  const closeEducationAddEditModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenEducationAddEditModal(false);
  }, []);

  const openEducationAddEditModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenEducationAddEditModal(true);
    },
    [],
  );

  const closeCertificationAddEditModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenCertificateAddEditModal(false);
  }, []);

  const openCertificationAddEditModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenCertificateAddEditModal(true);
    },
    [],
  );

  const closeLanguageAddEditModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenLanguageAddEditModal(false);
  }, []);

  const openLanguageAddEditModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenLanguageAddEditModal(true);
    },
    [],
  );

  const closeLanguageProficiencyViewModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenLanguageProficiencyViewModal(false);
  }, []);

  const openLanguageProficiencyViewModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenLanguageProficiencyViewModal(true);
    },
    [],
  );

  const closePortfolioAddEditModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenPortfolioAddEditModal(false);
  }, []);

  const openPortfolioAddEditModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenPortfolioAddEditModal(true);
    },
    [],
  );

  const closeReferenceAddEditModal = useCallback(() => {
    setSelectedItemId(null);
    setIsOpenReferenceAddEditModal(false);
  }, []);

  const openReferenceAddEditModal = useCallback(
    (itemId: number | null = null) => {
      setSelectedItemId(itemId);
      setIsOpenReferenceAddEditModal(true);
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
                        onclick={openPersonalInfoAddEditModal}
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
                        onclick={() => openJobExperienceAddEditModal(null)}
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
                            openJobExperienceAddEditModal(jobExperience.id)
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
                        onclick: () => openEducationAddEditModal(null),
                      },
                    ]}
                  />
                  <CustomContentCard
                    contentTitle={'Mobile Ux Design course'}
                    contentLogo={<BusinessCenter />}
                    contentServiceProvider={'Interaction Design Foundation'}
                    date={'Oct 2020'}
                    location={'Dhaka 1215'}
                    contentEditButton={() => openEducationAddEditModal(1)}
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
                        onclick: () => openCertificationAddEditModal(null),
                      },
                    ]}
                  />
                  <CustomContentCard
                    contentTitle={'Mobile Ux Design course'}
                    contentLogo={<BusinessCenter />}
                    contentServiceProvider={'Interaction Design Foundation'}
                    date={'Oct 2020'}
                    location={'Dhaka 1215'}
                    contentEditButton={() => openCertificationAddEditModal(1)}
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
                        onclick: () => openLanguageAddEditModal(null),
                      },
                      {
                        label: messages['common.edit_btn'] as string,
                        icon: <Add />,
                        onclick: () => openLanguageAddEditModal(1),
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
                        onClick={() =>
                          openLanguageProficiencyViewModal(selectedItemId)
                        }>
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
                        onclick: () => openReferenceAddEditModal(null),
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
                        onclick: () => openPortfolioAddEditModal(null),
                      },
                      {
                        label: messages['common.edit_btn'] as string,
                        icon: <BorderColor />,
                        onclick: () => openPortfolioAddEditModal(1),
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
      {isOpenJobExperienceAddEditModal && (
        <JobExperienceAddEditPopup
          key={1}
          onClose={closeJobExperienceAddEditModal}
          itemId={selectedItemId}
        />
      )}

      {isOpenEducationAddEditModal && (
        <EducationAddEditPopup
          key={1}
          onClose={closeEducationAddEditModal}
          itemId={selectedItemId}
        />
      )}

      {isOpenCertificateAddEditModal && (
        <CertificateAddEditPage
          key={1}
          onClose={closeCertificationAddEditModal}
          itemId={selectedItemId}
        />
      )}

      {isOpenLanguageAddEditModal && (
        <LanguageAddEditPopup
          key={1}
          onClose={closeLanguageAddEditModal}
          itemId={selectedItemId}
        />
      )}

      {isOpenReferenceAddEditModal && (
        <ReferenceAddEditPopup
          key={1}
          onClose={closeReferenceAddEditModal}
          itemId={selectedItemId}
        />
      )}

      {isOpenLanguageProficiencyViewModal && (
        <LanguageProficiencyViewPopup
          key={1}
          onClose={closeLanguageProficiencyViewModal}
          itemId={selectedItemId}
        />
      )}

      {isOpenPersonalInfoAddEditModal && (
        <JobExperienceAddEditPopup
          key={1}
          onClose={closePersonalInfoAddEditModal}
          itemId={selectedItemId}
        />
      )}

      {isOpenPortfolioAddEditModal && (
        <JobExperienceAddEditPopup
          key={1}
          onClose={closePortfolioAddEditModal}
          itemId={selectedItemId}
        />
      )}
    </>
  );
};

export default YouthProfile;
