import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {apiGet} from '../../../@softbd/common/api';
import {API_FRONT_END_STATIC_PAGES} from '../../../@softbd/common/apiRoutes';
import StaticContent from '../../../modules/sc';
import {getShowInTypeFromPath} from '../../../@softbd/utilities/helpers';
import {snakeCase} from 'lodash';

export default InstituteDefaultFrontPage(({data}: any) => {
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
  const STATIC_PAGE_CONTENT_ID_OR_SLUG = snakeCase(pageId);
  const SHOW_IN = getShowInTypeFromPath(context.resolvedUrl);
  let params: any = {
    show_in: SHOW_IN,
  };

  console.log('context', context);

  // if (authUser?.isInstituteUser) {
  //   params['institute_id'] = authUser.institute_id;
  // }

  try {
    const res = await apiGet(
      API_FRONT_END_STATIC_PAGES + '/' + STATIC_PAGE_CONTENT_ID_OR_SLUG,
      {
        params,
        headers: {Authorization: 'Bearer ' + cookies?.app_access_token},
      },
    );

    console.log('data', res?.data?.data);
    return {props: {data: res?.data?.data}};
  } catch (e) {
    // console.log('e', e);
    return {props: {data: []}};
  }
}
