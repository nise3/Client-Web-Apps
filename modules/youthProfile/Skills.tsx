import {useIntl} from 'react-intl';
import HorizontalLine from './component/HorizontalLine';
import {Box, Grid, Typography} from '@material-ui/core';
import CustomParabolaButton from './component/CustomParabolaButton';
import {AccessTime, BorderColor} from '@material-ui/icons';
import VerticalLine from './component/VerticalLine';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../types/AppContextPropsType';

const useStyles = makeStyles((theme: CremaTheme) =>
  createStyles({
    skillIssueDate: {
      display: 'flex',
      flexDirection: 'row',
      color: 'green',
    },
    accessTime: {
      marginTop: '2px',
      marginLeft: '5px',
    },
    skillCard: {
      marginTop: '16px',
    },
  }),
);

type SkillProp = {
  skillCourseTitle: string;
  skillCourseLogo: any;
  skillCourseProvider: string;
  date: string;
  location: string;
};

const Skill = ({
  skillCourseTitle,
  skillCourseLogo,
  skillCourseProvider,
  date,
  location,
}: SkillProp) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <>
      <HorizontalLine />

      <Grid
        container
        justifyContent={'space-between'}
        className={classes.skillCard}>
        <Grid item sm={6}>
          <Grid container>
            {skillCourseLogo && <Grid item>{skillCourseLogo}</Grid>}
            <Grid item sm={6}>
              <Box ml={1} mb={2}>
                <Typography variant={'subtitle2'}>
                  {skillCourseTitle}
                </Typography>
                <Typography variant={'caption'}>
                  {skillCourseProvider}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sm={6}>
          <Grid container justifyContent={'flex-end'}>
            <Box>
              <CustomParabolaButton
                buttonVariant={'outlined'}
                title={messages['common.edit_btn'] as string}
                icon={<BorderColor />}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item container>
        <Box className={classes.skillIssueDate} mb={4}>
          <AccessTime />
          <Typography className={classes.accessTime}>{date}</Typography>
          <VerticalLine
            lineHeight={'15px'}
            lineWidth={'2px'}
            marginLeft={2}
            marginRight={2}
          />
          {location && (
            <Box className={classes.skillIssueDate}>
              <LocationOnIcon />
              <Typography>{location}</Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </>
  );
};

export default Skill;
