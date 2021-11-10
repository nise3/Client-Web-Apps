import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_SLIDERS,
  API_STATIC_PAGES,
  API_VISITOR_FEEDBACKS,
  CMS_NOTICE_OR_NEWS,
  CMS_RECENT_ACTIVITY,
  API_CMS_GLOBAL_CONFIG, API_PARTNERS
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

export function useFetchRecentActivity(recentActivityId: number | null) {
  return useAxiosSWR(
    recentActivityId ? CMS_RECENT_ACTIVITY + '/' + recentActivityId : null,
  );
}
export function useFetchNoticeOrNews(itemId: number | null) {
  return useAxiosSWR(itemId ? CMS_NOTICE_OR_NEWS + '/' + itemId : null);
}

/** fetches CMS Global Config */
export function useFetchCMSGlobalConfig() {
  return useAxiosSWR(API_CMS_GLOBAL_CONFIG);
}

export function useFetchPartners(params: any) {
  return useAxiosSWR(API_PARTNERS);
}

export function useFetchPartner(partnerId: number) {
  return useAxiosSWR(API_PARTNERS + '/' + partnerId);
}
