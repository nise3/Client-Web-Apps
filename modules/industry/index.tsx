import React from 'react';
import CoverArea from '../industry/CoverArea';
import JobCircularSection from './JobCircularSection';
import NoticeAndEventSection from './NoticeAndEventSection';
import AboutUsSection from './AboutUsSection';
/*import TrainingSection from './TrainingSection';*/
import AssociationMembersSection from './AssociationMembersSection';

const Industry = () => {
  return (
    <>
      <CoverArea />
      <JobCircularSection />
      <NoticeAndEventSection />
      <AboutUsSection />
      {/*<TrainingSection />*/}
      <AssociationMembersSection />
    </>
  );
};

export default Industry;
