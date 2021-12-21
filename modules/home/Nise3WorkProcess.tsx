import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, CardMedia, Container, Grid} from '@mui/material';
import {Fade, Zoom} from 'react-awesome-reveal';
import {H3, Link} from '../../@softbd/elements/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {getPublicStaticPageOrBlockByPageCode} from '../../services/cmsManagement/StaticPageService';
import {
  BLOCK_ID_HOW_NISE3_WORKS,
  CONTENT_ID_HOW_NISE3_WORKS,
} from '../../@softbd/utilities/StaticContentConfigs';
import ShowInTypes from '../../@softbd/utilities/ShowInTypes';
import ContentTypes from '../dashboard/recentActivities/ContentTypes';
import {getEmbeddedVideoUrl} from '../../@softbd/utilities/helpers';
import {LINK_NICE3_FRONTEND_STATIC_CONTENT} from '../../@softbd/common/appLinks';
import PageBlockTemplateTypes from '../../@softbd/utilities/PageBlockTemplateTypes';

const PREFIX = 'Nise3WorkProcess';

const classes = {
  detailsButton: `${PREFIX}-detailsButton`,
  youtubePlayerMobileView: `${PREFIX}-youtubePlayerMobileView`,
  youtubePlayer: `${PREFIX}-youtubePlayer`,
  imageView: `${PREFIX}-imageView`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  padding: '50px',
  background: theme.palette.primary.main,
  color: '#fff',
  [theme.breakpoints.up('sm')]: {
    marginTop: '200px',
  },
  [theme.breakpoints.down('xl')]: {
    marginTop: '150px',
  },

  [`& .${classes.detailsButton}`]: {
    color: theme.palette.primary.main,
    background: '#fff',
    '& svg': {
      paddingLeft: '5px',
    },
  },

  [`& .${classes.youtubePlayerMobileView}`]: {
    height: '300px',
    borderRadius: '15px',
    bottom: '80px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  [`& .${classes.youtubePlayer}`]: {
    height: '300px',
    borderRadius: '15px',
    marginTop: '-160px',
    width: '20rem',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  [`& .${classes.imageView}`]: {
    height: '300px',
    borderRadius: '15px',
    marginTop: '-160px',
    width: '20rem',
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      marginTop: '0px',
      width: '100%',
    },
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const Nise3WorkProcess = () => {
  const [blockData, setBlockData] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [templateConfig, setTemplateConfig] = useState<any>({
    textLeft: true,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getPublicStaticPageOrBlockByPageCode(
          BLOCK_ID_HOW_NISE3_WORKS,
          {
            show_in: ShowInTypes.NICE3,
          },
        );

        if (response && response.data) {
          const data = response.data;
          setBlockData(data);

          if (data.attachment_type != ContentTypes.IMAGE && data?.video_url) {
            const embeddedUrl = getEmbeddedVideoUrl(data?.video_url);
            setVideoUrl(embeddedUrl);
          }

          if (data.template_code == PageBlockTemplateTypes.PBT_RL) {
            setTemplateConfig({
              textLeft: false,
            });
          } else if (data.template_code == PageBlockTemplateTypes.PBT_LR) {
            setTemplateConfig({
              textLeft: true,
            });
          }
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <>
      {blockData ? (
        <StyledGrid container xl={12}>
          <Container maxWidth='lg' style={{position: 'relative'}}>
            <Grid container justifyContent='space-between'>
              <Grid
                item
                xs={12}
                md={6}
                py={{xs: 3, md: 5}}
                order={{xs: templateConfig.textLeft ? 1 : 2}}>
                <Fade direction='down'>
                  <H3 style={{fontSize: '2.75rem', fontWeight: 'bold'}}>
                    {blockData?.title}
                  </H3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blockData?.content,
                    }}
                  />

                  {blockData?.is_button_available == 1 ? (
                    <Link
                      href={
                        LINK_NICE3_FRONTEND_STATIC_CONTENT +
                        CONTENT_ID_HOW_NISE3_WORKS
                      }>
                      <Button
                        variant='contained'
                        className={classes.detailsButton}>
                        {blockData?.button_text}
                        <ArrowForwardIcon />
                      </Button>
                    </Link>
                  ) : (
                    <Box />
                  )}
                </Fade>
              </Grid>

              {blockData?.is_attachment_available == 1 && (
                <Grid
                  item
                  xs={12}
                  md={4}
                  order={{xs: templateConfig.textLeft ? 2 : 1}}>
                  {blockData.attachment_type == ContentTypes.IMAGE &&
                    blockData.image_path && (
                      <Zoom>
                        <CardMedia
                          component={'img'}
                          className={classes.imageView}
                          image={blockData.image_path}
                          alt={blockData?.image_alt_title}
                        />
                      </Zoom>
                    )}

                  {blockData.attachment_type != ContentTypes.IMAGE && videoUrl && (
                    <Zoom>
                      <iframe
                        className={classes.youtubePlayerMobileView}
                        src={videoUrl}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                        title='Embedded youtube'
                      />
                      <iframe
                        className={classes.youtubePlayer}
                        src={videoUrl}
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                        allowFullScreen
                        title='Embedded youtube'
                      />
                    </Zoom>
                  )}
                </Grid>
              )}
            </Grid>
          </Container>
        </StyledGrid>
      ) : (
        <></>
      )}
    </>
  );
};

export default Nise3WorkProcess;
