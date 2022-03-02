import {useRouter} from 'next/router';
import {useCallback, useMemo} from 'react';
import NASCIBMemberRegistrationForm from '../enrollment';
import MemberRegistration from './MemberRegistration';

const RegistrationForm = () => {
  const router = useRouter();
  const {basePath} = router.query;

  const NASCIBDomains = useMemo(() => {
    return [
      'https://nascib.gov.bd',
      'http://nascib.nise.asm',
      'http://localhost:3004/nascib',
    ];
  }, []);

  const isNASCIBDomain = useCallback(() => {
    return NASCIBDomains.includes(String(basePath));
  }, [router]);

  return isNASCIBDomain() ? (
    <MemberRegistration />
  ) : (
    <NASCIBMemberRegistrationForm />
  );
};

export default RegistrationForm;
