import React from 'react';
import {useRouter} from 'next/router';
import {useFetchIndustryMember} from '../../../services/IndustryManagement/hooks';
import {styled} from '@mui/material/styles';
import {
  Avatar,
  Button,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import {useIntl} from 'react-intl';
import {ArrowBack, Call, Email} from '@mui/icons-material';
import {Body1, H4, H6, S2} from '../../../@softbd/elements/common';
import Box from '@mui/material/Box';
import TagChip from '../../../@softbd/elements/display/TagChip';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

const PREFIX = 'MemberDetails';

const classes = {
  icon: `${PREFIX}-icon`,
  logo: `${PREFIX}-logo`,
  contact_person_info: `${PREFIX}-contact_person_info`,
  contact_person_avatar: `${PREFIX}-contact_person_avatar`,
  divider: `${PREFIX}-divider`,
  overflowEllipsis: `${PREFIX}-overflowEllipsis`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  marginTop: '20px',
  marginBottom: '20px',
  [`& .${classes.icon}`]: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },
  [`& .${classes.logo}`]: {
    width: '300px',
    maxHeight: '300px',
    objectFit: 'contain',
  },
  [`& .${classes.contact_person_avatar}`]: {
    width: '100px',
    height: '100px',
    boxShadow: '0px 0px 5px 2px #e9e9e9',
    marginTop: '10px',
    [`& img`]: {
      objectFit: 'unset',
    },
  },
  [`& .${classes.contact_person_info}`]: {
    background: theme.palette.common.white,
    border: '1px solid #e9e9e9',
    boxShadow: '0px 0px 7px 4px #e9e9e9',
    borderRadius: '5px',
  },
  [`& .${classes.divider}`]: {
    width: '100%',
  },
  [`& .${classes.overflowEllipsis}`]: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));

const MemberDetails = () => {
  const {messages, formatDate} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();
  const {memberId} = router.query;

  const {data} = useFetchIndustryMember(Number(memberId));

  const copyToClipboard = () => {
    let el: any = document.getElementById('email_text');
    if (el) {
      el.select();
      document.execCommand('copy');
      successStack('Email address copied');
    }
  };

  const copyPhoneToClipboard = () => {
    let el: any = document.getElementById('phone_text');
    if (el) {
      el.select();
      document.execCommand('copy');
      successStack('Phone number copied');
    }
  };

  return (
    <StyledContainer maxWidth={'lg'}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <Button
          startIcon={<ArrowBack />}
          sx={{marginRight: '10px'}}
          variant={'outlined'}
          onClick={() => router.back()}>
          {messages['common.back']}
        </Button>
        <Box>
          <Tooltip title={messages['common.like']}>
            <ThumbUpAltIcon
              className={classes.icon}
              sx={{backgroundColor: '#008fff'}}
            />
          </Tooltip>
          <Tooltip title={messages['common.share_label']}>
            <ShareIcon
              className={classes.icon}
              sx={{backgroundColor: '#4E4E98'}}
            />
          </Tooltip>
          <Tooltip title={messages['common.print']}>
            <PrintOutlinedIcon
              className={classes.icon}
              sx={{backgroundColor: '#ffb700b8'}}
            />
          </Tooltip>
          <Tooltip title={messages['common.download_label']}>
            <SystemUpdateAltOutlinedIcon
              className={classes.icon}
              sx={{backgroundColor: '#2fc94d'}}
            />
          </Tooltip>
        </Box>
      </Box>

      <Box
        display={'flex'}
        mt={3}
        justifyContent={'space-between'}
        alignItems={'center'}>
        {data?.date_of_establishment && (
          <TagChip
            label={
              <Typography
                sx={{
                  color: 'primary.main',
                }}>
                {messages['common.establish_date']}
                {formatDate(data?.date_of_establishment, {
                  month: 'long',
                  year: 'numeric',
                })}
              </Typography>
            }
            sx={{
              margin: '0 !important',
            }}
          />
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          sm={8}
          md={9}
          order={{
            xs: 2,
            sm: 1,
            md: 1,
          }}>
          <Box>
            <CardMedia
              component={'img'}
              image={data?.logo ? data?.logo : '/images/blank_image.png'}
              alt={data?.title}
              className={classes.logo}
            />
          </Box>
          <H4 py={2} fontWeight={'bold'}>
            {messages['common.organization_details']}
          </H4>
          <Body1>
            {data?.description ? (
              data?.description
            ) : (
              <NoDataFoundComponent
                messageType={messages['common.organization_details']}
              />
            )}
          </Body1>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          md={3}
          order={{
            xs: 1,
            sm: 2,
            md: 2,
          }}>
          <Grid container className={classes.contact_person_info}>
            <Grid
              item
              xs={12}
              padding={1}
              display={'flex'}
              alignItems={'center'}
              flexDirection={'column'}>
              <Avatar
                className={classes.contact_person_avatar}
                src={data?.office_head_avatar}
              />
              <H6 centered={true} fontWeight={'bold'} mt={1}>
                {data?.contact_person_name}
              </H6>
              <S2
                centered={true}
                variant={'subtitle2'}
                sx={{
                  color: 'primary.main',
                }}>
                {data?.contact_person_designation}
              </S2>
            </Grid>
            <Divider orientation={'horizontal'} className={classes.divider} />
            <Grid
              item
              xs={12}
              padding={1}
              display={'flex'}
              alignItems={'center'}>
              <IconButton
                color={'primary'}
                sx={{
                  marginRight: '10px',
                  backgroundColor: '#4d0d641f !important', //TODO this color needs to be added in palette
                }}>
                <Tooltip title={'Click to copy phone number'} arrow>
                  <Call onClick={() => copyPhoneToClipboard()} />
                </Tooltip>
              </IconButton>
              <Box>
                <Typography variant={'subtitle2'}>
                  {messages['common.mobile']}
                </Typography>
                <Typography
                  variant={'subtitle2'}
                  sx={{
                    color: 'grey.500',
                  }}>
                  {data?.contact_person_mobile}
                </Typography>
                <textarea
                  id={'phone_text'}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                  readOnly={true}
                  value={data?.contact_person_mobile}
                />
              </Box>
            </Grid>
            <Divider orientation={'horizontal'} className={classes.divider} />
            <Grid
              item
              xs={12}
              padding={1}
              display={'flex'}
              alignItems={'center'}>
              <IconButton
                color={'primary'}
                sx={{
                  marginRight: '10px',
                  backgroundColor: '#4d0d641f !important', //TODO this color needs to be added in palette
                }}>
                <Tooltip title={'Click to copy email'} arrow>
                  <Email onClick={() => copyToClipboard()} />
                </Tooltip>
              </IconButton>
              <Box className={classes.overflowEllipsis}>
                <Typography variant={'subtitle2'}>
                  {messages['common.email']}
                </Typography>
                <S2
                  sx={{color: 'grey.500'}}
                  className={classes.overflowEllipsis}
                  title={data?.contact_person_email}>
                  {data?.contact_person_email}
                </S2>
                <textarea
                  id={'email_text'}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                  }}
                  readOnly={true}
                  value={data?.contact_person_email}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default MemberDetails;
