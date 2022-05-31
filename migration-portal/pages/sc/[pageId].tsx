import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';
import MigrationPortalDefaultFrontPage from "../../../@softbd/layouts/hoc/MigrationPortalDefaultFrontPage";

const StaticContent = asyncComponent(() => import('../../../modules/sc'));

export default MigrationPortalDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.static_content']} />
      <StaticContent />
    </>
  );
});
