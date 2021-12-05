import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {INSTITUTE_SERVICE_DASHBOARD_STATS_PATH} from '../../@softbd/common/apiRoutes';


export function useDashboardStatistics() {
  // try{
    return useAxiosSWR(INSTITUTE_SERVICE_DASHBOARD_STATS_PATH);
  // } catch (e){
  //   console.log('useDashboardStatistics err log', e)
  // }
}
