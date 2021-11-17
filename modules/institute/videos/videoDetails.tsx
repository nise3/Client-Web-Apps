import {useIntl} from 'react-intl';
import {styled} from '@mui/material/styles';
import {Card, CardContent, Container, Grid, Skeleton} from '@mui/material';
import {H5, H6} from '../../../@softbd/elements/common';
import VideoPlayer from './videoPlayer';
import React, {useEffect, useState} from 'react';
import {PlayCircleFilledWhiteOutlined} from '@mui/icons-material';
import {useRouter} from 'next/router';
import {useFetchPublicGalleryAlbumContent} from '../../../services/cmsManagement/hooks';

const PREFIX = 'VideoDetails';

const classes = {
  customPlayer: `${PREFIX}-customPlayer`,
  playIcon: `${PREFIX}-playIcon`,
  customPlayerCard: `${PREFIX}-customPlayerCard`,
  playButtonText: `${PREFIX}-playButtonText`,
};

const StyledContainer = styled(Container)(() => ({
  [`& .${classes.customPlayer}`]: {
    width: '100%',
    height: '280px',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
  },

  [`& .${classes.playIcon}`]: {
    fontSize: '90px',
    position: 'absolute',
  },

  [`& .${classes.customPlayerCard}`]: {
    backgroundColor: '#b8c6db',
    backgroundImage: 'linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
  },

  [`& .${classes.playButtonText}`]: {
    position: 'absolute',
    color: 'rgb(134 145 46)',
    textShadow: '#437436 1px 1px',
  },
}));

const fbRegex1 = /\/videos\/([\w\-]*?)\//;
const fbRegex2 = /\/videos\/([\d]*?)\//;
const fbReplace = '/videos/';

const VideoDetails = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {videoId}: any = router.query;
  const {data: videoData, isLoading: isLoadingVideos} =
    useFetchPublicGalleryAlbumContent(videoId);

  console.log('videoData', videoData);
  const [videoUrl, setVideoUrl] = useState('');

  const [isOtherUrl, setIsOtherUrl] = useState(false);

  const getYoutubeUrl = (url: any) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    const id = match && match[2].length === 11 ? match[2] : null;

    return `https://www.youtube.com/embed/${id}`;
  };

  const getFacebookUrl = (url: any) => {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
      url.replace(
        fbRegex1,
        url.replace(fbRegex1, fbReplace) == url.replace(fbRegex2, fbReplace)
          ? '/videos/$1'
          : fbReplace,
      ),
    )}&width=500&height=280&show_text=false&appId`;
  };

  const getVimeoUrl = (url: any) => {
    const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
    const parsed = url.match(vimeoRegex);

    return '//player.vimeo.com/video/' + parsed[1];
  };

  useEffect(() => {
    if (videoData?.video_url) {
      const domain = new window.URL(videoData?.video_url);
      if (domain.host == 'www.youtube.com') {
        setVideoUrl(getYoutubeUrl(videoData?.video_url));
      } else if (domain.host == 'www.facebook.com') {
        setVideoUrl(getFacebookUrl(videoData?.video_url));
      } else if (domain.host == 'vimeo.com') {
        setVideoUrl(getVimeoUrl(videoData?.video_url));
      } else {
        setVideoUrl(videoData?.video_url);
        setIsOtherUrl(true);
      }
    }
  }, [videoData]);

  return (
    <StyledContainer maxWidth={'md'}>
      {isLoadingVideos ? (
        <Grid
          item
          xs={12}
          sx={{display: 'flex', justifyContent: 'space-evenly'}}>
          <Skeleton variant='rectangular' width={'22%'} height={140} />
        </Grid>
      ) : videoData && videoData?.length > 0 ? (
        <Grid container spacing={3} mt={2}>
          {!isOtherUrl ? (
            <Grid item xs={12}>
              <VideoPlayer url={videoUrl} />
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Card className={classes.customPlayerCard}>
                <a href={videoData.video_url} target='_blank' rel='noreferrer'>
                  <CardContent className={classes.customPlayer}>
                    <PlayCircleFilledWhiteOutlined
                      className={classes.playIcon}
                    />
                    <div className={classes.playButtonText}>
                      Click to Play in an external Player
                    </div>
                  </CardContent>
                </a>
              </Card>
            </Grid>
          )}
          <Grid item xs={12}>
            <H5>{videoData.title}</H5>
          </Grid>
          <Grid item xs={12} display={'flex'}>
            <div dangerouslySetInnerHTML={{__html: videoData.description}} />
          </Grid>
        </Grid>
      ) : (
        <Grid container mt={3}>
          <Grid item xs={12}>
            <H6>{messages['common.no_data_found']}</H6>
          </Grid>
        </Grid>
      )}
    </StyledContainer>
  );
};

export default VideoDetails;
