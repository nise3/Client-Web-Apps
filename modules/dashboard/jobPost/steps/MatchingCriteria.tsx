import React from 'react';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const MatchingCriteria = ({onBack, onContinue}: Props) => {
  return <div>Matching</div>;
};

export default MatchingCriteria;
