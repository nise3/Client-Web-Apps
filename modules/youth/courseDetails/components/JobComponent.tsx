import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from '@mui/material';
import {BusinessCenter, Room} from '@mui/icons-material';
import clsx from 'clsx';
import {useIntl} from 'react-intl';

const PREFIX = 'JobComponent';

const classes = {
  jobCardImage: `${PREFIX}-jobCardImage`,
  jobTitleBox: `${PREFIX}-jobTitleBox`,
  dFlex: `${PREFIX}-dFlex`,
  marginRight10: `${PREFIX}-marginRight10`,
  marginTop10: `${PREFIX}-marginTop10`,
  buttonBox: `${PREFIX}-buttonBox`,
};

const StyledCard = styled(Card)(({theme}) => ({
  maxWidth: 345,
  minWidth: '100%',

  [`& .${classes.jobCardImage}`]: {
    height: 140,
  },

  [`& .${classes.jobTitleBox}`]: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },

  [`& .${classes.dFlex}`]: {
    display: 'flex',
  },

  [`& .${classes.marginRight10}`]: {
    marginRight: 10,
  },

  [`& .${classes.marginTop10}`]: {
    marginTop: 10,
  },

  [`& .${classes.buttonBox}`]: {
    marginTop: 10,
    textAlign: 'center',
  },
}));

interface JobComponentProps {
  job: any;
}

const JobComponent: FC<JobComponentProps> = ({job}) => {
  const {messages} = useIntl();

  return (
    <StyledCard>
      <CardContent>
        <CardMedia
          component={'img'}
          className={classes.jobCardImage}
          image={job.providerImage}
          title={job.title}
          alt={job.title}
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
    </StyledCard>
  );
};

export default JobComponent;
