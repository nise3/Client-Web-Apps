import asyncComponent from '../../../@crema/utility/asyncComponent';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';

const ContactInfo = asyncComponent(
  () =>
    import(
      '../../../modules/dashboard/industryAssociationContactInfo/IndustryAssociationContactInfoPage'
    ),
);

export default DashboardPage(() => {
  const {messages} = useIntl();

  return (
    <>
      <PageMeta title={messages['common.contact']} />
      <ContactInfo />
    </>
  );
});
