import React from 'react';
import CoverArea from './CoverArea';
import InfoCardSection from '../home/InfoCardSection';
import SelfAssessment from '../home/SelfAssessment';
import StatisticsCardSection from '../home/StatisticsCardSection';
import AboutSection from './AboutSection';
import RecentActivities from '../home/RecentActivities';
import PopularCourse from '../home/PopularCourse';
import SkillMatchingJobs from '../home/SkillMatchingJobs';
import Partners from '../home/Partners';
import Footer from '../home/Footer';
import BdMap from '../home/BdMap';
import Header from './Header';

const Institute = () => {
  return (
    <>
      <Header />
      <CoverArea />
      <AboutSection />
      <InfoCardSection />
      <SelfAssessment />
      <StatisticsCardSection />
      <RecentActivities />
      <BdMap />
      <PopularCourse />
      <SkillMatchingJobs />
      <Partners />
      <Footer />
    </>
  );
};

export default Institute;
