import InstituteDefaultFrontPage from '../../../@softbd/layouts/hoc/InstituteDefaultFrontPage';
import PageMeta from '../../../@crema/core/PageMeta';
import {apiGet} from '../../../@softbd/common/api';
import {API_PUBLIC_STATIC_PAGE_BLOCKS} from '../../../@softbd/common/apiRoutes';
import StaticContent from '../../../modules/sc';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';

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
  let params: any = {
    show_in: ShowInTypes.TSP,
  };

  // if (authUser?.isInstituteUser) {
  //   params['institute_id'] = authUser.institute_id;
  // }

  try {
    const res = await apiGet(API_PUBLIC_STATIC_PAGE_BLOCKS + pageId, {
      params,
      headers: {Authorization: 'Bearer ' + cookies?.app_access_token},
    });

    return {props: {data: res?.data?.data}};
  } catch (e) {
    return {props: {data: []}};
  }
}
