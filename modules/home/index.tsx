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
import GraphView from './GraphView';
import GraphMapView from './GraphMapView';
import Publications from './Publications';
//import PopNiseLanding from './PopNiseLanding';

const Home = () => {
  return (
    <div style={{background: '#fff', paddingBottom: '80px'}}>
      <CoverArea />

      {/*Todo: These sections are hid on feedback demand*/}
      {/*<InfoCardSection />*/}
      {/*<SelfAssessment />*/}
      {/*<StatisticsCardSection />*/}
      {/*<Nise3WorkProcess />*/}

      <GraphView />
      <RecentActivities />
      <GraphMapView />
      <Publications />
      <PopularCourse />
      <PopularJobs />

      {/*<PopNiseLanding />*/}

      {/*Todo: Partners section is hid on feedback demand*/}
      {/*<Partners />*/}
    </div>
  );
};

export default Home;
