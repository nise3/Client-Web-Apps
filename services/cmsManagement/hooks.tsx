import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_SLIDERS,
  API_STATIC_PAGES,
  API_VISITOR_FEEDBACKS,
} from '../../@softbd/common/apiRoutes';

export function useFetchVisitorFeedbacks(params: any) {
  return useAxiosSWR([API_VISITOR_FEEDBACKS, params]);
}

export function useFetchSliders(params: any) {
  return useAxiosSWR([API_SLIDERS, params]);
}

export function useFetchStaticPages(params: any) {
  return useAxiosSWR([API_STATIC_PAGES, params]);
}
