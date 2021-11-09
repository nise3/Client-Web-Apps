import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  CMS_NOTICE_OR_NEWS,
  CMS_RECENT_ACTIVITY,
} from '../../@softbd/common/apiRoutes';

export function useFetchRecentActivity(recentActivityId: number | null) {
  return useAxiosSWR(
    recentActivityId ? CMS_RECENT_ACTIVITY + '/' + recentActivityId : null,
  );
}
export function useFetchNoticeOrNews(itemId: number | null) {
  return useAxiosSWR(itemId ? CMS_NOTICE_OR_NEWS + '/' + itemId : null);
}
