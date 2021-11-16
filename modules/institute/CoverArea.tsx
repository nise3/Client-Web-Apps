import React, {useState} from 'react';
import ImageCarousel from '../../@softbd/elements/display/ImageCarousel/ImageCarousel';
import {useFetchPublicSliders} from '../../services/cmsManagement/hooks';
import ShowInTypes from '../../@softbd/utilities/ShowInTypes';
import BannerTemplateCenterBackground from './Components/BannerTemplateCenterBackground';

const CoverArea = () => {
  const [sliderFilters] = useState({show_in: ShowInTypes.TSP, institute_id: 8});
  const {data: sliders} = useFetchPublicSliders(sliderFilters);
  const slider = sliders?.[0];
  const banners = slider?.banners;
  const NumberOfBanners = banners?.length;
  console.log('banners', banners);

  return NumberOfBanners == 1 ? (
    <BannerTemplateCenterBackground banner={banners[0]} />
  ) : banners && NumberOfBanners > 1 ? (
    <ImageCarousel banners={banners} />
  ) : (
    <></>
  );
};

export default CoverArea;
