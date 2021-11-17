import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import React, {ReactNode} from 'react';
import BannerTemplateCenterBackground from '../../../../modules/institute/Components/BannerTemplateCenterBackground';
import BannerTemplateLeftRight from '../../../../modules/institute/Components/BannerTemplateLeftRight';
import BannerTemplateRightLeft from '../../../../modules/institute/Components/BannerTemplateRightLeft';

type Props = {
  children?: ReactNode;
  banners: Array<any>;
};

const ImageCarousel = ({banners}: Props) => {
  console.log('banners', banners);
  // const customLeftArrow = useCallback(() => {

  //
  //   return (
  //     <button
  //       aria-label='Go to previous slide'
  //       className={clsx(
  //         classes.reactMultipleCarousalArrow,
  //         classes.customLeftArrow,
  //       )}
  //       type='button'
  //     />
  //   );
  // }, []);

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
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
      // customLeftArrow={customLeftArrow()}
      responsive={{
        // desktop: {
        //   breakpoint: {
        //     max: 3000,
        //     min: 1024,
        //   },
        //   items: 1,
        // },
        // tablet: {
        //   breakpoint: {
        //     max: 1024,
        //     min: 464,
        //   },
        //   items: 1,
        // },
        mobile: {
          breakpoint: {
            max: 99999999, //464,
            min: 0,
          },
          items: 1,
        },
      }}
      // showDots
      sliderClass=''
      slidesToSlide={1}
      swipeable>
      {banners &&
        banners?.length &&
        banners.map((banner: any) => {
          switch (banner?.banner_template_code) {
            case 'BT_CB':
              return <BannerTemplateCenterBackground banner={banner} />;
            case 'BT_RL':
              return <BannerTemplateRightLeft banner={banner} />;
            case 'BT_LR':
              return <BannerTemplateLeftRight banner={banner} />;
            default:
              return <BannerTemplateCenterBackground banner={banner} />;
          }
        })}
    </Carousel>
  );
};

export default React.memo(ImageCarousel);
