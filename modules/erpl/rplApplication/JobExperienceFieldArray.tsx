import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import {
  useFetchPublicRPLLevels,
  useFetchPublicRPLOccupations,
  useFetchPublicRPLSectors,
} from '../../../services/CertificateAuthorityManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';

type Props = {
  formKey: string;
  index: number;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
  countries: any;
};

const JobExperienceFieldArray = ({
  formKey,
  index,
  isLoading,
  register,
  errors,
  control,
  countries,
}: Props) => {
  const {messages} = useIntl();
  const id = `${formKey}[${index}]`;
  const [selectedCountryId, setSelectedCountryId] = useState<any>(null);

  const [rplSectorFilters, setRplSectorFilters] = useState<any>(null);
  const [rplOccupationFilters, setRplOccupationFilters] = useState<any>(null);
  const [rplLevelFilters, setRplLevelFilters] = useState<any>(null);
  const {data: rplSectors, isLoading: isSectorLoading} =
    useFetchPublicRPLSectors(rplSectorFilters);

  const {data: rplOccupations, isLoading: isOccupationLoading} =
    useFetchPublicRPLOccupations(rplOccupationFilters);

  const {data: rplLevels, isLoading: isLevelLoading} =
    useFetchPublicRPLLevels(rplLevelFilters);

  const onCountryChange = useCallback((countryId: any) => {
    setSelectedCountryId(countryId ? countryId : null);
    setRplSectorFilters(
      countryId
        ? {
            country_id: countryId,
          }
        : null,
    );
    setRplOccupationFilters(null);
    setRplLevelFilters(null);
  }, []);

  const onSectorChange = useCallback(
    (sectorId: any) => {
      setRplOccupationFilters(
        sectorId
          ? {
              country_id: selectedCountryId,
              rpl_sector_id: sectorId,
            }
          : null,
      );
      setRplLevelFilters(null);
    },
    [selectedCountryId],
  );

  const onOccupationChange = useCallback(
    (occupationId: any) => {
      setRplLevelFilters(
        occupationId
          ? {
              country_id: selectedCountryId,
              rpl_occupation_id: occupationId,
            }
          : null,
      );
    },
    [selectedCountryId],
  );

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <Grid container item spacing={4}>
      <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
        <CustomFilterableFormSelect
          required
          id={`${id}[rto_country_id]`}
          label={messages['common.country']}
          isLoading={false}
          control={control}
          options={countries}
          errorInstance={errors}
          optionValueProp={'country_id'}
          optionTitleProp={['title']}
          onChange={onCountryChange}
        />
      </Grid>

      <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
        <CustomFilterableFormSelect
          required
          id={`${id}[rpl_sector_id]`}
          label={messages['common.sector']}
          isLoading={isSectorLoading}
          control={control}
          options={rplSectors || []}
          optionValueProp={'id'}
          errorInstance={errors}
          optionTitleProp={['title']}
          onChange={onSectorChange}
        />
      </Grid>

      <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
        <CustomFilterableFormSelect
          required
          id={`${id}[rpl_occupation_id]`}
          label={messages['common.occupation']}
          isLoading={isOccupationLoading}
          control={control}
          options={rplOccupations || []}
          optionValueProp={'id'}
          errorInstance={errors}
          optionTitleProp={['title']}
          onChange={onOccupationChange}
        />
      </Grid>

      <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
        <CustomFilterableFormSelect
          required
          id={`${id}[rpl_level_id]`}
          label={messages['common.skill_level']}
          isLoading={isLevelLoading}
          control={control}
          errorInstance={errors}
          options={rplLevels || []}
          optionValueProp={'id'}
          optionTitleProp={['title', 'sequence_order']}
        />
      </Grid>
    </Grid>
  );
};

export default JobExperienceFieldArray;
