import PageMeta from '../../../@crema/core/PageMeta';
import {API_FRONT_END_RECENT_ACTIVITY_LIST} from '../../../@softbd/common/apiRoutes';
import {apiGet} from '../../../@softbd/common/api';
import RecentActivitiesDetails from '../../../modules/institute/recent-activities/RecentActivitiesDetails';
import YouthFrontPage from '../../../@softbd/layouts/hoc/YouthFrontPage';
import {getAppAccessToken} from '../../../@softbd/libs/axiosInstance';

export default YouthFrontPage(({data}: any) => {
  return (
    <>
      <PageMeta title={data?.title} />
      <RecentActivitiesDetails data={data} />
    </>
  );
});

export async function getServerSideProps(context: any) {
  const {
    req: {cookies},
  } = context;

  let id = context.params.details;

  try {
    let appAccessToken = JSON.parse(
      cookies?.app_access_token || '{}',
    )?.access_token;

    if (!appAccessToken) {
      const response = await getAppAccessToken();
      appAccessToken = response?.data?.access_token;
    }

    const res = await apiGet(API_FRONT_END_RECENT_ACTIVITY_LIST + `/${id}`, {
      headers: {Authorization: 'Bearer ' + appAccessToken},
    });

    return {props: {data: res.data.data}};
  } catch (e) {
    //console.log('err=>', e);
    return {props: {data: null}};
  }
}
