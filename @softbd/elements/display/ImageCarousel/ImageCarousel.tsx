import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, {ReactNode} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import {Box, Typography} from '@mui/material';

type Props = {
  children?: ReactNode;
  images: Array<string>;
  headings: Array<string>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageBox: {
      height: 500,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      display: 'flex',
    },
    image: {
      zIndex: -1,
      position: 'absolute',
      objectFit: 'cover',
      height: '100%',
      width: '100%',
    },
    heading: {
      color: theme.palette.background.paper,
      margin: '20px 40px',
      textAlign: 'center',
      flex: 1,
    },
  }),
);

const ImageCarousel = ({images, headings}: Props) => {
  const classes = useStyles();
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      beforeChange={()=>{
        console.log('beforeChange');
      }}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        /*desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 1
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 1
        }*/
        mobile: {
          breakpoint: {
            max: 99999999,//464,
            min: 0
          },
          items: 1
        },
      }}
      // showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {
        images.map((uri, i) => <Box key={i} className={classes.imageBox}>
          <img className={classes.image} alt="" src={uri}/>
          <Typography variant='h3' gutterBottom={true}>
            <Box fontWeight='fontWeightBold' mb={6} className={classes.heading}>
              {headings[i]}
            </Box>
          </Typography>
        </Box>)
      }
    </Carousel>
  );
};

export default React.memo(ImageCarousel);
