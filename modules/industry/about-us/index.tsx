import {Container} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {apiGet} from '../../../@softbd/common/api';
import {API_PUBLIC_STATIC_PAGE_BLOCKS} from '../../../@softbd/common/apiRoutes';
import {CONTENT_ID_ABOUT_US} from '../../../@softbd/utilities/StaticContentConfigs';

const PREFIX = 'AboutUs';

const classes = {
  youtubePlayer: `${PREFIX}-youtubePlayer`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.youtubePlayer}`]: {
    width: '100%',
    height: '253px',
  },
}));

const AboutUs = () => {
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGet(
          API_PUBLIC_STATIC_PAGE_BLOCKS + CONTENT_ID_ABOUT_US,
        );

        console.log('about us response: rrrr', res?.data?.data);
        if (res?.data?.data) {
          setContent(res.data.data?.content);
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <StyledContainer maxWidth='lg' sx={{marginTop: '20px'}}>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </StyledContainer>
  );
};

export default AboutUs;
