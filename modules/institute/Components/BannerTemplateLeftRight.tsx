import {Button, CardMedia, Container, Grid, Typography} from '@mui/material';
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

const StyledGrid = styled(Grid)(({theme}) => ({
  height: 500,
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  display: 'flex',

  [`& .${classes.image}`]: {
    zIndex: -1,
    position: 'absolute',
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  [`& .${classes.heading}`]: {
    color: theme.palette.primary.dark,
    margin: '20px 40px',
    textAlign: 'center',
    flex: 1,
  },
}));

interface BannerProps {
  banner: any;
}
const BannerTemplateLeftRight = ({banner}: BannerProps) => {
  return (
    <StyledGrid container>
      <Grid item xs={12} md={6}>
        <Container maxWidth={'lg'}>
          <Typography
            variant='h4'
            fontWeight={'bold'}
            mb={6}
            className={classes.heading}>
            {banner?.title}
          </Typography>

          <Typography
            variant={'h5'}
            fontWeight={'bold'}
            mb={6}
            className={classes.heading}>
            {banner?.sub_title + '#85858'}
          </Typography>

          {banner?.is_button_available ? (
            <Link
              href={banner?.link}
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
      </Grid>
      <Grid item xs={12} md={6}>
        <CardMedia
          component='img'
          image={banner?.banner_image_url}
          alt={banner?.alt_image_title}
          title={banner?.title}
        />
      </Grid>
    </StyledGrid>
  );
};

export default BannerTemplateLeftRight;
