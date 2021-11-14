import React from 'react';
import {styled} from '@mui/material/styles';
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useFetchPublicNoticeOrNews} from '../../../services/cmsManagement/hooks';
import {getIntlDateFromString} from '../../../@softbd/utilities/helpers';

const PREFIX = 'NoticeDetails';

const classes = {
  date: `${PREFIX}-date`,
  icon: `${PREFIX}-icon`,
  container: `${PREFIX}-container`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.date}`]: {
    display: 'flex',
    alignItems: 'center',
  },

  [`& .${classes.icon}`]: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },

  [`& .${classes.container}`]: {
    marginTop: '50px',
  },
}));

const NoticeDetails = () => {
  const {messages, formatDate} = useIntl();
  const router = useRouter();
  const {noticeId} = router.query;
  const {data: notice} = useFetchPublicNoticeOrNews(Number(noticeId));

  return (
    <StyledContainer maxWidth={'lg'}>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={5}>
          <Grid container>
            <Grid item xs={6}>
              <Box className={classes.date}>
                <DateRangeIcon />
                <Typography>
                  {getIntlDateFromString(formatDate, notice?.published_at)}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign={'right'}>
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
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant={'h6'} fontWeight={'bold'}>
            {notice?.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <CardMedia
            component='img'
            height='300'
            image={
              notice?.main_image_path
                ? notice?.main_image_path
                : '/images/notice_details.jpg'
            }
            alt={notice?.image_alt_title}
            title={notice?.title}
          />
        </Grid>
        <Grid item xs={12}>
          <div
            dangerouslySetInnerHTML={{
              __html: notice?.details,
            }}
          />
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default NoticeDetails;
