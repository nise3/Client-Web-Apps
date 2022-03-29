import {useMemo} from 'react';
import NASCIBMemberRegistrationForm from '../enrollment';
import MemberRegistration from './MemberRegistration';
import SMEFMemberRegistrationForm from '../enrollment/SMEFMemberRegistrationForm';

const RegistrationForm = () => {
  const NASCIBDomains = useMemo(() => {
    return [
      'https://nascib.nise.gov.bd',
      'http://nascib.nise.asm',
      'https://nascib-dev.nise3.xyz',
    ];
  }, []);

  const SMEFDomains = useMemo(() => {
    return [
      'https://smef.nise.gov.bd',
      'http://smef.nise.asm',
      'https://smef-dev.nise3.xyz',
    ];
  }, []);

  if (window && NASCIBDomains.includes(String(window.location.origin))) {
    return <NASCIBMemberRegistrationForm />;
  } else if (window && SMEFDomains.includes(String(window.location.origin))) {
    return <SMEFMemberRegistrationForm />;
  } else {
    return <MemberRegistration />;
  }

  /*  return window && NASCIBDomains.includes(String(window.location.origin)) ? (
      <NASCIBMemberRegistrationForm />
    ) : (
      <MemberRegistration />
    );*/
};

export default RegistrationForm;
