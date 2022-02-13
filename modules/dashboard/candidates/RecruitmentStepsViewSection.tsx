import React from 'react';

interface RecruitmentStepsViewSectionProps {
  jobId: string;
  onClickStep: (filters: any) => void;
}

const RecruitmentStepsViewSection = ({
  jobId,
  onClickStep,
}: RecruitmentStepsViewSectionProps) => {
  return <div>recruitment steps</div>;
};

export default RecruitmentStepsViewSection;
