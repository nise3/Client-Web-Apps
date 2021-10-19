import React from 'react';
import {CremaTheme} from '../../../redux/types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';
import {Container, Grid} from '@mui/material';
import PersonalInfoSection from './personalInfo/PersonalInfoSection';
import JobExperienceSection from './jobExperiences/JobExperienceSection';
import EducationSection from './educations/EducationSection';
import CertificationSection from './certifications/CertificationSection';
import LanguageSection from './languages/LanguageSection';
import GuardianSection from './guardians/GuardianSection';
import ReferenceSection from './references/ReferenceSection';
import PortfolioSection from './portfolios/PortfolioSection';
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

  return (
    <>
      <Container className={classes.container}>
        <Grid container xl={12} spacing={3}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <PersonalInfoSection />
              </Grid>
              <Grid item xs={12} md={12}>
                <JobExperienceSection />
              </Grid>
              <Grid item xs={12} md={12}>
                <EducationSection />
              </Grid>
              <Grid item xs={12} md={12}>
                <CertificationSection />
              </Grid>
              <Grid item xs={12} md={12}>
                <LanguageSection />
              </Grid>
              <Grid item xs={12} md={12}>
                <ReferenceSection />
              </Grid>
              <Grid item xs={12} md={12}>
                <PortfolioSection />
              </Grid>
              <Grid item xs={12} md={12}>
                <GuardianSection />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={3} xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <ProfileCompleteSignatureMenu />
              </Grid>
              <Grid item xs={12} md={12}>
                <FreelanceProfileSection />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <MyCVSection />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default YouthProfile;
