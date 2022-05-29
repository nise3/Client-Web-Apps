import {useDataLocalizationAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {API_PUBLIC_MIGRATION_PORTAL_DETAILS} from '../../@softbd/common/apiRoutes';

export function useFetchPublicMigrationPortalDetails() {
  return useDataLocalizationAxiosSWR(API_PUBLIC_MIGRATION_PORTAL_DETAILS);
}

export function useFetchPublicMigrationPortalDetailsWithParams(params: any) {
  return useDataLocalizationAxiosSWR([
    API_PUBLIC_MIGRATION_PORTAL_DETAILS,
    params,
  ]);
}
