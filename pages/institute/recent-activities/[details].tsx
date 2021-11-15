import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {API_FRONT_END_RECENT_ACTIVITY_LIST} from '../../../@softbd/common/apiRoutes';
import {apiGet} from '../../../@softbd/common/api';
import RecentActivitiesDetails from '../../../modules/institute/recent-activities/RecentActivitiesDetails';

export default InstituteDefaultFrontPage(({data, id}: any) => {
  return (
    <>
      <PageMeta title={data.title} />
      <RecentActivitiesDetails data={data} id={id} />
    </>
  );
});

export async function getServerSideProps(context: any) {
  const {
    req: {cookies},
  } = context;

  let id = context.params.details;

  try {
    const res = await apiGet(API_FRONT_END_RECENT_ACTIVITY_LIST + `/${id}`, {
      headers: {Authorization: 'Bearer ' + cookies?.app_access_token},
    });

    return {props: {data: res.data.data, id}};
  } catch (e) {
    console.log('err=>', e);
    return {props: {data: []}};
  }
}
