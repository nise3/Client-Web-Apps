import {Box, Button, CardMedia, Typography} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import {Link} from '../../../@softbd/elements/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PREFIX = 'LandingBannerTemplateCenterBackground';

const classes = {
  image: `${PREFIX}-image`,
  heading: `${PREFIX}-heading`,
};

const StyledBox = styled(Box)(({theme}) => ({
  height: 400,
  width: '100%',
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',

  [`& .${classes.image}`]: {
    zIndex: -1,
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },

  [`& .${classes.heading}`]: {
    color: theme.palette.background.paper,
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
  },
}));

interface BannerProps {
  banner: any;
}

const LandingBannerTemplateCenterBackground = ({banner}: BannerProps) => {
  return (
    <StyledBox>
      <CardMedia
        component='img'
        image={banner?.banner_image_path}
        className={classes.image}
        alt={banner?.image_alt_title}
        title={banner?.title}
      />
      <Box sx={{margin: 'auto'}}>
        <Typography variant='h3' className={classes.heading}>
          {banner?.title}
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
      </Box>
    </StyledBox>
  );
};

export default LandingBannerTemplateCenterBackground;
