import React from 'react';

interface Props {
  onBack: () => void;
  onContinue: () => void;
}

const BillingAndContactInformation = ({onBack, onContinue}: Props) => {
  return <div>Billing</div>;
};

export default BillingAndContactInformation;
