import {useIntl} from 'react-intl';
import {Container, Grid} from '@mui/material';
import {H3, H5} from '../../../@softbd/elements/common';
import VideoPlayer from './videoPlayer';
import {useEffect, useState} from 'react';

const fbRegex1 = /\/videos\/([\w\-]*?)\//;
const fbRegex2 = /\/videos\/([\d]*?)\//;
const fbReplace = '/videos/';

const data = {
  id: 1,
  title: 'This is testing video',
  // video_url: 'https://www.youtube.com/watch?v=NLPuCclm5lA',
  // video_url: 'https://www.facebook.com/WoodyandKleiny/videos/2241556282743322/',
  // video_url:
  //   'https://www.facebook.com/WoodyandKleiny/videos/8-more-videos-that-will-make-you-laugh/2241556282743322/',
  video_url: 'https://vimeo.com/22439234',
  description: 'Video description testing',
};

const VideoDetails = () => {
  const {messages} = useIntl();

  const [videoUrl, setVideoUrl] = useState('');

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
    const domain = new window.URL(data.video_url);
    console.log('domain', domain.host);
    if (domain.host == 'www.youtube.com') {
      setVideoUrl(getYoutubeUrl(data.video_url));
    }

    if (domain.host == 'www.facebook.com') {
      setVideoUrl(getFacebookUrl(data.video_url));
    }

    if (domain.host == 'vimeo.com') {
      setVideoUrl(getVimeoUrl(data.video_url));
    }
  }, [videoUrl]);

  return (
    <Container maxWidth={'md'}>
      {data && data.video_url ? (
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
            <VideoPlayer url={videoUrl} />
          </Grid>
          <Grid item xs={12}>
            <H5>{data.title}</H5>
          </Grid>
          <Grid item xs={12} display={'flex'}>
            <div dangerouslySetInnerHTML={{__html: data.description}} />
          </Grid>
        </Grid>
      ) : (
        <Grid container mt={3}>
          <Grid item xs={12}>
            <H3>{messages['common.no_data_found']}</H3>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default VideoDetails;
