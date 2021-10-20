import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import PageMeta from '../../@crema/core/PageMeta';
import {apiGet} from '../../@softbd/common/api';
import {API_FRONT_SC} from '../../@softbd/common/apiRoutes';
import StaticContent from '../../modules/sc';

export default NiseFrontPage(({data}: any) => {
  return (
    <>
      <PageMeta title={data.title} />
      <StaticContent data={data} />
    </>
  );
});

export async function getServerSideProps(context: any) {
  try {
    const res = await apiGet(API_FRONT_SC);
    return {props: {data: res.data.data}};
  } catch (e) {
    return {props: {data: undefined}};
  }
}
