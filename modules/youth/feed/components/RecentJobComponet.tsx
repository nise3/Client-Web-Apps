import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Button} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';

const PREFIX = 'RecentJobComponent';

const classes = {
  jobProviderImage: `${PREFIX}-jobProviderImage`,
  jobTitle: `${PREFIX}-jobTitle`,
  jobProviderName: `${PREFIX}-jobProviderName`,
  detailsButton: `${PREFIX}-detailsButton`,
};

const StyledBox = styled(Box)(({theme}) => ({
  padding: '5px 10px 0px 20px',

  [`& .${classes.jobProviderImage}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.jobTitle}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.jobProviderName}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  },
  [`& .${classes.detailsButton}`]: {
    backgroundColor: theme.palette.grey['300'],
    color: theme.palette.common.black,
    boxShadow: 'none',
    marginLeft: 10,
  },
}));

interface RecentJobProps {
  data: {
    imageUrl: string;
    jobTitle: string;
    jobProviderName: string;
    location: string;
  };
}

const RecentJobComponent: FC<RecentJobProps> = ({data}) => {
  const {messages} = useIntl();

  return (
    <StyledBox display={'flex'}>
      <Box>
        <Avatar
          alt='provider image'
          src={data.imageUrl}
          className={classes.jobProviderImage}
        />
      </Box>
      <Box marginLeft={'10px'}>
        <Box className={classes.jobTitle}>{data.jobTitle}</Box>
        <Box className={classes.jobProviderName}>
          {data.jobProviderName} &#8226; {data.location}
        </Box>
        <Box>
          <Button variant='contained' color='primary' size={'small'}>
            {messages['common.apply']}
          </Button>
          <Button
            className={classes.detailsButton}
            variant='contained'
            size={'small'}>
            {messages['common.details']}
          </Button>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default RecentJobComponent;
