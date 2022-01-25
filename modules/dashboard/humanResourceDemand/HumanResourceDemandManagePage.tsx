import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {getHumanResource} from '../../../services/organaizationManagement/HumanResourceService';

const HumanResourceDemandManagePage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();
  const {hrDemandId} = router.query;

  useEffect(() => {
    if (hrDemandId) {
      const humanResourceDemand = getHumanResource(Number(hrDemandId));
      console.log(humanResourceDemand);
    }
  }, [hrDemandId]);

  return <></>;
};

export default HumanResourceDemandManagePage;
