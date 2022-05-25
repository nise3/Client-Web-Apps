import {styled} from '@mui/material/styles';
import {Box, Container, Grid, useMediaQuery} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import React from 'react';
import ImmigrantsUnderlinedHeading from '../../@softbd/elements/common/ImmigrantsUnderlinedHeading';
import {Link} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {Theme} from '@mui/system';

const PREFIX = 'ImmigrantsCycleSection';

const classes = {
  image: `${PREFIX}-image`,
  topOne: `${PREFIX}-topOne`,
  secondRow: `${PREFIX}-secondRow`,
  thirdRow: `${PREFIX}-thirdRow`,
  fourthRow: `${PREFIX}-fourthRow`,
  bottomOne: `${PREFIX}-bottomOne`,

  topButton: `${PREFIX}-topButton`,
  secondButton: `${PREFIX}-secondButton`,
  thirdButton: `${PREFIX}-thirdButton`,
  fourthButton: `${PREFIX}-fourthButton`,
  bottomButton: `${PREFIX}-bottomButton`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  margin: '100px auto',
  [`& .${classes.image}`]: {
    backgroundImage: "url('/images/migration-portal-center-image.png')",
    height: '38rem',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    position: 'relative',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      height: '17rem',
    },
  },

  [`& .${classes.topOne}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '-5%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  [`& .${classes.secondRow}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '13%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  [`& .${classes.thirdRow}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '46%',
  },
  [`& .${classes.fourthRow}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '80%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  [`& .${classes.bottomOne}`]: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '-5%',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },

  /** Link Styles*/

  [`& .${classes.topButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '15%',
    [`& a`]: {
      color: 'red',
      padding: '20px',
    },
    [theme.breakpoints.down('md')]: {},
  },
  [`& .${classes.secondButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '25%',
    '& .linkTwoOne': {
      color: 'red',
      padding: '30px',
    },
    '& .linkTwoTwo': {
      color: 'red',
      padding: '20px',
    },
    [theme.breakpoints.down('md')]: {},
  },
  [`& .${classes.thirdButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '46%',
    '& .linkThreeOne': {
      color: 'red',
      padding: '20px 51px',
      marginRight: '50px',
    },
    '& .linkThreeTwo': {
      color: 'red',
      padding: '30px 49px',
      marginLeft: '25px',
    },
  },
  [`& .${classes.fourthButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '68%',
    '& .linkFourOne': {
      color: 'red',
      padding: '20px',
    },
    '& .linkFourTwo': {
      color: 'red',
      padding: '20px',
    },
    [theme.breakpoints.down('md')]: {},
  },
  [`& .${classes.bottomButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '75%',
    [`& a`]: {
      color: 'red',
      padding: '20px',
    },
    [theme.breakpoints.down('md')]: {},
  },
}));

