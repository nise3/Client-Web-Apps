import React from 'react';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const PreviewJob = ({onBack, onContinue}: Props) => {
  return <div>Preview</div>;
};

export default PreviewJob;
