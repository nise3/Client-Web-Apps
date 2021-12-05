import {catchBlockHandler} from '../../@softbd/utilities/helpers';
import {INSTITUTE_SERVICE_DASHBOARD_STATS_PATH} from '../../@softbd/common/apiRoutes';
import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {IDashboardStatistics} from '../../shared/Interface/dashboard.interface';

export const getDashboardStistics: IDashboardStatistics = (instituteId?: number) => {
  console.log('path :', INSTITUTE_SERVICE_DASHBOARD_STATS_PATH);
  try {
      return useAxiosSWR<IDashboardStatistics>([INSTITUTE_SERVICE_DASHBOARD_STATS_PATH, instituteId]);
  } catch (error) {
    catchBlockHandler(error);
  }
}