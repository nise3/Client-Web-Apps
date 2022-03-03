import React, {FC, useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import {useFetchCountries} from '../../services/locationManagement/hooks';
import CustomFilterableFormSelect from '../../@softbd/elements/input/CustomFilterableFormSelect';
import {useIntl} from 'react-intl';
import {
  useFetchRPLLevels,
  useFetchRPLOccupations,
  useFetchRPLSectors,
} from '../../services/CertificateAuthorityManagement/hooks';

interface Step1FormProps {
  register: any;
  errors: any;
  control: any;
  getValues: any;
  setValue: any;
}
const SectorAndOccupationForm: FC<Step1FormProps> = ({
  register,
  errors,
  control,
  getValues,
  setValue,
}) => {
  const [countryFilters] = useState<any>({});
  const [rplSectorFilters, setRplSectorFilters] = useState<any>({});
  const [rplOccupationFilters] = useState<any>({});
  const [rplLevelFilters] = useState<any>({});
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const {messages} = useIntl();

  const {data: countries, isLoading: isLoadingCountries} =
    useFetchCountries(countryFilters);

  const {data: rplSectors, isLoading: isLoadingSectors} =
    useFetchRPLSectors(rplSectorFilters);

  const {data: rplOccupations, isLoading: isLoadingOccupations} =
    useFetchRPLOccupations(rplOccupationFilters);

  const {data: rplLevels, isLoading: isLoadingLevels} =
    useFetchRPLLevels(rplLevelFilters);

  console.log(
    ': ',
    rplOccupations,
    isLoadingOccupations,
    isLoadingLevels,
    rplLevels,
  );

  const onCountryChange = useCallback(
    (countryId: any) => {
      setRplSectorFilters({country_id: countryId});
      setSelectedCountryId(countryId);
    },
    [selectedCountryId],
  );
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
            /*  onChange={onSectorChange}*/
          />
        </Grid>
      )}
      {selectedCountryId && (
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id='rpl_level_id'
            label={messages['rpl_level.label']}
            isLoading={isLoadingSectors}
            control={control}
            options={rplSectors}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            /*  onChange={onSectorChange}*/
          />
        </Grid>
      )}
    </Grid>
  );
};

export default SectorAndOccupationForm;
