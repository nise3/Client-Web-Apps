import React, {FC, useCallback, useEffect, useState} from 'react';
import {Grid} from '@mui/material';
import {useFetchCountries} from '../../services/locationManagement/hooks';
import CustomFilterableFormSelect from '../../@softbd/elements/input/CustomFilterableFormSelect';
import {useIntl} from 'react-intl';
import {
  useFetchPublicRPLLevels,
  useFetchPublicRPLOccupations,
  useFetchPublicRPLSectors,
  useFetchPublicRTOCountries,
  useFetchPublicRTOS,
} from '../../services/CertificateAuthorityManagement/hooks';

interface Step1FormProps {
  register: any;
  errors: any;
  control: any;
  getValues: any;
  setValue: any;
  onChanged: () => void;
}

const SectorAndOccupationForm: FC<Step1FormProps> = ({
  register,
  errors,
  control,
  getValues,
  setValue,
  onChanged = () => {},
}) => {
  const [countryFilters] = useState<any>({});
  const [rplSectorFilters, setRplSectorFilters] = useState<any>(null);
  const [rplOccupationFilters, setRplOccupationFilters] = useState<any>(null);
  const [rplLevelFilters, setRplLevelFilters] = useState<any>(null);
  const [rtoCountryFilters] = useState<any>({});
  const [rtoFilters, setRtoFilters] = useState<any>(null);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [selectedOccupationId, setSelectedOccupationId] = useState(null);
  const [selectedRtoCountryId, setSelectedRtoCountryId] = useState(null);
  const [selectedLevelId, setSelectedLevelId] = useState(null);
  const {messages} = useIntl();

  const {data: countries, isLoading: isLoadingCountries} =
    useFetchCountries(countryFilters);

  const {data: rplSectors, isLoading: isLoadingSectors} =
    useFetchPublicRPLSectors(rplSectorFilters);

  const {data: rplOccupations, isLoading: isLoadingOccupations} =
    useFetchPublicRPLOccupations(rplOccupationFilters);

  const {data: rplLevels, isLoading: isLoadingLevels} =
    useFetchPublicRPLLevels(rplLevelFilters);

  const {data: rtoCountries, isLoading: isLoadingRtoCountries} =
    useFetchPublicRTOCountries(rtoCountryFilters);

  const {data: rtoList, isLoading: isLoadingRtoLists} =
    useFetchPublicRTOS(rtoFilters);

  const onCountryChange = useCallback(
    (countryId: any) => {
      setRplSectorFilters({country_id: countryId});
      setSelectedCountryId(countryId);
      onChanged();
    },
    [selectedCountryId],
  );

  const onSectorChange = useCallback(
    (sectorId: any) => {
      setRplOccupationFilters({rpl_sector_id: sectorId});
      setSelectedSectorId(sectorId);
      onChanged();
    },
    [selectedSectorId],
  );

  const onOccupationChange = useCallback(
    (occupationId: any) => {
      setRplLevelFilters({rpl_occupation_id: occupationId});
      setSelectedOccupationId(occupationId);
      onChanged();
    },
    [selectedOccupationId],
  );

  const onLevelChange = useCallback(
    (levelId: any) => {
      setSelectedLevelId(levelId);
      onChanged();
    },
    [selectedOccupationId],
  );

  const onRtoCountryChange = useCallback(
    (rtoCountryId: any) => {
      setRtoFilters({rto_country_id: rtoCountryId});
      setSelectedRtoCountryId(rtoCountryId);
      onChanged();
    },
    [selectedRtoCountryId],
  );

  useEffect(() => {
    if (getValues) {
      const countryId = getValues('country_id');

      if (countryId) {
        setSelectedCountryId(countryId);
        setRplSectorFilters({country_id: countryId});
      }

      const sectorId = getValues('rpl_sector_id');

      if (sectorId) {
        setSelectedSectorId(sectorId);
        setRplOccupationFilters({rpl_sector_id: sectorId});
      } else {
        setRplOccupationFilters(null);
        setSelectedSectorId(null);
      }

      const occupationId = getValues('rpl_occupation_id');

      if (occupationId) {
        setSelectedOccupationId(occupationId);
        setRplLevelFilters({rpl_occupation_id: occupationId});
      } else {
        setSelectedOccupationId(null);
        setRplLevelFilters(null);
      }

      const levelId = getValues('rpl_level_id');

      if (levelId) {
        setSelectedLevelId(levelId);
      } else {
        setSelectedLevelId(null);
      }
      const rtoCountryId = getValues('rto_country_id');
      if (rtoCountryId) {
        setSelectedRtoCountryId(rtoCountryId);
        setRtoFilters({rto_country_id: rtoCountryId});
      }
    }
  }, [getValues, selectedSectorId, selectedOccupationId, selectedCountryId]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <CustomFilterableFormSelect
          required
          id='country_id'
          label={messages['common.country']}
          isLoading={isLoadingCountries}
          control={control}
          options={countries}
          optionValueProp={'id'}
          optionTitleProp={['title']}
          errorInstance={errors}
          onChange={onCountryChange}
        />
      </Grid>
      {selectedCountryId && (
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='rpl_sector_id'
            label={messages['rpl_sector.label']}
            isLoading={isLoadingSectors}
            control={control}
            options={rplSectors}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onSectorChange}
          />
        </Grid>
      )}
      {selectedSectorId && (
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='rpl_occupation_id'
            label={messages['rpl_occupation.label']}
            isLoading={isLoadingOccupations}
            control={control}
            options={rplOccupations}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onOccupationChange}
          />
        </Grid>
      )}
      {selectedOccupationId && (
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='rpl_level_id'
            label={messages['rpl_level.label']}
            isLoading={isLoadingLevels}
            control={control}
            options={rplLevels}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onLevelChange}
          />
        </Grid>
      )}
      {selectedLevelId && (
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='rto_country_id'
            label={messages['rto_country.label']}
            isLoading={isLoadingRtoCountries}
            control={control}
            options={rtoCountries}
            optionValueProp={'country_id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={onRtoCountryChange}
          />
        </Grid>
      )}

      {selectedRtoCountryId && (
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='rto_id'
            label={messages['rto.label']}
            isLoading={isLoadingRtoLists}
            control={control}
            options={rtoList}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default SectorAndOccupationForm;
