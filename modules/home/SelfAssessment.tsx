import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import {Button, CardMedia, Container, Grid} from '@mui/material';
import {Zoom} from 'react-awesome-reveal';
import {H3, Link} from '../../@softbd/elements/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  BLOCK_ID_SELF_ASSESSMENT,
  CONTENT_ID_SELF_ASSESSMENT,
} from '../../@softbd/utilities/StaticContentConfigs';
import {LINK_NICE3_FRONTEND_STATIC_CONTENT} from '../../@softbd/common/appLinks';
import ContentTypes from '../dashboard/recentActivities/ContentTypes';
import {getEmbeddedVideoUrl} from '../../@softbd/utilities/helpers';
import ShowInTypes from '../../@softbd/utilities/ShowInTypes';
import {getPublicStaticPageOrBlockByPageCode} from '../../services/cmsManagement/StaticPageService';
import PageBlockTemplateTypes from '../../@softbd/utilities/PageBlockTemplateTypes';

const PREFIX = 'SelfAssessment';

const classes = {
  detailsButton: `${PREFIX}-detailsButton`,
};

const StyledContainer = styled(Container)(({theme}) => ({
  [`& .${classes.detailsButton}`]: {
    '& svg': {
      paddingLeft: '5px',
    },
  },
}));

const SelfAssessment = () => {
  const [blockData, setBlockData] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [templateConfig, setTemplateConfig] = useState<any>({
    textLeft: true,
    imageOrVideoLeft: false,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await getPublicStaticPageOrBlockByPageCode(
          BLOCK_ID_SELF_ASSESSMENT,
          {
            show_in: ShowInTypes.NICE3,
          },
        );

        if (response && response.data) {
          const data = response.data;
          setBlockData({
            ...data,
            ...{
              image_path: '/images/self-assessment.png',
            },
          });

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
        <StyledContainer maxWidth={'lg'}>
          <Grid
            container
            spacing={4}
            sx={{marginTop: '114px'}}
            alignItems={'center'}>
            <Grid
              item
              xs={12}
              md={8}
              order={{xs: templateConfig.textLeft ? 1 : 2}}>
              <H3 style={{fontSize: '44px', fontWeight: 'bold'}}>
                {blockData?.title}
              </H3>
              <div
                dangerouslySetInnerHTML={{
                  __html: blockData?.content,
                }}
              />

              {blockData?.is_button_available == 1 && (
                <Link
                  href={
                    LINK_NICE3_FRONTEND_STATIC_CONTENT +
                    CONTENT_ID_SELF_ASSESSMENT
                  }>
                  <Button variant='contained' className={classes.detailsButton}>
                    {blockData?.button_text}
                    <ArrowForwardIcon />
                  </Button>
                </Link>
              )}
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
                        image={blockData.image_path}
                        alt={blockData?.image_alt_title}
                      />
                    </Zoom>
                  )}

                {blockData.attachment_type != ContentTypes.IMAGE && videoUrl && (
                  <Zoom>
                    <iframe
                      width='100%'
                      height='230'
                      style={{
                        borderRadius: '15px',
                      }}
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
        </StyledContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default SelfAssessment;
