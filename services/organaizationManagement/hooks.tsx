import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_JOB_SECTORS,
  API_OCCUPATIONS,
  API_ORGANIZATION_SERVICES,
  API_ORGANIZATION_TYPES,
  API_ORGANIZATION_UNIT_TYPES,
  API_ORGANIZATION_UNITS,
  API_ORGANIZATIONS,
} from '../../@softbd/common/apiRoutes';

export function useFetchOccupation(occupationId: number | null) {
  return useAxiosSWR(
    occupationId ? API_OCCUPATIONS + '/' + occupationId : null,
  );
}

export function useFetchJobSector(jobSectorId: number | null) {
  return useAxiosSWR(jobSectorId ? API_JOB_SECTORS + '/' + jobSectorId : null);
}

export function useFetchJobSectors(params: any) {
  return useAxiosSWR([API_JOB_SECTORS, params]);
}

export function useFetchOrganizationType(organizationTypeId: number | null) {
  return useAxiosSWR(
    organizationTypeId
      ? API_ORGANIZATION_TYPES + '/' + organizationTypeId
      : null,
  );
}

export function useFetchOrganizationTypes(params: any) {
  return useAxiosSWR([API_ORGANIZATION_TYPES, params]);
}

export function useFetchOrganization(organizationId: number | null) {
  return useAxiosSWR(
    organizationId ? API_ORGANIZATIONS + '/' + organizationId : null,
  );
}

export function useFetchOrganizations(params: any) {
  return useAxiosSWR([API_ORGANIZATIONS, params]);
}

export function useFetchOrganizationUnitType(
  organizationUnitTypeId: number | null,
) {
  return useAxiosSWR(
    organizationUnitTypeId
      ? API_ORGANIZATION_UNIT_TYPES + '/' + organizationUnitTypeId
      : null,
  );
}

export function useFetchOrganizationUnitTypes(params: any) {
  return useAxiosSWR([API_ORGANIZATION_UNIT_TYPES, params]);
}

export function useFetchOrganizationUnit(organizationUnitId: number | null) {
  return useAxiosSWR(
    organizationUnitId
      ? API_ORGANIZATION_UNITS + '/' + organizationUnitId
      : null,
  );
}

export function useFetchOrganizationUnits(params: any) {
  return useAxiosSWR([API_ORGANIZATION_UNITS, params]);
}

export function useFetchOrganizationServices(params: any) {
  return useAxiosSWR([API_ORGANIZATION_SERVICES, params]);
}
