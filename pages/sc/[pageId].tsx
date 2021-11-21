import NiseFrontPage from '../../@softbd/layouts/hoc/NiseFrontPage';
import PageMeta from '../../@crema/core/PageMeta';
import {apiGet} from '../../@softbd/common/api';
import {API_PUBLIC_STATIC_PAGE_BLOCKS} from '../../@softbd/common/apiRoutes';
import StaticContent from '../../modules/sc';
import {getShowInTypeFromPath} from '../../@softbd/utilities/helpers';
import {getAppAccessToken} from '../../@softbd/libs/axiosInstance';

export default NiseFrontPage(({data}: any) => {
  console.log('ddd', data);
  return (
    <>
      <PageMeta title={data.title} />
      <StaticContent data={data} />
    </>
  );
});

export async function getServerSideProps(context: any) {
  const {
    req: {cookies},
  } = context;

  const {pageId} = context.query;
  const SHOW_IN = getShowInTypeFromPath(context.resolvedUrl);
  const params = {
    show_in: SHOW_IN,
  };

  try {
    let appAccessToken = cookies?.app_access_token;
    if (!appAccessToken) {
      const response = await getAppAccessToken();
      appAccessToken = response?.data?.app_access_token;
    }

    const res = await apiGet(API_PUBLIC_STATIC_PAGE_BLOCKS + pageId, {
      params,
      headers: {
        Authorization: 'Bearer ' + appAccessToken,
      },
    });

    console.log('data', res?.data?.data);
    return {props: {data: res?.data?.data}};
  } catch (e) {
    return {props: {data: []}};
  }
}
