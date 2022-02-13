import React from 'react';

interface JobPreviewPageProps {
  job: any;
}

const JobPreviewPage = ({job}: JobPreviewPageProps) => {
  console.log('JobPreviewPage: ', job);
  return <div>Preview</div>;
};

export default JobPreviewPage;
