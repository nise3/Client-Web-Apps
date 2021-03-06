import {Box} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';

const PREFIX = 'LandingBannerTemplateCenterBackground';

const classes = {
  image: `${PREFIX}-image`,
};

const StyledBox = styled(Box)(({theme}) => ({
  height: 400,
  width: '100%',
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  zIndex: 0,
  [theme.breakpoints.up('xl')]: {
    height: 550,
  },
  [theme.breakpoints.down('sm')]: {
    height: 150,
  },
  [theme.breakpoints.only('sm')]: {
    height: 300,
  },

  [`& .${classes.image}`]: {
    zIndex: -1,
    objectFit: 'unset',
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
}));

interface BannerProps {
  banner: any;
}

const LandingBannerTemplateCenterBackground = ({banner}: BannerProps) => {
  return (
    <StyledBox>
      <CardMediaImageView
        image={banner?.banner_image_path}
        className={classes.image}
        alt={banner?.image_alt_title ? banner?.image_alt_title : banner?.title}
        title={banner?.title}
      />
    </StyledBox>
  );
};

export default LandingBannerTemplateCenterBackground;
