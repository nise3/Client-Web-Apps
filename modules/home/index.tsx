import React from 'react';
import CoverArea from './CoverArea';
// import InfoCardSection from './InfoCardSection';
// import SelfAssessment from './SelfAssessment';
// import StatisticsCardSection from './StatisticsCardSection';
// import Nise3WorkProcess from './Nise3WorkProcess';
import RecentActivities from './RecentActivities';
import PopularCourse from './PopularCourse';
import PopularJobs from './PopularJobs';
// import Partners from './Partners';
import GraphMapView from './GraphMapView';
import Publications from './Publications';

const Home = () => {
  return (
    <div style={{background: '#fff', paddingBottom: '80px'}}>
      <CoverArea />

      {/*Todo: These sections are hided on feedback demand*/}
      {/*<InfoCardSection />*/}
      {/*<SelfAssessment />*/}
      {/*<StatisticsCardSection />*/}
      {/*<Nise3WorkProcess />*/}

      <RecentActivities />
      <GraphMapView />
      <Publications />
      <PopularCourse />
      <PopularJobs />

      {/*Todo: Partners section is hided on feedback demand*/}
      {/*<Partners />*/}
    </div>
  );
};

export default Home;
