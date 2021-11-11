import React, {FC} from 'react';
import { styled } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {Avatar, Box, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import {CremaTheme} from '../../../../redux/types/AppContextPropsType';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';

const PREFIX = 'RecentJobComponent';

const classes = {
  `&.${classes.recentJobCompRoot}`: `${PREFIX}-undefined`,
  `& .${classes.jobProviderImage}`: `${PREFIX}-undefined`,
  `& .${classes.jobTitle}`: `${PREFIX}-undefined`,
  `& .${classes.jobProviderName}`: `${PREFIX}-undefined`
};

const StyledStyledBox = styled(StyledBox)((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    padding: '5px 10px 0px 20px',
  },

  [`& .${classes.undefined}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
}));

const PREFIX = 'RecentJobComponent';

const classes = {
  recentJobCompRoot: `${PREFIX}-recentJobCompRoot`,
  jobProviderImage: `${PREFIX}-jobProviderImage`,
  jobTitle: `${PREFIX}-jobTitle`,
  jobProviderName: `${PREFIX}-jobProviderName`
};

const StyledBox = styled(Box)((
  {
    theme: CremaTheme
  }
) => ({
  [`&.${classes.recentJobCompRoot}`]: {
    padding: '5px 10px 0px 20px',
  },

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
  }
}));

const useStyle = makeStyles((
  {
    theme: {
      theme: CremaTheme
    }
  }
) => ({
  [`& .${classes.undefined}`]: {
    padding: '5px 10px 0px 20px',
  },

  [`& .${classes.undefined}`]: {
    height: 45,
    width: 45,
    border: '1px solid ' + theme.palette.grey['300'],
  },

  [`& .${classes.undefined}`]: {
    fontWeight: Fonts.BOLD,
  },

  [`& .${classes.undefined}`]: {
    color: theme.palette.grey['600'],
    marginBottom: 10,
  }
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
  const classes = useStyle();
  const {messages} = useIntl();

  return (
    <StyledStyledBox display={'flex'} className={classes.recentJobCompRoot}>
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
          <Button variant='contained' size={'small'} style={{marginLeft: 10}}>
            {messages['common.details']}
          </Button>
        </Box>
      </Box>
    </StyledStyledBox>
  );
};

export default RecentJobComponent;
