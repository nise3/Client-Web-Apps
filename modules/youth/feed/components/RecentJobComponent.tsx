import React, {FC} from 'react';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Button} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import {H3} from '../../../../@softbd/elements/common';
import {useCustomStyle} from '../../../../@softbd/hooks/useCustomStyle';

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
    boxShadow: 'none',
    marginLeft: 10,
  },
}));

interface RecentJobProps {
  data: {
    industry_association_logo?: string;
    industry_association_address?: string;
    job_title?: string;
    industry_association_title?: string;
    industry_title?: string;
    location?: string;
  };
}

const RecentJobComponent: FC<RecentJobProps> = ({data}) => {
  const {messages} = useIntl();
  const result = useCustomStyle();

  return (
    <StyledBox display={'flex'}>
      <Box>
        <Avatar
          alt='provider image'
          src={data.industry_association_logo}
          className={classes.jobProviderImage}
        />
      </Box>
      <Box marginLeft={'10px'}>
        <H3 sx={{...result.body2}} className={classes.jobTitle}>
          {data?.job_title}
        </H3>
        <Box className={classes.jobProviderName}>
          {data?.industry_association_title ?? data?.industry_title} &#8226;{' '}
          {data.industry_association_address ?? messages['no_location']}
        </Box>
        <Box>
          <Button variant='contained' color='primary' size={'small'}>
            {messages['common.apply']}
          </Button>
          <Button
            className={classes.detailsButton}
            variant='outlined'
            color='primary'
            size={'small'}>
            {messages['common.details']}
          </Button>
        </Box>
      </Box>
    </StyledBox>
  );
};

export default RecentJobComponent;
