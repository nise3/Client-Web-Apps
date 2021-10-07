import React, {FC} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../types/AppContextPropsType';
import {BusinessCenter, Room} from '@mui/icons-material';
import clsx from 'clsx';
import {useIntl} from 'react-intl';

const useStyles = makeStyles((theme: CremaTheme) => ({
  jobCardRoot: {
    maxWidth: 345,
    minWidth: '100%',
  },
  jobCardImage: {
    height: 140,
  },
  jobTitleBox: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  dFlex: {
    display: 'flex',
  },
  marginRight10: {
    marginRight: 10,
  },
  marginTop10: {
    marginTop: 10,
  },
  buttonBox: {
    marginTop: 10,
    textAlign: 'center',
  },
}));

interface JobComponentProps {
  job: any;
}

const JobComponent: FC<JobComponentProps> = ({job}) => {
  const classes = useStyles();
  const {messages} = useIntl();

  return (
    <Card className={classes.jobCardRoot}>
      <CardContent>
        <CardMedia
          className={classes.jobCardImage}
          image={job.providerImage}
          title={job.title}
        />
        <Box className={classes.jobTitleBox}>{job.title}</Box>
        <Box>{job.providerName}</Box>
      </CardContent>
      <Divider />
      <CardContent>
        <Box className={classes.dFlex}>
          <BusinessCenter className={classes.marginRight10} />
          {job.experience} years experience
        </Box>
        <Box className={clsx(classes.dFlex, classes.marginTop10)}>
          <Room className={classes.marginRight10} />
          {job.location}
        </Box>
        <Box className={classes.buttonBox}>
          <Button variant={'outlined'} color={'primary'}>
            {messages['common.apply_now']}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobComponent;
