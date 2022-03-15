import {useMemo} from 'react';
import NASCIBMemberRegistrationForm from '../enrollment';
import MemberRegistration from './MemberRegistration';

const RegistrationForm = () => {
  const NASCIBDomains = useMemo(() => {
    return [
      'https://nascib.nise.gov.bd',
      'http://nascib.nise.asm',
      'https://nascib-dev.nise3.xyz',
    ];
  }, []);

  return window && NASCIBDomains.includes(String(window.location.origin)) ? (
    <NASCIBMemberRegistrationForm />
  ) : (
    <MemberRegistration />
  );
};

export default RegistrationForm;
