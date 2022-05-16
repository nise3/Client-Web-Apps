import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import {useIntl} from 'react-intl';

const StaticContent = asyncComponent(() => import('../../../modules/sc'));

export default YouthFrontPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta title={messages['menu.stati']} />
      <StaticContent />
    </>
  );
});
