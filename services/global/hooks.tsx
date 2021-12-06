import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {INSTITUTE_SERVICE_DASHBOARD_DEMANDED_COURSE, INSTITUTE_SERVICE_DASHBOARD_STATS_PATH} from '../../@softbd/common/apiRoutes';


export function useDashboardStatistics(insId?:number|undefined) {
    let path = INSTITUTE_SERVICE_DASHBOARD_STATS_PATH;
    if(insId){
        path =`${path}/${insId}`;
    }
    return useAxiosSWR(`${path}`);
}

export function useDashboardMostDemandableCourse(insId?:number|undefined) {
    let path = INSTITUTE_SERVICE_DASHBOARD_DEMANDED_COURSE;
    if(insId){
        path =`${path}/${insId}`;
    }
    return useAxiosSWR(`${path}`);
}
