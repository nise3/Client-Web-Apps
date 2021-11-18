import React, {useState} from 'react';
import ImageCarousel from '../../@softbd/elements/display/ImageCarousel/ImageCarousel';
import {useFetchPublicSliders} from '../../services/cmsManagement/hooks';
import ShowInTypes from '../../@softbd/utilities/ShowInTypes';
import SingleImageBannerTemplate from './Components/SingleImageBannerTemplate';

const CoverArea = () => {
  const [sliderFilters] = useState({show_in: ShowInTypes.TSP});
  const {data: sliders} = useFetchPublicSliders(sliderFilters);
  const slider = sliders?.[0];
  const banners = slider?.banners;
  const NumberOfBanners = banners?.length;

  return NumberOfBanners == 1 ? (
    <SingleImageBannerTemplate banner={banners[0]} />
  ) : banners && NumberOfBanners > 1 ? (
    <ImageCarousel banners={banners} />
  ) : (
    <></>
  );
};

export default CoverArea;
