import React from 'react';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const CompanyInfoVisibility = ({onBack, onContinue}: Props) => {
  return <div>Company</div>;
};

export default CompanyInfoVisibility;
