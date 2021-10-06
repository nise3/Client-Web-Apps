import React, {useCallback, useState} from 'react';
import Image from 'next/image';
import {CremaTheme} from '../../types/AppContextPropsType';
import youthCV from '../../public/images/youth/youth-cv.jpg';
import Footer from '../home/Footer';
import {useIntl} from 'react-intl';
import HorizontalLine from './component/HorizontalLine';
import {Add, CheckCircle} from '@mui/icons-material';
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
import PersonalInfoSection from './PersonalInfoSection';
import PersonalInformationEdit from './PersonalInformationEdit';
import JobExperienceSection from './JobExperienceSection';
import JobExperienceAddEditPage from './JobExperienceAddEditPage';
import EducationSection from './EducationSection';
import EducationAddEditPage from './EducationAddEditPage';
import CertificateAddEditPage from './CertificateAddEditPage';
import CertificationSection from './CertificationSection';
import LanguageAddEditPage from './LanguageAddEditPage';
import LanguageSection from './LanguageSection';
import ReferenceAddEditPage from './ReferenceAddEditPage';
import ReferenceSection from './ReferenceSection';
import PortfolioAddEdit from './PortfolioAddEdit';
import PortfolioSection from './PortfolioSection';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    container: {
      margin: '20px auto',
    },
  }),
);

const YouthProfile = () => {
  const classes = useStyles();
  const {messages} = useIntl();

  const [jobExperienceId, setJobExperienceId] = useState<number | null>(null);
  const [educationItemId, setEducationItemId] = useState<number | null>(null);
  const [certificateItemId, setCertificateItemId] = useState<number | null>(
    null,
  );
  const [languageId, setLanguageId] = useState<number | null>(null);
  const [referenceId, setReferenceId] = useState<number | null>(null);
  const [portfolioId, setPortfolioId] = useState<number | null>(null);
  const [
    isOpenPersonalInformationEditForm,
    setIsOpenPersonalInformationEditForm,
  ] = useState<boolean>(false);

  const [isOpenJobExperienceAddEditForm, setIsOpenJobExperienceAddEditForm] =
    useState<boolean>(false);

  const [isOpenEducationAddEditForm, setIsOpenEducationAddEditForm] =
    useState<boolean>(false);

  const [isOpenCertificateAddEditForm, setIsOpenCertificateAddEditForm] =
    useState<boolean>(false);

  const [isOpenLanguageAddEditForm, setIsOpenLanguageAddEditForm] =
    useState<boolean>(false);

  const [isOpenReferenceAddEditForm, setIsOpenReferenceAddEditForm] =
    useState<boolean>(false);

  const [isOpenPortfolioAddEditForm, setIsOpenPortfolioAddEditForm] =
    useState<boolean>(false);

  const openPersonalInformationEditForm = useCallback(() => {
    setIsOpenPersonalInformationEditForm(true);
  }, []);

  const closePersonalInformationEditForm = useCallback(() => {
    setIsOpenPersonalInformationEditForm(false);
  }, []);

  const openJobExperienceAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setJobExperienceId(itemId);
      setIsOpenJobExperienceAddEditForm(true);
    },
    [],
  );

  const closeJobExperienceAddEditForm = useCallback(() => {
    setIsOpenJobExperienceAddEditForm(false);
  }, []);

  const openEducationAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setEducationItemId(itemId);
      setIsOpenEducationAddEditForm(true);
    },
    [],
  );

  const closeEducationAddEditForm = useCallback(() => {
    setEducationItemId(null);
    setIsOpenEducationAddEditForm(false);
  }, []);

  const openCertificateAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setCertificateItemId(itemId);
      setIsOpenCertificateAddEditForm(true);
    },
    [],
  );
  const closeCertificateAddEditForm = useCallback(() => {
    setCertificateItemId(null);
    setIsOpenCertificateAddEditForm(false);
  }, []);

  const openLanguageAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setLanguageId(itemId);
      setIsOpenLanguageAddEditForm(true);
    },
    [],
  );
  const closeLanguageAddEditForm = useCallback(() => {
    setLanguageId(null);
    setIsOpenLanguageAddEditForm(false);
  }, []);

  const openReferenceAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setReferenceId(itemId);
      setIsOpenReferenceAddEditForm(true);
    },
    [],
  );
  const closeReferenceAddEditForm = useCallback(() => {
    setReferenceId(null);
    setIsOpenReferenceAddEditForm(false);
  }, []);

  const openPortfolioAddEditForm = useCallback(
    (itemId: number | null = null) => {
      setPortfolioId(itemId);
      setIsOpenPortfolioAddEditForm(true);
    },
    [],
  );
  const closePortfolioAddEditForm = useCallback(() => {
    setPortfolioId(null);
    setIsOpenPortfolioAddEditForm(false);
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Grid container xl={12} spacing={2}>
          <Grid item sm={12} md={9}>
            {isOpenPersonalInformationEditForm ? (
              <PersonalInformationEdit
                onClose={closePersonalInformationEditForm}
              />
            ) : (
              <PersonalInfoSection onclick={openPersonalInformationEditForm} />
            )}

            {isOpenJobExperienceAddEditForm ? (
              <JobExperienceAddEditPage
                itemId={jobExperienceId}
                onClose={closeJobExperienceAddEditForm}
              />
            ) : (
              <JobExperienceSection onclick={openJobExperienceAddEditForm} />
            )}

            {isOpenEducationAddEditForm ? (
              <EducationAddEditPage
                itemId={educationItemId}
                onClose={closeEducationAddEditForm}
              />
            ) : (
              <EducationSection onclick={openEducationAddEditForm} />
            )}

            {isOpenCertificateAddEditForm ? (
              <CertificateAddEditPage
                itemId={certificateItemId}
                onClose={closeCertificateAddEditForm}
              />
            ) : (
              <CertificationSection onclick={openCertificateAddEditForm} />
            )}

            {isOpenLanguageAddEditForm ? (
              <LanguageAddEditPage
                itemId={languageId}
                onClose={closeLanguageAddEditForm}
                openLanguageEditForm={openLanguageAddEditForm}
              />
            ) : (
              <LanguageSection onclick={openLanguageAddEditForm} />
            )}

            {isOpenReferenceAddEditForm ? (
              <ReferenceAddEditPage
                itemId={referenceId}
                onClose={closeReferenceAddEditForm}
              />
            ) : (
              <ReferenceSection
                openReferenceAddEditForm={openReferenceAddEditForm}
              />
            )}
            {isOpenPortfolioAddEditForm ? (
              <PortfolioAddEdit
                itemId={portfolioId}
                onClose={closePortfolioAddEditForm}
              />
            ) : (
              <PortfolioSection
                openPortfolioAddEditForm={openPortfolioAddEditForm}
              />
            )}
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
