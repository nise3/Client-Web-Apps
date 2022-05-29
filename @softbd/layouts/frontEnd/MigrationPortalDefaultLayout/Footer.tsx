import {
  ArrowForwardIos,
  ArrowRightAlt,
  Email,
  Home,
  LocalPhone,
  PhoneAndroid,
} from '@mui/icons-material';
import {Box, Button, Container, Grid, Typography} from '@mui/material';
import {styled} from '@mui/material/styles';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import GoToTop from '../../../../modules/goToTop';
import {useFetchStaticPageBlock} from '../../../../services/cmsManagement/hooks';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../common/apiRoutes';
import {
  LINK_FRONTEND_MIGRATION_PORTAL_CONTACT,
  LINK_FRONTEND_MIGRATION_PORTAL_FAQ,
  LINK_FRONTEND_MIGRATION_PORTAL_NOTICE,
  LINK_FRONTEND_MIGRATION_PORTAL_RECENT_ACTIVITIES,
  LINK_MIGRATION_PORTAL_FRONTEND_STATIC_CONTENT,
} from '../../../common/appLinks';
import {H6, Link, Text} from '../../../elements/common';
import LogoCustomizable from '../../../elements/common/LogoCustomizable';
import {
  BLOCK_ID_MIGRATION_PORTAL_DETAILS,
  CONTENT_ID_ABOUT_US,
  CONTENT_ID_PRIVACY_POLICY,
  CONTENT_ID_TERMS_AND_CONDITIONS,
} from '../../../utilities/StaticContentConfigs';
import {getBrowserCookie} from '../../../libs/cookieInstance';
import {COOKIE_KEY_APP_CURRENT_LANG} from '../../../../shared/constants/AppConst';
import {convertEnglishDigitsToBengali} from '../../../utilities/helpers';
import {useFetchPublicMigrationPortalDetailsWithParams} from '../../../../services/MigrationPortalManagement/hooks';

const PREFIX = 'Footer';

const classes = {
  foot: `${PREFIX}-foot`,
  container: `${PREFIX}-container`,
  footerImage: `${PREFIX}-footerImage`,
  softbdImage: `${PREFIX}-softbdImage`,
  primary: `${PREFIX}-primary`,
  bullet: `${PREFIX}-bullet`,
  textColor: `${PREFIX}-textColor`,
  textLineClamp: `${PREFIX}-textColor`,
};

const textColor = (theme: any) => ({color: theme.palette.grey[700]});

