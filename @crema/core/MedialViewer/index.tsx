import React, {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Zoom from '@mui/material/Zoom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const PREFIX = 'MediaViewer';

const classes = {
  dialogRoot: `${PREFIX}-dialogRoot`,
  mediaViewerRoot: `${PREFIX}-mediaViewerRoot`,
  cancelBtn: `${PREFIX}-cancelBtn`,
  carouselRoot: `${PREFIX}-carouselRoot`,
};

const StyledDialog = styled(Dialog)(({theme}) => ({
  [`&.${classes.dialogRoot}`]: {
    position: 'relative',
    '& .MuiDialog-paperFullScreen': {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  [`& .${classes.mediaViewerRoot}`]: {
    position: 'relative',
    backgroundColor: 'rgb(49, 53, 65)',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  [`& .${classes.cancelBtn}`]: {
    color: theme.palette.common.white,
    position: 'absolute',
    left: 10,
    top: 10,
    zIndex: 1,
  },

  [`& .${classes.carouselRoot}`]: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 30,
    '& .slick-slide': {
      textAlign: 'center',
      position: 'relative',
      '& img': {
        width: 'auto !important',
        maxHeight: '96vh',
        height: 'auto !important',
      },
      '& > *': {
        positin: 'relative',
        zIndex: 9,
      },
    },
    '& .slick-dots': {
      bottom: 10,
    },
    '& .slick-dots li button:before, & .slick-dots li.slick-active button:before':
      {
        backgroundColor: theme.palette.background.paper,
      },
    '& .embed-responsive': {
      position: 'relative',
      display: 'block',
      width: '100%',
      padding: 0,
      overflow: 'hidden',
      '&:before': {
        content: '""',
        display: 'block',
        paddingTop: '30%',
      },
      '& embed, & iframe, & object, & video': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        border: 0,
      },
    },
    '& .slick-next': {
      right: 0,
    },
    '& .slick-prev': {
      left: 0,
    },
  },
}));

const settings: {
  dots: boolean;
  arrows: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  adaptiveHeight: boolean;
} = {
  dots: false,
  arrows: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
};

const renderRow = (data: any, index: number) => {
  if (data.metaData.type.startsWith('image')) {
    return (
      <img
        key={index}
        src={data.src}
        alt={data.name ? data.name : 'detail view'}
      />
    );
  } else {
    return (
      <Box className='embed-responsive'>
        <iframe
          key={index}
          src={data.src}
          title={data.name ? data.name : 'detail view'}
        />
      </Box>
    );
  }
};
const Transition = React.forwardRef(function Transition(props: any, ref: any) {
  return <Zoom ref={ref} {...props} />;
});

interface MediaViewerProps {
  index: number;
  medias: any;
  onClose: () => void;
}

const MediaViewer: React.FC<MediaViewerProps> = ({index, medias, onClose}) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (index > -1) setOpen(true);
    else {
      setOpen(false);
    }
  }, [index]);

  return (
    <StyledDialog
      fullScreen
      open={isOpen}
      onClose={onClose}
      className={classes.dialogRoot}
      TransitionComponent={Transition}>
      <Box className={classes.mediaViewerRoot}>
        <IconButton
          className={classes.cancelBtn}
          onClick={onClose}
          size='large'>
          <HighlightOffIcon />
        </IconButton>
        {index >= 0 ? (
          <Box className={classes.carouselRoot}>
            <Slider
              // @ts-ignore
              settings={{...settings, initialSlide: index}}
              slickGoTo={index}
              containerStyle={{width: '100%'}}>
              {medias.map((data: any, index: number) => renderRow(data, index))}
            </Slider>
          </Box>
        ) : null}
      </Box>
    </StyledDialog>
  );
};

export default MediaViewer;
