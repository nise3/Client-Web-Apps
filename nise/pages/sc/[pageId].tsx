import NiseFrontPage from '../../../@softbd/layouts/hoc/NiseFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {apiGet} from '../../../@softbd/common/api';
import {API_PUBLIC_STATIC_PAGE_BLOCKS} from '../../../@softbd/common/apiRoutes';
import StaticContent from '../../../modules/sc';
import {getShowInTypeFromPath} from '../../../@softbd/utilities/helpers';
import {getAppAccessToken} from '../../../@softbd/libs/axiosInstance';

export default NiseFrontPage(({data}: any) => {
  return (
    <>
      <PageMeta title={data?.title} />
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
    let appAccessToken = JSON.parse(
      cookies?.app_access_token || '{}',
    )?.access_token;

    if (!appAccessToken) {
      const response = await getAppAccessToken();
      appAccessToken = response?.data?.access_token;
    }

    const res = await apiGet(API_PUBLIC_STATIC_PAGE_BLOCKS + pageId, {
      params,
      headers: {
        Authorization: 'Bearer ' + appAccessToken,
      },
    });

    return {props: {data: res?.data?.data}};
  } catch (e) {
    return {props: {data: null}};
  }
}
