import {Button, CardMedia, Container, Grid, Typography} from '@mui/material';
import React from 'react';
import {styled} from '@mui/material/styles';
import {Link} from '../../../@softbd/elements/common';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PREFIX = 'BannerTemplateCenterBackground';

const classes = {
  image: `${PREFIX}-image`,
  heading: `${PREFIX}-heading`,
};

const StyledGrid = styled(Grid)(({theme}) => ({
  height: 400,
  width: '100%',
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',

  [`& .${classes.image}`]: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },

  [`& .${classes.heading}`]: {
    color: theme.palette.background.default,
    margin: '20px 40px',
    flex: 1,
  },
}));

interface BannerProps {
  banner: any;
}

const LandingBannerTemplateLeftRight = ({banner}: BannerProps) => {
  return (
    <StyledGrid container>
      <Grid item xs={12} md={6} sx={{height: '100%'}}>
        <CardMedia
          component='img'
          image={banner?.banner_image_path}
          className={classes.image}
          alt={banner?.alt_image_title}
          title={banner?.title}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{display: 'flex', alignItems: 'center', height: '100%'}}>
        <Container maxWidth={'lg'}>
          <Typography
            variant='h3'
            fontWeight={'bold'}
            mb={6}
            className={classes.heading}>
            {banner?.title}
          </Typography>

          <Typography
            variant={'h4'}
            fontWeight={'bold'}
            mb={6}
            className={classes.heading}>
            {banner?.sub_title}
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
    </StyledGrid>
  );
};

export default LandingBannerTemplateLeftRight;