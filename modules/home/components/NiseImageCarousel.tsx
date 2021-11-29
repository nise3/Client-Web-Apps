import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, {ReactNode} from 'react';
import LandingBannerTemplateCenterBackground from './LandingBannerTemplateCenterBackground';
import LandingBannerTemplateRightLeft from './LandingBannerTemplateRightLeft';
import LandingBannerTemplateLeftRight from './LandingBannerTemplateLeftRight';

type Props = {
  children?: ReactNode;
  banners: Array<any>;
};

const NiseImageCarousel = ({banners}: Props) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay={true}
      autoPlaySpeed={3000}
      beforeChange={() => {
        console.log('beforeChange');
      }}
      centerMode={false}
      className=''
      containerClass='container'
      dotListClass=''
      draggable
      focusOnSelect={true}
      infinite
      itemClass=''
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={true}
      renderDotsOutside={false}
      responsive={{
        mobile: {
          breakpoint: {
            max: 99999999, //464,
            min: 0,
          },
          items: 1,
        },
      }}
      sliderClass=''
      slidesToSlide={1}
      swipeable>
      {banners &&
        banners?.length &&
        banners.map((banner: any) => {
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
        })}
    </Carousel>
  );
};

export default React.memo(NiseImageCarousel);
