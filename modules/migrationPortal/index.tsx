import React from 'react';
import CoverArea from './CoverArea';
import GallerySection from './GallerySection';
import AboutSection from './AboutSection';
import EventSection from './EventSection';
import ImmigrantsCycleSection from './ImmigrantsCycleSection';

const MigrationPortal = () => {
  return (
    <>
      <CoverArea />
      <AboutSection />
      <ImmigrantsCycleSection />
      <EventSection />
      <GallerySection />
    </>
  );
};

export default MigrationPortal;
