import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const StaticContent = asyncComponent(() => import('../../../modules/sc'));

export default InstituteDefaultFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.static_content']} />
      <StaticContent />
    </>
  );
});
