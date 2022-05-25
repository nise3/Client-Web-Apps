import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Button, Container, Grid, Skeleton} from '@mui/material';
import {Fade, Zoom} from 'react-awesome-reveal';
import {H1, Link} from '../../@softbd/elements/common';
import {
  BLOCK_ID_MIGRATION_PORTAL_DETAILS,
  CONTENT_ID_MIGRATION_PORTAL_DETAILS,
} from '../../@softbd/utilities/StaticContentConfigs';
import ContentTypes from '../dashboard/recentActivities/ContentTypes';
import {getEmbeddedVideoUrl} from '../../@softbd/utilities/helpers';
import PageBlockTemplateTypes from '../../@softbd/utilities/PageBlockTemplateTypes';
import {LINK_MIGRATION_PORTAL_FRONTEND_STATIC_CONTENT} from '../../@softbd/common/appLinks';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NoDataFoundComponent from '../youth/common/NoDataFoundComponent';
import {useFetchStaticPageBlock} from '../../services/cmsManagement/hooks';
import CardMediaImageView from '../../@softbd/elements/display/ImageView/CardMediaImageView';

const PREFIX = 'AboutSection';

const classes = {
  root: `${PREFIX}-root`,
  heading: `${PREFIX}-heading`,
  desc: `${PREFIX}-desc`,
  detailsButton: `${PREFIX}-detailsButton`,
  assessmentImage: `${PREFIX}-assessmentImage`,
  youtubePlayerBox: `${PREFIX}-youtubePlayerBox`,
  youtubePlayerMobileView: `${PREFIX}-youtubePlayerMobileView`,
  youtubePlayer: `${PREFIX}-youtubePlayer`,
  imageView: `${PREFIX}-imageView`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  [`&.${classes.root}`]: {
    position: 'relative',
    padding: '50px',
    background: theme.palette.grey[200],
    color: theme.palette.text.primary,
    marginTop: '60px',
    [theme.breakpoints.up('md')]: {
      marginTop: '150px',
    },
  },

  [`& .${classes.heading}`]: {
    color: theme.palette.primary.main,
    fontSize: '2.25rem',
    fontWeight: 'bold',
  },

  [`& .${classes.desc}`]: {
    color: theme.palette.text.primary,
  },

  [`& .${classes.detailsButton}`]: {
    background: '#fff',
    color: '#682988',
  },

  [`& .${classes.assessmentImage}`]: {
    height: '340px',
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
    height: '420px',
    borderRadius: '15px',
    marginTop: '-150px',
    width: '20rem',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  [`& .${classes.imageView}`]: {
    height: '420px',
    borderRadius: '15px',
    marginTop: '-150px',
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

const AboutSection = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [templateConfig, setTemplateConfig] = useState<any>({
    textLeft: true,
  });

  const [staticPageParams] = useState<any>({});

  const {data: blockData, isLoading} = useFetchStaticPageBlock(
      BLOCK_ID_MIGRATION_PORTAL_DETAILS,
    staticPageParams,
  );

  useEffect(() => {
    if (blockData) {
      if (
        blockData.attachment_type != ContentTypes.IMAGE &&
        blockData?.video_url
      ) {
        const embeddedUrl = getEmbeddedVideoUrl(blockData?.video_url);
        setVideoUrl(embeddedUrl);
      }

      if (blockData.template_code == PageBlockTemplateTypes.PBT_RL) {
        setTemplateConfig({
          textLeft: false,
        });
      } else if (blockData.template_code == PageBlockTemplateTypes.PBT_LR) {
        setTemplateConfig({
          textLeft: true,
        });
      }
    }
  }, [blockData]);

  return (
    <StyledGrid container xl={12} className={classes.root}>
      {isLoading ? (
        <Skeleton variant={'rectangular'} width={'100%'} height={400} />
      ) : blockData ? (
        <Container maxWidth='lg'>
          <Grid
            container
            spacing={4}
            justifyContent='space-around'
            alignItems='center'>
            <Grid
              item
              xs={12}
              md={7}
              order={{xs: templateConfig.textLeft ? 1 : 2}}>
              <Fade direction='down'>
                <H1 gutterBottom={true} className={classes.heading}>
                  {blockData?.title}
                </H1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: blockData?.content,
                  }}
                />

                {blockData?.is_button_available == 1 ? (
                  <Link
                    href={
                        LINK_MIGRATION_PORTAL_FRONTEND_STATIC_CONTENT +
                        CONTENT_ID_MIGRATION_PORTAL_DETAILS
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
                      <CardMediaImageView
                        className={classes.imageView}
                        image={blockData?.image_path}
                        alt={
                          blockData?.image_alt_title
                            ? blockData?.image_alt_title
                            : blockData?.title
                        }
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
      ) : (
        <Grid container sx={{marginTop: '-35px'}}>
          <NoDataFoundComponent messageTextType={'h6'} />
        </Grid>
      )}
    </StyledGrid>
  );
};

export default AboutSection;
