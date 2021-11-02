import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {Box, Button, Container, Grid} from '@mui/material';
import {ArrowRightAlt} from '@mui/icons-material';
import {Fade} from 'react-awesome-reveal';
import UnderlinedHeading from './UnderlinedHeading';
import Carousel from 'react-multi-carousel';
import {useFetchInstitutesGallery} from '../../services/instituteManagement/hooks';
import GalleryItemCardView from './gallery/GalleryItemCardView';
import {H6, Link} from '../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {useIntl} from 'react-intl';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    boxItem: {
      background: theme.palette.background.paper,
      borderRadius: 4 * parseInt(theme.shape.borderRadius.toString()),
      padding: '20px 15px 60px 15px',
      margin: 0,
      [theme.breakpoints.down('xl')]: {
        padding: '20px 10px 60px 10px',
      },
    },
    button: {
      borderRadius: 20,
    },
  }),
);

const GallerySection = () => {
  const classes = useStyles();
  const {messages} = useIntl();
  const {data: galleryItems} = useFetchInstitutesGallery();
  const router = useRouter();
  const path = router.pathname;

  return (
    <Container maxWidth='lg'>
      <Grid container mt={{xs: 5}}>
        <Grid item xs={12}>
          <Fade direction='up'>
            <UnderlinedHeading>{messages['common.gallery']}</UnderlinedHeading>
            {galleryItems && galleryItems.length ? (
              <Box>
                <Box>
                  <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=''
                    containerClass='container-with-dots'
                    dotListClass=''
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass=''
                    keyBoardControl
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={{
                      desktop: {
                        breakpoint: {
                          max: 3000,
                          min: 1024,
                        },
                        items: 4,
                        partialVisibilityGutter: 40,
                      },
                      mobile: {
                        breakpoint: {
                          max: 464,
                          min: 0,
                        },
                        items: 1,
                        partialVisibilityGutter: 30,
                      },
                      tablet: {
                        breakpoint: {
                          max: 1024,
                          min: 464,
                        },
                        items: 2,
                        partialVisibilityGutter: 30,
                      },
                    }}
                    // showDots={true}
                    sliderClass=''
                    slidesToSlide={1}
                    swipeable>
                    {galleryItems.map((v: any, i: number) => (
                      <Box key={i} className={classes.boxItem}>
                        <GalleryItemCardView item={v} />
                      </Box>
                    ))}
                  </Carousel>
                </Box>
                <Box display='flex' justifyContent='center'>
                  <Link href={`${path}/gallery`}>
                    <Button
                      variant='outlined'
                      size='large'
                      endIcon={<ArrowRightAlt />}
                      className={classes.button}>
                      {messages['common.see_more']}
                    </Button>
                  </Link>
                </Box>
              </Box>
            ) : (
              <H6>{messages['common.no_data_found']}</H6>
            )}
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
};
export default GallerySection;
