import React from 'react';
import CoverArea from './CoverArea';
import InfoCardSection from './InfoCardSection';
import CoursesSection from './CoursesSection';
import GallerySection from './GallerySection';
import AboutSection from './AboutSection';
import EventSection from './EventSection';
//import PopNiseLanding from '../home/PopNiseLanding';

// 'sit.nise.gov.bd'
// 'sit.nise.asm'
//const INSTITUTE_HOST = 'sit.nise.gov.bd';

const Institute = () => {
  //let host = window?.location?.host;

  return (
    <>
      <CoverArea />
      <AboutSection />
      <InfoCardSection />
      <CoursesSection />
      <EventSection />
      <GallerySection />

      {/*{host == INSTITUTE_HOST && <PopNiseLanding />}*/}
    </>
  );
};

export default Institute;
