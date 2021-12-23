import React, {FC, useContext} from 'react';
import {styled} from '@mui/material/styles';
import {Avatar, Box, Button, useTheme} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import {useIntl} from 'react-intl';
import AppContextPropsType from '../../../../redux/types/AppContextPropsType';
import AppContext from '../../../../@crema/utility/AppContext';
import AppLocale from '../../../../shared/localization';
import typography from '../../../../@softbd/layouts/themes/default/typography';
import {H3} from '../../../../@softbd/elements/common';

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
    imageUrl: string;
    jobTitle: string;
    jobProviderName: string;
    location: string;
  };
}

const RecentJobComponent: FC<RecentJobProps> = ({data}) => {
  const {messages} = useIntl();
  const theme = useTheme();
  const {locale} = useContext<AppContextPropsType>(AppContext);
  const currentAppLocale = AppLocale[locale.locale];
  const result = typography(theme, currentAppLocale.locale);

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
        <H3 sx={{...result.body2}} className={classes.jobTitle}>
          {data.jobTitle}
        </H3>
        <Box className={classes.jobProviderName}>
          {data.jobProviderName} &#8226; {data.location}
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
