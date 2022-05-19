import {useAxiosSWR} from '../../@softbd/hooks/useAxiosSWR';
import {
  API_4IR_INITIATIVE,
  API_4IR_TAGLINES,
  API_ASSOCIATION_TRADES,
  API_HUMAN_RESOURCE_TEMPLATES,
  API_HUMAN_RESOURCES,
  API_JOB_SECTORS,
  API_OCCUPATIONS,
  API_ORGANIZATION_PROFILE,
  API_ORGANIZATION_SERVICES,
  API_ORGANIZATION_TYPES,
  API_ORGANIZATION_UNIT_HIERARCHY,
  API_ORGANIZATION_UNIT_TYPES,
  API_ORGANIZATION_UNITS,
  API_ORGANIZATIONS,
  API_PUBLIC_JOB_SECTORS,
  API_PUBLIC_ORGANIZATION_TYPES,
  API_RANK_TYPES,
  API_RANKS,
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

export function useFetchPublicJobSectors(params: any) {
  return useAxiosSWR([API_PUBLIC_JOB_SECTORS, params]);
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

export function useFetchPublicOrganizationTypes(params: any) {
  return useAxiosSWR([API_PUBLIC_ORGANIZATION_TYPES, params]);
}

export function useFetchAssociationTrades(params: any) {
  return useAxiosSWR([API_ASSOCIATION_TRADES, params]);
}

export function useFetchTagline() {
  return useAxiosSWR(API_4IR_TAGLINES);
}

export function useFetchInitiative(initiativeId: number | null) {
  return useAxiosSWR(
    initiativeId ? API_4IR_INITIATIVE + '/' + initiativeId : null,
  );
}

export function useFetchOrganization(organizationId: number | null) {
  return useAxiosSWR(
    organizationId ? API_ORGANIZATIONS + '/' + organizationId : null,
  );
}

export function useFetchOrganizationShowCasing() {
  return useAxiosSWR(API_ORGANIZATIONS);
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

export function useFetchOrganizationService(serviceId: number | null) {
  return useAxiosSWR(
    serviceId ? API_ORGANIZATION_SERVICES + '/' + serviceId : null,
  );
}

export function useFetchRankType(rankTypeId: number | null) {
  return useAxiosSWR(rankTypeId ? API_RANK_TYPES + '/' + rankTypeId : null);
}

export function useFetchRankTypes(params: any) {
  return useAxiosSWR([API_RANK_TYPES, params]);
}

export function useFetchRank(rankId: number | null) {
  return useAxiosSWR(rankId ? API_RANKS + '/' + rankId : null);
}

export function useFetchRanks(params: any) {
  return useAxiosSWR([API_RANKS, params]);
}

export function useOrganizationUnitHierarchy(organizationId: number | null) {
  return useAxiosSWR(
    organizationId ? API_ORGANIZATION_UNIT_HIERARCHY(organizationId) : null,
  );
}

export function useFetchHumanResourceTemplate(
  humanResourceTemplateId: number | null,
) {
  return useAxiosSWR(
    humanResourceTemplateId
      ? API_HUMAN_RESOURCE_TEMPLATES + '/' + humanResourceTemplateId
      : null,
  );
}

export function useFetchHumanResourceTemplates(params: any) {
  return useAxiosSWR([API_HUMAN_RESOURCE_TEMPLATES, params]);
}

export function useFetchHumanResource(humanResourceId: number | null) {
  return useAxiosSWR(
    humanResourceId ? API_HUMAN_RESOURCES + '/' + humanResourceId : null,
  );
}

export function useFetchHumanResources(params: any) {
  return useAxiosSWR([API_HUMAN_RESOURCES, params]);
}

export function useFetchOrganizationProfile(params: any) {
  return useAxiosSWR([API_ORGANIZATION_PROFILE, params]);
}
