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
import {Body1, H4, H6} from '../../../@softbd/elements/common';
import Box from '@mui/material/Box';
import TagChip from '../../../@softbd/elements/display/TagChip';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';

const PREFIX = 'MemberDetails';

const classes = {
  icon: `${PREFIX}-icon`,
  logo: `${PREFIX}-logo`,
  contact_person_info: `${PREFIX}-contact_person_info`,
  contact_person_avatar: `${PREFIX}-contact_person_avatar`,
  divider: `${PREFIX}-divider`,
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
    width: '100%',
    maxHeight: '350px',
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
  },
  [`& .${classes.divider}`]: {
    width: '100%',
  },
}));

const MemberDetails = () => {
  const {messages, formatDate} = useIntl();
  const router = useRouter();
  const {memberId} = router.query;

  const {data} = useFetchIndustryMember(Number(memberId));

  return (
    <StyledContainer maxWidth={'lg'}>
      <Button
        startIcon={<ArrowBack />}
        sx={{marginRight: '10px'}}
        variant={'outlined'}
        onClick={() => router.back()}>
        {messages['common.back']}
      </Button>
      <Box
        display={'flex'}
        mt={3}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TagChip
          label={
            <Typography
              sx={{
                color: 'primary.main',
              }}>
              {messages['common.establish_date']}
              {formatDate(data?.created_at, {
                month: 'long',
                year: 'numeric',
              })}
            </Typography>
          }
          sx={{
            margin: '0 !important',
          }}
        />
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
      <H4 py={2} fontWeight={'bold'}>
        {messages['common.organization_details']}
      </H4>

      <Grid container spacing={3}>
        <Grid item xs={12}>
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
                  image={data?.logo}
                  alt={data?.title}
                  className={classes.logo}
                />
              </Box>
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
                  <H6 fontWeight={'bold'} mt={1}>
                    {data?.contact_person_name}
                  </H6>
                  <Typography
                    variant={'subtitle2'}
                    sx={{
                      color: 'primary.main',
                    }}>
                    {data?.contact_person_designation}
                  </Typography>
                </Grid>
                <Divider
                  orientation={'horizontal'}
                  className={classes.divider}
                />
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
                    <Call />
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
                  </Box>
                </Grid>
                <Divider
                  orientation={'horizontal'}
                  className={classes.divider}
                />
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
                    <Email />
                  </IconButton>
                  <Box>
                    <Typography variant={'subtitle2'}>
                      {messages['common.email']}
                    </Typography>
                    <Typography
                      variant={'subtitle2'}
                      sx={{
                        color: 'grey.500',
                      }}>
                      {data?.contact_person_email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Body1>{data?.description}</Body1>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default MemberDetails;
