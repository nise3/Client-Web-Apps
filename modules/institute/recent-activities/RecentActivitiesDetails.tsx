import {styled} from '@mui/material/styles';
import {
  Box,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ShareIcon from '@mui/icons-material/Share';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import DateRangeIcon from '@mui/icons-material/DateRange';
import {H4} from '../../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import {
  getEmbeddedVideoUrl,
  getIntlDateFromString,
} from '../../../@softbd/utilities/helpers';
import VideoPlayer from '../videos/videoPlayer';
import ContentTypes from '../../dashboard/recentActivities/ContentTypes';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';
import React, {useEffect, useState} from 'react';
import {useFetchPublicRecentActivityDetails} from '../../../services/cmsManagement/hooks';
import {useRouter} from 'next/router';

const PREFIX = 'RecentActivitiesDetails';

const classes = {
  date: `${PREFIX}-date`,
  icon: `${PREFIX}-icon`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.date}`]: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.primary.main,
  },

  [`& .${classes.icon}`]: {
    color: '#ffff',
    padding: '2px',
    borderRadius: '3px',
    '&:not(:last-child)': {marginRight: '10px'},
  },
}));

const RecentActivitiesDetails = () => {
  const {messages, formatDate} = useIntl();
  const [videoUrl, setVideoUrl] = useState<any>(null);
  const theme = useTheme();

  const route = useRouter();
  const {details} = route.query;

  const {data, isLoading} = useFetchPublicRecentActivityDetails(details);

  useEffect(() => {
    if (data && data?.content_type != ContentTypes.IMAGE) {
      const embeddedUrl = getEmbeddedVideoUrl(data.video_url);
      setVideoUrl(embeddedUrl);
    }
  }, [data]);

  return (
    <StyledContainer maxWidth={'lg'}>
      {isLoading ? (
        <Skeleton variant={'rectangular'} width={'100%'} height={400} />
      ) : (
        <>
          {data ? (
            <Grid container>
              <Grid item xs={12} mt={5}>
                <Grid container>
                  <Grid item xs={6}>
                    <Box className={classes.date}>
                      <DateRangeIcon />
                      <Typography ml={1}>
                        {getIntlDateFromString(formatDate, data?.published_at)}
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
                <H4 fontWeight={'bold'}>{data?.title}</H4>
              </Grid>
              <Grid item xs={12} my={3}>
                {data?.content_type && data.content_type == ContentTypes.IMAGE && (
                  <CardMedia
                    component='img'
                    height='400'
                    image={data?.image_path}
                    alt={data?.title}
                    title={data?.title}
                    sx={{
                      objectFit: 'unset',
                      [theme.breakpoints.up('xl')]: {
                        height: 550,
                      },
                      [theme.breakpoints.down('sm')]: {
                        height: 150,
                      },
                    }}
                  />
                )}

                {data?.content_type &&
                  data.content_type != ContentTypes.IMAGE && (
                    <VideoPlayer url={videoUrl ? videoUrl : data?.video_url} />
                  )}
              </Grid>

              <Grid item xs={12}>
                <Typography
                  dangerouslySetInnerHTML={{__html: data?.description}}
                />
              </Grid>
            </Grid>
          ) : (
            <NoDataFoundComponent />
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default RecentActivitiesDetails;
