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
            <Typography mt={2}>{userData.address}</Typography>
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
              Expertise
            </Box>
            <Box className={classes.expertiseItem}>
              {(userData.expertises || []).map((skill: any, index: number) => {
                return (
                  <Typography key={index} className='item'>
                    {skill}
                  </Typography>
                );
              })}
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <Box className={classes.modernRightBox}></Box>
          </Grid>
        </Grid>
      </Box>
    </Slide>
  );
};

export default ModernTemplate;
