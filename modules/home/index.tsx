import React from 'react';
import CoverArea from './CoverArea';
import InfoCardSection from './InfoCardSection';
import SelfAssessment from './SelfAssessment';
import StatisticsCardSection from './StatisticsCardSection';
import Nise3WorkProcess from './Nise3WorkProcess';
import RecentActivities from './RecentActivities';
import PopularCourse from './PopularCourse';
import PopularJobs from './PopularJobs';
import Partners from './Partners';
import BdMap from './BdMap';

const Home = () => {
  return (
    <div style={{background: '#fff', paddingBottom: '120px'}}>
      <CoverArea />
      <InfoCardSection />
      <SelfAssessment />
      <StatisticsCardSection />
      <Nise3WorkProcess />
      <RecentActivities />
      <BdMap />
      <PopularCourse />
      <PopularJobs />
      <Partners />
    </div>
  );
};

export default Home;
