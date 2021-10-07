import React, {FC} from 'react';
import {Avatar, Box, Grid, Slide, Typography} from '@mui/material';
import useStyles from '../index.style';
import {Email, LocationOn, Phone} from '@mui/icons-material';

interface ModernTemplateProps {
  userData: any;
}

const ModernTemplate: FC<ModernTemplateProps> = ({userData}) => {
  const classes: any = useStyles();

  const getModernEducationItem = (text: string, isBold: boolean) => {
    return (
      <Typography
        variant={'caption'}
        fontWeight={isBold ? 'bold' : 'normal'}
        className='text'>
        {text}
      </Typography>
    );
  };

  return (
    <Slide direction={'right'} in={true}>
      <Box className={classes.modernRoot}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container className={classes.modernHeader}>
              <Grid item xs={12} sm={4} md={4}>
                <Avatar
                  src={userData.image}
                  className={classes.moderUserImage}
                />
              </Grid>
              <Grid item xs={12} sm={8} md={8}>
                <Typography variant={'h3'} className={classes.modernUserName}>
                  {userData.name}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4} className={classes.modernLeftBox}>
            <Box className={classes.modernTitleBox}>Contact</Box>
            <Phone className={classes.modernLeftIcon} />
            <Typography mt={2}>{userData.cellNo}</Typography>
            <Email className={classes.modernLeftIcon} />
            <Typography mt={2}>{userData.email}</Typography>
            <LocationOn className={classes.modernLeftIcon} />
            <Typography mt={2} align={'center'}>
              {userData.address}
            </Typography>
            <Box mt={5} className={classes.modernTitleBox}>
              Education
            </Box>

            {(userData.educations || []).map(
              (education: any, index: number) => {
                return (
                  <Box key={index} className={classes.modernEducationItem}>
                    {education.exam &&
                      getModernEducationItem(education.exam, true)}
                    {education.institute &&
                      getModernEducationItem(education.institute, false)}
                    {education.board &&
                      getModernEducationItem(education.board, false)}
                    {education.session &&
                      getModernEducationItem(education.session, false)}
                    {education.result &&
                      getModernEducationItem(education.result, false)}
                    {education.status &&
                      getModernEducationItem(education.status, false)}
                  </Box>
                );
              },
            )}

            <Box mt={5} className={classes.modernTitleBox}>
              Language Proficiency
            </Box>
            <Box className={classes.languageItem}>
              {(userData.languages || []).map(
                (language: any, index: number) => {
                  return (
                    <Typography key={index} className='item'>
                      {language}
                    </Typography>
                  );
                },
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Box className={classes.modernRightBox}>
              <Box className={classes.modernObjectiveBlock}>
                <Typography variant={'subtitle2'} className='title'>
                  Objective
                </Typography>
                {userData.objective}
              </Box>
              <Box mt={5} className={classes.modernObjectiveBlock}>
                <Typography variant={'subtitle2'} className='title'>
                  Experience
                </Typography>
                {(userData.jobExperiences || []).map(
                  (experience: any, index: number) => {
                    return (
                      <Box key={index} className={classes.classicJobItem}>
                        <Typography
                          variant={'caption'}
                          fontWeight={'bold'}
                          className='text'>
                          {experience.companyName}
                        </Typography>
                        <Typography variant={'caption'} className='text'>
                          <Typography variant={'caption'} fontWeight={'bold'}>
                            Designation:
                          </Typography>{' '}
                          {experience.designation}
                        </Typography>
                        <Typography variant={'caption'} className='text'>
                          <Typography variant={'caption'} fontWeight={'bold'}>
                            Working year:
                          </Typography>
                          {experience.joiningDate +
                            (experience.leavingDate
                              ? ' to ' + experience.leavingDate
                              : 'til now')}
                        </Typography>
                        <Typography variant={'caption'} className='text'>
                          <Typography variant={'caption'} fontWeight={'bold'}>
                            Company Phone:
                          </Typography>
                          {experience.companyPhone}
                        </Typography>
                        <Typography variant={'caption'} className='text'>
                          <Typography variant={'caption'} fontWeight={'bold'}>
                            Company Email:
                          </Typography>
                          {experience.companyEmail}
                        </Typography>
                        <Typography variant={'caption'} className='text'>
                          <Typography variant={'caption'} fontWeight={'bold'}>
                            Company Website:
                          </Typography>
                          {experience.companyWebsite}
                        </Typography>
                        <Typography variant={'caption'} className='text'>
                          <Typography variant={'caption'} fontWeight={'bold'}>
                            Description:
                          </Typography>
                          {experience.description}
                        </Typography>
                      </Box>
                    );
                  },
                )}
              </Box>

              <Box mt={5} className={classes.modernObjectiveBlock}>
                <Typography variant={'subtitle2'} className='title'>
                  Computer Skill
                </Typography>
                {(userData.skills || []).map((skill: any, index: number) => {
                  return (
                    <Box key={index} sx={{display: 'flex'}}>
                      #&nbsp;&nbsp;
                      <Typography>{skill}</Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Slide>
  );
};

export default ModernTemplate;
