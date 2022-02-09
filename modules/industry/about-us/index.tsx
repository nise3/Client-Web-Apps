import {Container, Skeleton} from '@mui/material';
import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {CONTENT_ID_ABOUT_US} from '../../../@softbd/utilities/StaticContentConfigs';
import {useFetchStaticPageBlock} from '../../../services/cmsManagement/hooks';
import NoDataFoundComponent from '../../youth/common/NoDataFoundComponent';

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
      wordBreak: 'break-word',
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
  const [staticPageParams] = useState<any>({});

  const {data: blockData, isLoading} = useFetchStaticPageBlock(
    CONTENT_ID_ABOUT_US,
    staticPageParams,
  );

  return (
    <StyledContainer maxWidth='lg' sx={{marginTop: '20px'}}>
      {isLoading ? (
        <Skeleton variant='rectangular' width={'100%'} height={250} />
      ) : blockData ? (
        <div
          dangerouslySetInnerHTML={{
            __html: blockData?.content,
          }}
        />
      ) : (
        <NoDataFoundComponent />
      )}
    </StyledContainer>
  );
};

export default AboutUs;
