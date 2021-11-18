import {Box, Button, CardMedia, Container, Typography} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import {Link} from '../../../@softbd/elements/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PREFIX = 'BannerTemplateCenterBackground';

const classes = {
  image: `${PREFIX}-image`,
  heading: `${PREFIX}-heading`,
  customLeftArrow: `${PREFIX}-customLeftArrow`,
  reactMultipleCarousalArrow: `${PREFIX}-reactMultipleCarousalArrow`,
};

const StyledBox = styled(Box)(({theme}) => ({
  height: 500,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  // pointerEvents: 'none',
  display: 'flex',

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
}));

interface BannerProps {
  banner: any;
}
const BannerTemplateCenterBackground = ({banner}: BannerProps) => {
  return (
    <StyledBox>
      <CardMedia
        component='img'
        image={banner?.banner_image_path}
        className={classes.image}
        alt={banner?.image_alt_title}
        title={banner?.title}
      />
      <Container maxWidth={'lg'}>
        <Typography variant='h3'>
          <Box fontWeight='fontWeightBold' mb={6} className={classes.heading}>
            {banner?.title}
          </Box>
        </Typography>
        {banner?.is_button_available ? (
          <Link
            href={banner?.link}
            passHref={true}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>
            <Button variant='contained' color={'primary'}>
              {banner?.button_text} <ArrowForwardIcon />
            </Button>
          </Link>
        ) : (
          ''
        )}
      </Container>
    </StyledBox>
  );
};

export default BannerTemplateCenterBackground;
