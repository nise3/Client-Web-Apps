import React from 'react';
import CoverArea from './CoverArea';
import InfoCardSection from './InfoCardSection';
import SelfAssessment from './SelfAssessment';
import StatisticsCardSection from './StatisticsCardSection';
import Nise3WorkProcess from './Nise3WorkProcess';
import RecentActivities from './RecentActivities';
import PopularCourse from './PopularCourse';
import SkillMatchingJobs from './SkillMatchingJobs';
import Partners from './Partners';
import BdMap from './BdMap';

const Home = () => {
  return (
    <>
      <CoverArea />
      <InfoCardSection />
      <SelfAssessment />
      <StatisticsCardSection />
      <Nise3WorkProcess />
      <RecentActivities />
      <BdMap />
      <PopularCourse />
      <SkillMatchingJobs />
      <Partners />
    </>
  );
};

export default Home;
