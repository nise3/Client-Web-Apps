import Carousel from 'react-multi-carousel';
import {styled} from '@mui/material/styles';
import 'react-multi-carousel/lib/styles.css';
import React, {ReactNode} from 'react';
import {Box, CardMedia, Container, Typography} from '@mui/material';
import {rgba} from 'polished';

const PREFIX = 'ImageCarousel';

const classes = {
  imageBox: `${PREFIX}-imageBox`,
  image: `${PREFIX}-image`,
  heading: `${PREFIX}-heading`,
  customLeftArrow: `${PREFIX}-customLeftArrow`,
  reactMultipleCarousalArrow: `${PREFIX}-reactMultipleCarousalArrow`,
};

const StyledCarousel = styled(Carousel)(({theme}) => ({
  [`& .${classes.imageBox}`]: {
    height: 500,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    display: 'flex',
  },

  [`& .${classes.image}`]: {
    zIndex: -1,
    position: 'absolute',
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  [`& .${classes.heading}`]: {
    color: theme.palette.background.paper,
    margin: '20px 40px',
    textAlign: 'center',
    flex: 1,
  },

  [`& .${classes.customLeftArrow}`]: {
    left: 'calc(8.5% +1px)',
  },

  [`& .${classes.reactMultipleCarousalArrow}`]: {
    position: 'absolute',
    outline: 0,
    transition: 'all .5s',
    borderRadius: '35px',
    zIndex: 1000,
    border: 0,
    background: rgba(0, 0, 0, 0.5),
    minWidth: '43px',
    minHeight: '43px',
    opacity: 1,
    cursor: 'pointer',
  },
}));

type Props = {
  children?: ReactNode;
  images: Array<string>;
  headings: Array<string>;
};

const ImageCarousel = ({images, headings}: Props) => {
  // const customLeftArrow = useCallback(() => {

  //
  //   return (
  //     <button
  //       aria-label='Go to previous slide'
  //       className={clsx(
  //         classes.reactMultipleCarousalArrow,
  //         classes.customLeftArrow,
  //       )}
  //       type='button'
  //     />
  //   );
  // }, []);

  return (
    <StyledCarousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      beforeChange={() => {
        console.log('beforeChange');
      }}
      centerMode={false}
      className=''
      containerClass='container'
      dotListClass=''
      draggable
      focusOnSelect={false}
      infinite
      itemClass=''
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      // customLeftArrow={customLeftArrow()}
      responsive={{
        // desktop: {
        //   breakpoint: {
        //     max: 3000,
        //     min: 1024,
        //   },
        //   items: 1,
        // },
        // tablet: {
        //   breakpoint: {
        //     max: 1024,
        //     min: 464,
        //   },
        //   items: 1,
        // },
        mobile: {
          breakpoint: {
            max: 99999999, //464,
            min: 0,
          },
          items: 1,
        },
      }}
      // showDots
      sliderClass=''
      slidesToSlide={1}
      swipeable>
      {images.map((uri: string, i: number) => (
        <Box key={i} className={classes.imageBox}>
          <CardMedia
            component='img'
            image={uri}
            className={classes.image}
            alt={headings[i]}
            title={headings[i]}
          />
          <Container maxWidth={'lg'}>
            <Typography variant='h3'>
              <Box
                fontWeight='fontWeightBold'
                mb={6}
                className={classes.heading}>
                {headings[i]}
              </Box>
            </Typography>
          </Container>
        </Box>
      ))}
    </StyledCarousel>
  );
};

export default React.memo(ImageCarousel);