const StyledContainer = styled(Grid)(({theme}) => ({
  marginTop: '80px',
  background: theme.palette.grey.A100,
  padding: '20px',

  [`& .${classes.primary}`]: {
    color: theme.palette.primary.main,
  },

  [`& .${classes.bullet}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    ...textColor(theme),
  },

  [`& .${classes.textColor}`]: {
    ...textColor(theme),
  },
  [`& .${classes.textLineClamp}`]: {
    ...textColor(theme),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: '4',
    WebkitBoxOrient: 'vertical',
  },
}));

const StyledFoot = styled(Grid)(({theme}) => ({
  marginTop: '50px',

  [`& .${classes.footerImage}`]: {
    width: '280px',
  },

  [`& .${classes.softbdImage}`]: {
    //width: '147px',
  },

  [`& .${classes.primary}`]: {
    color: theme.palette.primary.main,
  },

  [`& .${classes.bullet}`]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
  },
}));

// const langConst: LanguageCodes;
const Footer = () => {
  const {messages, locale} = useIntl();
  const [migrationPortalFilter] = useState({});
  const [staticPageParams] = useState<any>({
    selected_language: locale,
  });

  const language = getBrowserCookie(COOKIE_KEY_APP_CURRENT_LANG) || 'bn';
  const {data: migrationPortal} =
    useFetchPublicMigrationPortalDetailsWithParams(migrationPortalFilter);

  const {data: blockData} = useFetchStaticPageBlock(
    BLOCK_ID_MIGRATION_PORTAL_DETAILS,
    staticPageParams,
  );

  // console.log('public institute details ', blockData)

  const getAddress = () => {
    let address = '';
    let addrs = [];
    if (migrationPortal) {
      if (migrationPortal.address) {
        addrs.push(migrationPortal.address);
      }
      if (migrationPortal.upazila_title) {
        addrs.push(migrationPortal.upazila_title);
      }
      if (migrationPortal.district_title) {
        addrs.push(migrationPortal.district_title);
      }
      if (migrationPortal.division_title) {
        addrs.push(migrationPortal.division_title);
      }

      address = addrs.join(', ');
    }
    return address;
  };

  return (
    <>
      <StyledContainer container>
        <Container maxWidth='lg'>
          <Grid container spacing={8}>
            <Grid item xs={12} md={4} lg={4} p={0}>
              <LogoCustomizable
                instituteName={migrationPortal?.title}
                instituteLogo={migrationPortal?.logo}
              />
              <Box
                className={classes.textLineClamp}
                mt={4}
                dangerouslySetInnerHTML={{__html: blockData?.content}}>
                {/* <Text className={classes.textColor} >*/}

                {/* </Text> */}
              </Box>
              <Box display='flex' justifyContent='left' mt={4}>
                <Link
                  href={
                    LINK_MIGRATION_PORTAL_FRONTEND_STATIC_CONTENT +
                    CONTENT_ID_ABOUT_US
                  }>
                  <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    endIcon={<ArrowRightAlt />}>
                    {messages['footer.details']}
                  </Button>
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} md={4} lg={4} p={0} sx={{marginTop: 3}}>
              <H6 className={classes.primary}>{messages['footer.contact']}</H6>
              <Box display='flex' mt={4}>
                <Home className={classes.primary} />
                <Text style={{marginLeft: '6px'}} className={classes.textColor}>
                  {getAddress()}
                </Text>
              </Box>
              <Box display='flex' mt={4}>
                <Email className={classes.primary} />
                <Text
                  style={{marginTop: '2px', marginLeft: '6px'}}
                  className={classes.textColor}>
                  {migrationPortal?.email}
                </Text>
              </Box>
              {migrationPortal?.primary_mobile ? (
                <Box display='flex' mt={4}>
                  <PhoneAndroid className={classes.primary} />
                  <Text
                    style={{marginLeft: '6px'}}
                    className={classes.textColor}>
                    {language === 'bn'
                      ? convertEnglishDigitsToBengali(
                          migrationPortal?.primary_mobile,
                        )
                      : migrationPortal?.primary_mobile}
                  </Text>
                </Box>
              ) : (
                <></>
              )}
              {migrationPortal?.primary_phone ? (
                <Box display='flex' mt={4}>
                  <LocalPhone className={classes.primary} />
                  <Text
                    style={{marginLeft: '6px'}}
                    className={classes.textColor}>
                    {language === 'bn'
                      ? convertEnglishDigitsToBengali(
                          migrationPortal?.primary_phone,
                        )
                      : migrationPortal?.primary_phone}
                  </Text>
                </Box>
              ) : (
                <></>
              )}
            </Grid>
            <Grid item xs={12} md={4} lg={4} p={0} sx={{marginTop: 3}}>
              <H6 className={classes.primary}>
                {messages['footer.important_links']}
              </H6>
              <Box display='flex' mt={4} justifyContent='space-between'>
                <Box>
                  {/*<Link href='/' className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.online_courses']}
                  </Link>*/}
                  <Link
                    href={
                      LINK_MIGRATION_PORTAL_FRONTEND_STATIC_CONTENT +
                      CONTENT_ID_ABOUT_US
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.about_us']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_MIGRATION_PORTAL_NOTICE}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.notices']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_MIGRATION_PORTAL_RECENT_ACTIVITIES}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.events']}
                  </Link>
                  <Link
                    href={LINK_FRONTEND_MIGRATION_PORTAL_CONTACT}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.contact']}
                  </Link>
                  <Link
                    target={'_blank'}
                    href={
                      FILE_SERVER_FILE_VIEW_ENDPOINT +
                      'tx9keh3ZscWs1v1M1CJOH0Aj1exPoa1638871975.pdf'
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.user_manual']}
                  </Link>
                </Box>
                <Box>
                  <Link
                    href={LINK_FRONTEND_MIGRATION_PORTAL_FAQ}
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.faq']}
                  </Link>
                  <Link
                    href={
                      LINK_MIGRATION_PORTAL_FRONTEND_STATIC_CONTENT +
                      CONTENT_ID_TERMS_AND_CONDITIONS
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />{' '}
                    {messages['footer.terms_and_conditions']}
                  </Link>
                  <Link
                    href={
                      LINK_MIGRATION_PORTAL_FRONTEND_STATIC_CONTENT +
                      CONTENT_ID_PRIVACY_POLICY
                    }
                    className={classes.bullet}>
                    <ArrowForwardIos
                      sx={{fontSize: '0.625rem', marginRight: '2px'}}
                      className={classes.primary}
                    />
                    {messages['footer.privacy_policy']}
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </StyledContainer>
      <StyledFoot container>
        <Container maxWidth='lg'>
          <Grid item container spacing={7}>
            <Grid item md={4}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box component={'span'} fontWeight='fontWeightBold'>
                  {messages['footer.implementation']}
                </Box>
              </Typography>
              <a
                target='_blank'
                href='https://a2i.gov.bd/'
                rel='noopener noreferrer'>
                <Box component={'span'}>
                  <img
                    src={'/images/footer-img-white.png'}
                    alt='crema-logo'
                    className={classes.footerImage}
                  />
                </Box>
              </a>
            </Grid>
            <Grid item md={6} />
            <Grid item md={2}>
              <Typography variant='subtitle2' gutterBottom={true}>
                <Box
                  component={'span'}
                  fontWeight='fontWeightBold'
                  sx={{whiteSpace: 'nowrap'}}>
                  {messages['footer.technical_assistance']}
                </Box>
              </Typography>
              <a
                target='_blank'
                href='https://softbdltd.com/'
                rel='noopener noreferrer'>
                <Box component={'span'}>
                  <img
                    src={'/images/softbd.png'}
                    alt='crema-logo'
                    className={classes.softbdImage}
                  />
                </Box>
              </a>
            </Grid>
          </Grid>
        </Container>
      </StyledFoot>
      <GoToTop />
    </>
  );
};

export default Footer;
