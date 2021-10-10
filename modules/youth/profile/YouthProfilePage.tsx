import React, {useCallback, useState} from 'react';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {createStyles, makeStyles} from '@mui/styles';
import {Box, Container, Grid} from '@mui/material';
import PersonalInfoSection from './PersonalInfoSection';
import JobExperienceSection from './JobExperienceSection';
import EducationSection from './EducationSection';
import CertificationSection from './CertificationSection';
import LanguageSection from './LanguageSection';
import ReferenceAddEditPage from './ReferenceAddEditPage';
import ReferenceSection from './ReferenceSection';
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

  const [referenceId, setReferenceId] = useState<number | null>(null);

  const [isOpenReferenceAddEditForm, setIsOpenReferenceAddEditForm] =
    useState<boolean>(false);

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

  return (
    <>
      <Container className={classes.container}>
        <Grid container xl={12} spacing={2}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12}>
                <PersonalInfoSection />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <JobExperienceSection />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <EducationSection />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <CertificationSection />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <LanguageSection />
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
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
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <PortfolioSection />
              </Grid>
            </Grid>
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
      </Container>
    </>
  );
};

export default YouthProfile;
