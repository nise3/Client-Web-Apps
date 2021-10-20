import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import PageMeta from '../../@crema/core/PageMeta';
import RecentActivitiesDetails from '../../modules/institute/recent-activities/RecentActivitiesDetails';
import {API_FRONT_END_RECENT_ACTIVITY_DETAIL} from '../../@softbd/common/apiRoutes';
import {apiGet} from '../../@softbd/common/api';

export default NiseFrontPage(({data, id}: any) => {
  return (
    <>
      <PageMeta title={data.title} />
      <RecentActivitiesDetails data={data} id={id} />
    </>
  );
});

export async function getServerSideProps(context: any) {
  const res = await apiGet(API_FRONT_END_RECENT_ACTIVITY_DETAIL);
  let id = context.params.details;

  return {props: {data: res.data.data, id}};
}
