import React from 'react';
import {Box, Grid, Paper, Typography} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import clsx from 'clsx';
import {useIntl} from 'react-intl';
import {Link} from '../../@softbd/elements/common';
import {
  LINK_INSTITUTE_SIGNUP,
  // LINK_ORGANIZATION_SIGNUP,
  LINK_YOUTH_SIGNUP,
  LINK_INDUSTRY_ASSOCIATION_SIGNUP,
} from '../../@softbd/common/appLinks';
import {getSSOLoginUrl} from '../../@softbd/common/SSOConfig';
import {classes, StyledContainer} from './index.style';
import {useRouter} from 'next/router';

const YouthSignupPage = () => {
  const {messages} = useIntl();
  const {query} = useRouter();

  return (
    <StyledContainer sx={{display: 'flex'}}>
      <Paper className={classes.paperBox}>
        <Typography variant={'h6'} align={'center'} mb={4}>
          {messages['signup.label']}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <Link href={LINK_YOUTH_SIGNUP}>
              <Box className={clsx(classes.iconBoxYouth, classes.icon)}>
                <PeopleIcon sx={{color: '#fff'}} />
                <Typography className={classes.text}>
                  {messages['common.youth']}
                </Typography>
              </Box>
            </Link>
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
            <Link href={LINK_INSTITUTE_SIGNUP}>
              <Box className={clsx(classes.iconBoxTc, classes.icon)}>
                <BusinessIcon style={{color: '#ffffff'}} />
                <Typography className={classes.text}>
                  {messages['common.training_center']}
                </Typography>
              </Box>
            </Link>
          </Grid>
          {/*<Grid item xs={12} sm={3} md={3}>*/}
          {/*  <Link href={LINK_ORGANIZATION_SIGNUP}>*/}
          {/*    <Box className={clsx(classes.iconBoxIndustry, classes.icon)}>*/}
          {/*      <BusinessIcon style={{color: '#ffffff'}} />*/}
          {/*      <Typography className={classes.text}>*/}
          {/*        {messages['common.industry']}*/}
          {/*      </Typography>*/}
          {/*    </Box>*/}
          {/*  </Link>*/}
          {/*</Grid>*/}
          <Grid item xs={12} sm={4} md={4}>
            <Link href={LINK_INDUSTRY_ASSOCIATION_SIGNUP}>
              <Box
                className={clsx(
                  classes.iconBoxIndustryAssociation,
                  classes.icon,
                )}>
                <BusinessIcon style={{color: '#ffffff'}} />
                <Typography className={classes.text}>
                  {messages['common.industry_association']}
                </Typography>
              </Box>
            </Link>
          </Grid>
        </Grid>
        <Typography variant={'h6'} align={'right'} mt={4}>
          {messages['common.already_have_account']}{' '}
          <Link href={getSSOLoginUrl(query)} className={classes.signInStyle}>
            {messages['common.signin_here']}
          </Link>
        </Typography>
      </Paper>
    </StyledContainer>
  );
};

export default YouthSignupPage;
