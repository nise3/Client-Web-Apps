import IndustryDefaultFrontPage from '../../../@softbd/layouts/hoc/IndustryDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const IndustryContactPage = asyncComponent(
  () => import('../../../modules/industry/contact'),
);

export default IndustryDefaultFrontPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.contact']} />
      <IndustryContactPage />
    </>
  );
});
