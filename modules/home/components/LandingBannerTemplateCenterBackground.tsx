import {Box, Typography} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import {SeeMoreLinkButton} from '../../../@softbd/elements/common';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';
import {useIntl} from 'react-intl';

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
  const {messages} = useIntl();
  return (
    <StyledBox>
      <CardMediaImageView
        image={banner?.banner_image_path}
        className={classes.image}
        alt={banner?.image_alt_title ? banner?.image_alt_title : banner?.title}
        title={banner?.title}
      />
      <Box sx={{margin: 'auto'}}>
        <Typography variant='h3' className={classes.heading}>
          {banner?.title}
        </Typography>
        {banner?.is_button_available ? (
          <SeeMoreLinkButton
            href={banner?.link}
            label={messages['common.see_more'] as string}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
            variant='contained'
            color={'primary'}
          />
        ) : (
          ''
        )}
      </Box>
    </StyledBox>
  );
};

export default LandingBannerTemplateCenterBackground;
