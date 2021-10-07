import React, {useCallback, useState} from 'react';
import {CremaTheme} from '../../../types/AppContextPropsType';
import Footer from '../../home/Footer';
import {createStyles, makeStyles} from '@mui/styles';
import {Box, Container, Grid} from '@mui/material';
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
import ProfileCompleteSignatureMenu from './ProfileCompleteSignatureMenu';
import FreelanceProfileSection from './FreelanceProfileSection';
import MyCVSection from './MyCVSection';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    container: {
      margin: '20px auto',
    },
  }),
);

const YouthProfile = () => {
  const classes = useStyles();

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
            <ProfileCompleteSignatureMenu />

            <Box mt={4}>
              <FreelanceProfileSection />
            </Box>

            <Box mt={4}>
              <MyCVSection />
            </Box>
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </>
  );
};

export default YouthProfile;
