import asyncComponent from '../../../@crema/utility/asyncComponent';
import {useIntl} from 'react-intl';
import PageMeta from '../../../@crema/core/PageMeta';
import MigrationPortalDefaultFrontPage from '../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage';

const RegistrationPage = asyncComponent(
  () => import('../../../modules/migrationPortal/Registration'),
);

export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.recent_activities']} />
      <RegistrationPage />
    </>
  );
});
