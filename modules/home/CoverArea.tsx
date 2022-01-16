import React, {useState} from 'react';
import {styled} from '@mui/material/styles';
import {Box, Container, Grid, Skeleton} from '@mui/material';
import {Slide} from 'react-awesome-reveal';
import SearchBox from './SearchBox';
import TrendSearchItemList from './TrendSearchItemList';
import {H6} from '../../@softbd/elements/common';
import {useIntl} from 'react-intl';
import ShowInTypes from '../../@softbd/utilities/ShowInTypes';
import {useFetchPublicSliders} from '../../services/cmsManagement/hooks';
import LandingBannerTemplateCenterBackground from './components/LandingBannerTemplateCenterBackground';
import LandingBannerTemplateRightLeft from './components/LandingBannerTemplateRightLeft';
import LandingBannerTemplateLeftRight from './components/LandingBannerTemplateLeftRight';
import NiseImageCarousel from './components/NiseImageCarousel';

const PREFIX = 'CoverArea';

const classes = {
  root: `${PREFIX}-root`,
  trendWrapper: `${PREFIX}-trendWrapper`,
};

const StyledBox = styled(Box)(({theme}) => ({
  [`& .${classes.root}`]: {
    color: '#fff',
    background:
      'linear-gradient(152deg, rgba(5, 99, 7, 1) 0%, rgb(108 95 9) 51%, rgb(100 89 15) 74%)',
  },

  [`& .${classes.trendWrapper}`]: {
    position: 'relative',
    background: '#ddd',
  },
}));

const getBannerTemplate = (banner: any) => {
  switch (banner?.banner_template_code) {
    case 'BT_CB':
      return <LandingBannerTemplateCenterBackground banner={banner} />;
    case 'BT_RL':
      return <LandingBannerTemplateRightLeft banner={banner} />;
    case 'BT_LR':
      return <LandingBannerTemplateLeftRight banner={banner} />;
    default:
      return <LandingBannerTemplateCenterBackground banner={banner} />;
  }
};

const CoverArea = () => {
  const {messages} = useIntl();

  const [sliderFilters] = useState({
    show_in: ShowInTypes.NICE3,
  });

  const {data: sliders, isLoading: isLoadingSliders} =
    useFetchPublicSliders(sliderFilters);
  const slider = sliders?.[0];
  const banners = slider?.banners;
  const numberOfBanners = banners?.length;

  return (
    <StyledBox sx={{position: 'relative'}}>
      <Box className={classes.root}>
        {isLoadingSliders ? (
          <Skeleton variant={'rectangular'} width={'100%'} height={400} />
        ) : banners && numberOfBanners == 1 ? (
          getBannerTemplate(banners[0])
        ) : banners && numberOfBanners > 1 ? (
          <NiseImageCarousel banners={banners} />
        ) : (
          <></>
        )}
      </Box>
      <Grid container className={classes.trendWrapper}>
        <Grid item xs={12} mt={2}>
          <Slide direction='down'>
            <Container maxWidth={'lg'}>
              <Grid
                container
                display={'block'}
                alignItems={'center'}
                height='180px'>
                <SearchBox />
                <H6 mr={2} mt={2}>
                  {messages['nise.trend_search']}
                </H6>
                <TrendSearchItemList
                  searchItems={[
                    messages['nise.graphics_design'],
                    messages['nise.web_design'],
                    messages['nise.ui_ux'],
                    messages['nise.health_care'],
                  ]}
                />
              </Grid>
            </Container>
          </Slide>
        </Grid>
      </Grid>
    </StyledBox>
  );
};

export default CoverArea;