const ImmigrantsCycleSection = () => {
  const {messages} = useIntl();
  const isMDDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const LINK_GO_ABROAD_KNOWINGLY =
    'https://probashi.gov.bd/site/page/040aceb5-cde3-4017-b90a-1bb23abf6df3/%E0%A6%AC%E0%A6%BF%E0%A6%A6%E0%A7%87%E0%A6%B6-%E0%A6%AF%E0%A6%BE%E0%A6%93%E0%A7%9F%E0%A6%BE%E0%A6%B0-%E0%A6%AA%E0%A7%82%E0%A6%B0%E0%A7%8D%E0%A6%AC%E0%A7%87%E0%A6%B0-%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%B8%E0%A7%8D%E0%A6%A4%E0%A7%81%E0%A6%A4%E0%A6%BF-%E0%A6%93-%E0%A6%95%E0%A6%B0%E0%A6%A3%E0%A7%80%E0%A7%9F';
  const LINK_TRAINING_BMET = 'bmet.nise.gov.bd';
  const LINK_TRAINING_MUKTOPATH = 'http://bmet.muktopaath.gov.bd';
  const LINK_TRAINING_PRE_DEPARTURE =
    'http://muktopaath.gov.bd/course-details/206';
  const LINK_BMET_REGISTRATION = '/';
  const LINK_RECRUITING_AGENCY_LIST =
    'http://www.old.bmet.gov.bd/BMET/agentlistpreview.action?type=valid';
  const LINK_SERVICES_OF_EXPATRIATE_WELFARE_BANK = '/';
  const LINK_LABOR_ATTACHE = 'http://migration.gov.bd/bn/sromo-kalyan-atashe';
  const LINK_SERVICES_OF_WAGE_EARNERS_WELFARE_BOARD =
    'http://migration.gov.bd/bn/sromo-kalyan-atashe';
  const LINK_RETURNED_EXPATRIATE_ONLINE_APPLICATION = '/';

  return (
    <StyledContainer maxWidth='lg'>
      <Box className={classes.image}>
        <Grid container className={classes.topOne}>
          <Grid item xs={12}>
            {messages['migration_portal.go_abroad_knowingly']}
          </Grid>
        </Grid>
        <Grid container className={classes.secondRow}>
          <Grid item xs={6}>
            {
              messages[
                'migration_portal.returned_expatriate_online_application'
              ]
            }
            <br />
            {messages['migration_portal.online_application']}
          </Grid>
          <Grid item xs={6}>
            {messages['menu.training']}
          </Grid>
        </Grid>
        {isMDDown ? (
          <Grid container className={classes.thirdRow}>
            <Grid item xs={12}>
              <Fade direction='up'>
                <ImmigrantsUnderlinedHeading />
              </Fade>
            </Grid>
          </Grid>
        ) : (
          <Grid container className={classes.thirdRow}>
            <Grid item xs={4}>
              {
                messages[
                  'migration_portal.services_of_wage_earners_welfare_board'
                ]
              }
              <br />
              {messages['migration_portal.services']}
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              {messages['migration_portal.bmet_registration']}
            </Grid>
          </Grid>
        )}
        <Grid container className={classes.fourthRow}>
          <Grid item xs={6}>
            {messages['migration_portal.labor_attache']}
            <br />
            {messages['migration_portal.labor']}
          </Grid>
          <Grid item xs={6}>
            {messages['migration_portal.recruiting_agency_list']}
          </Grid>
        </Grid>
        <Grid container className={classes.bottomOne}>
          <Grid item xs={12}>
            {messages['migration_portal.services_of_expatriate_welfare_bank']}
          </Grid>
        </Grid>

        {/** Links */}
        <Grid container className={classes.topButton}>
          <Grid item xs={12}>
            <Link
              href={LINK_GO_ABROAD_KNOWINGLY}
              target='_blank'
              title={messages['migration_portal.go_abroad_knowingly']}>
              click
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.secondButton}>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <Link
              href={LINK_RETURNED_EXPATRIATE_ONLINE_APPLICATION}
              target='_blank'
              className='linkTwoOne'
              title={
                messages[
                  'migration_portal.returned_expatriate_online_application'
                ]
              }>
              click
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link
              href={LINK_TRAINING_BMET}
              target='_blank'
              className='linkTwoTwo'
              title={messages['menu.training']}>
              click
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.thirdButton}>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <Link
              href={LINK_SERVICES_OF_WAGE_EARNERS_WELFARE_BOARD}
              target='_blank'
              className='linkThreeOne'
              title={
                messages[
                  'migration_portal.services_of_wage_earners_welfare_board'
                ]
              }>
              click
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link
              href={LINK_BMET_REGISTRATION}
              target='_blank'
              className='linkThreeTwo'
              title={messages['migration_portal.bmet_registration']}>
              click
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.fourthButton}>
          <Grid item xs={3} />
          <Grid item xs={3}>
            <Link
              href={LINK_LABOR_ATTACHE}
              target='_blank'
              className='linkFourOne'
              title={messages['migration_portal.labor_attache']}>
              click
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link
              href={LINK_RECRUITING_AGENCY_LIST}
              target='_blank'
              className='linkFourTwo'
              title={messages['migration_portal.recruiting_agency_list']}>
              click
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.bottomButton}>
          <Grid item xs={12}>
            <Link
              href={LINK_SERVICES_OF_EXPATRIATE_WELFARE_BANK}
              target='_blank'
              title={
                messages['migration_portal.services_of_expatriate_welfare_bank']
              }>
              click
            </Link>
          </Grid>
        </Grid>
      </Box>
    </StyledContainer>
  );
};
export default ImmigrantsCycleSection;
