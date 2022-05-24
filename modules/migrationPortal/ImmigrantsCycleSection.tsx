import {styled} from '@mui/material/styles';
import {Box, Container, Grid, useMediaQuery} from '@mui/material';
import {Fade} from 'react-awesome-reveal';
import React from 'react';
import ImmigrantsUnderlinedHeading from '../../@softbd/elements/common/ImmigrantsUnderlinedHeading';
import {Link, S2} from '../../@softbd/elements/common';
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

  [`& .${classes.topButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '15%',
    [theme.breakpoints.down('md')]: {},
  },
  [`& .${classes.secondButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '13%',
    [theme.breakpoints.down('md')]: {},
  },
  [`& .${classes.thirdButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '46%',
  },
  [`& .${classes.fourthButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    top: '80%',
    [theme.breakpoints.down('md')]: {},
  },
  [`& .${classes.bottomButton}`]: {
    textAlign: 'center',
    position: 'absolute',
    bottom: '-5%',
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

  return (
    <StyledContainer maxWidth='lg'>
      <Box className={classes.image}>
        <Grid container className={classes.topOne}>
          <Grid item xs={12}>
            <S2>{messages['migration_portal.go_abroad_knowingly']}</S2>
          </Grid>
        </Grid>
        <Grid container className={classes.secondRow}>
          <Grid item xs={6}>
            second left
          </Grid>
          <Grid item xs={6}>
            second right
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
              third left
            </Grid>
            <Grid item xs={4} />
            <Grid item xs={4}>
              third right
            </Grid>
          </Grid>
        )}
        <Grid container className={classes.fourthRow}>
          <Grid item xs={6}>
            fourth left
          </Grid>
          <Grid item xs={6}>
            fourth right
          </Grid>
        </Grid>
        <Grid container className={classes.bottomOne}>
          <Grid item xs={12}>
            <S2>{messages['migration_portal.go_abroad_knowingly']}</S2>
          </Grid>
        </Grid>

        {/** link buttons */}
        <Grid container className={classes.topButton}>
          <Grid item xs={12}>
            <Link
              href={LINK_GO_ABROAD_KNOWINGLY}
              target='_blank'
              style={{color: 'red', padding: '20px'}}
              title={messages['migration_portal.go_abroad_knowingly']}>
              click
            </Link>
          </Grid>
        </Grid>
        <Grid container className={classes.secondButton}>
          <Grid item xs={6}>
            second left
          </Grid>
          <Grid item xs={6}>
            second right
          </Grid>
        </Grid>
        <Grid container className={classes.thirdButton}>
          <Grid item xs={4}>
            third left
          </Grid>
          <Grid item xs={4}>
            <Fade direction='up'>
              <ImmigrantsUnderlinedHeading />
            </Fade>
          </Grid>
          <Grid item xs={4}>
            third right
          </Grid>
        </Grid>
        <Grid container className={classes.fourthButton}>
          <Grid item xs={6}>
            fourth left
          </Grid>
          <Grid item xs={6}>
            fourth right
          </Grid>
        </Grid>
        <Grid container className={classes.bottomButton}>
          <Grid item xs={12}>
            <S2>{messages['migration_portal.go_abroad_knowingly']}</S2>
          </Grid>
        </Grid>
      </Box>
    </StyledContainer>
  );
};
export default ImmigrantsCycleSection;
