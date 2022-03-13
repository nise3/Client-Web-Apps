import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_INSTITUTE_CERTIFICATION_AUTHORITY_DASHBOARD_STATICS,
  API_INSTITUTE_RTO_DASHBOARD_STATICS,
  INSTITUTE_SERVICE_DASHBOARD_DEMANDED_COURSE,
  INSTITUTE_SERVICE_DASHBOARD_STATS_PATH,
  INSTITUTE_SERVICE_PUBLIC_DASHBOARD_STATS_PATH,
} from '../../@softbd/common/apiRoutes';

export function useFetchPublicDashboardStatistics() {
  return useAxiosSWR(INSTITUTE_SERVICE_PUBLIC_DASHBOARD_STATS_PATH);
}

export function useFetchDashboardStatistics() {
  return useAxiosSWR(INSTITUTE_SERVICE_DASHBOARD_STATS_PATH);
}

export function useFetchCertificationAuthorityDashboardStatistics() {
  return useAxiosSWR(API_INSTITUTE_CERTIFICATION_AUTHORITY_DASHBOARD_STATICS);
}

export function useFetchRTODashboardStatistics() {
  return useAxiosSWR(API_INSTITUTE_RTO_DASHBOARD_STATICS);
}

export function useFetchDashboardMostDemandableCourse() {
  return useAxiosSWR(INSTITUTE_SERVICE_DASHBOARD_DEMANDED_COURSE);
}
