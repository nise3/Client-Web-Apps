import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_CMS_GLOBAL_CONFIGS,
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

export function useFetchSlider(sliderId: number | null) {
  return useAxiosSWR(sliderId ? API_SLIDERS + '/' + sliderId : null);
}

export function useFetchStaticPages(params: any) {
  return useAxiosSWR([API_STATIC_PAGES, params]);
}

export function useFetchStaticPage(pageId: number | null) {
  return useAxiosSWR(pageId ? API_STATIC_PAGES + '/' + pageId : null);
}

export function useFetchCMSGlobalConfigs(params: any) {
  return useAxiosSWR([API_CMS_GLOBAL_CONFIGS, params]);
}

export function useFetchCMSGlobalConfig() {
  return useAxiosSWR(API_CMS_GLOBAL_CONFIGS);
}
