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
  [`& .editor-template-table`]: {
    [`& tr`]: {
      width: '100%',
    },
    [`& td`]: {
      width: '50%',
      paddingBottom: '15px',
      verticalAlign: 'top',
      wordBreak: 'break-all',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        paddingRight: '0',
        display: 'inline-block',
      },
    },
    [`& td h3`]: {
      fontSize: '40px',
      margin: '10px 0',
    },
    [`& td p`]: {
      lineHeight: '30px',
    },
    [`& td:first-of-type`]: {
      paddingRight: '20px',
    },
    [`& td:last-of-type`]: {
      paddingLeft: '20px',
    },
    [`& td>img`]: {
      height: '300px',
      width: '100%',
    },
    [`& td>iframe`]: {
      height: '300px',
      width: '100%',
    },
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
