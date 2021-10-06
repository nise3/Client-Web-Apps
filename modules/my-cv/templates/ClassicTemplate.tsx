import React, {FC} from 'react';
import useStyles from '../index.style';
import {
  Box,
  CardMedia,
  Container,
  Divider,
  Slide,
  Typography,
} from '@mui/material';

interface ClassicTemplateProps {
  userData: any;
}

const ClassicTemplate: FC<ClassicTemplateProps> = ({userData}) => {
  const classes: any = useStyles();

  const getEducationItem = (caption: string, text: string, isBold: boolean) => {
    return (
      <Box className={classes.classicEducationItem} mt={isBold ? 2 : 0}>
        <Typography variant={'caption'} className='caption'>
          {caption}
        </Typography>
        :
        <Typography
          variant={'caption'}
          fontWeight={isBold ? 'bold' : 'normal'}
          className='text'>
          {text}
        </Typography>
      </Box>
    );
  };

  return (
    <Slide direction={'right'} in={true}>
      <Container className={classes.classicRoot}>
        <Typography
          className={classes.classicBoldUnderline}
          variant={'h5'}
          align={'center'}>
          Curriculum Vitae
        </Typography>
        <Box className={classes.classicPersonalInfoBox}>
          <CardMedia
            component={'img'}
            image={userData.image}
            className={classes.classicUserImage}
          />
          <Box className={classes.classicPersonalInfo}>
            <Typography
              className={classes.classicBoldUnderline}
              variant={'subtitle2'}>
              {userData.name}
            </Typography>
            <Typography className={classes.classicBoldUnderline}>
              Contact & Address:{' '}
            </Typography>
            <Typography>Cell no: {userData.cellNo}</Typography>
            <Typography>E-mail: {userData.email}</Typography>
            <Typography>Address: {userData.address}</Typography>
          </Box>
        </Box>
        <Divider orientation={'horizontal'} className={classes.divider} />
        <Typography variant={'subtitle2'} fontWeight={'bold'} mt={6}>
          Objective
        </Typography>
        <Divider orientation={'horizontal'} className={classes.divider} />
        <Typography mt={2} sx={{whiteSpace: 'break-spaces'}}>
          {userData.objective}
        </Typography>
        <Typography variant={'subtitle2'} fontWeight={'bold'} mt={6}>
          Job Experience
        </Typography>
        <Divider orientation={'horizontal'} className={classes.divider} />

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

        <Typography variant={'subtitle2'} fontWeight={'bold'} mt={6}>
          Education
        </Typography>
        <Divider orientation={'horizontal'} className={classes.divider} />

        {(userData.educations || []).map((education: any, index: number) => {
          return (
            <React.Fragment key={index}>
              {education.exam && getEducationItem('Exam', education.exam, true)}
              {education.board &&
                getEducationItem('Board', education.board, false)}
              {education.session &&
                getEducationItem('Session', education.session, false)}
              {education.institute &&
                getEducationItem('Institute', education.institute, false)}
              {education.result &&
                getEducationItem('Result', education.result, false)}
              {education.status &&
                getEducationItem('Status', education.status, false)}
            </React.Fragment>
          );
        })}

        <Typography variant={'subtitle2'} fontWeight={'bold'} mt={6}>
          Computer Skill
        </Typography>
        <Divider orientation={'horizontal'} className={classes.divider} />

        <Box mt={2}>
          {(userData.skills || []).map((skill: any, index: number) => {
            return (
              <Box key={index} sx={{display: 'flex'}}>
                #&nbsp;&nbsp;
                <Typography>{skill}</Typography>
              </Box>
            );
          })}
        </Box>

        <Typography variant={'subtitle2'} fontWeight={'bold'} mt={6}>
          Language Proficiency
        </Typography>
        <Divider orientation={'horizontal'} className={classes.divider} />
        <Typography mt={2}>{userData.language}</Typography>
      </Container>
    </Slide>
  );
};

export default ClassicTemplate;
