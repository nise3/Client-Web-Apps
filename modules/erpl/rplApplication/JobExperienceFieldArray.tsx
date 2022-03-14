import React, {useCallback, useState} from 'react';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import {useIntl} from 'react-intl';
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {
  useFetchPublicRPLLevels,
  useFetchPublicRPLOccupations,
  useFetchPublicRPLSectors,
} from '../../../services/CertificateAuthorityManagement/hooks';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
  countries: any;
};

const JobExperienceFieldArray = ({
  id,
  isLoading,
  register,
  errors,
  control,
  countries,
}: Props) => {
  const {messages} = useIntl();
  const [countryFilters] = useState<any>({});
  const [rplSectorFilters, setRplSectorFilters] = useState<any>(null);
  const [rplOccupationFilters, setRplOccupationFilters] = useState<any>(null);
  const [rplLevelFilters, setRplLevelFilters] = useState<any>(null);
  const [rtoCountryFilters] = useState<any>({});
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [selectedOccupationId, setSelectedOccupationId] = useState(null);
  const [selectedLevelId, setSelectedLevelId] = useState(null);

  const {data: rplSectors, isLoading: isLoadingSectors} =
    useFetchPublicRPLSectors(rplSectorFilters);

  const {data: rplOccupations, isLoading: isLoadingOccupations} =
    useFetchPublicRPLOccupations(rplOccupationFilters);

  const {data: rplLevels, isLoading: isLoadingLevels} =
    useFetchPublicRPLLevels(rplLevelFilters);

  const onCountryChange = useCallback(
    (countryId: any) => {
      console.log(countryId);
      setRplSectorFilters({country_id: countryId});
      setSelectedCountryId(countryId);
    },
    [selectedCountryId, selectedSectorId],
  );

  const onSectorChange = useCallback(
    (sectorId: any) => {
      setRplOccupationFilters({rpl_sector_id: sectorId});
      setSelectedSectorId(sectorId);
    },
    [selectedSectorId],
  );

  const onOccupationChange = useCallback(
    (occupationId: any) => {
      setRplLevelFilters({rpl_occupation_id: occupationId});
      setSelectedOccupationId(occupationId);
    },
    [selectedOccupationId],
  );

  const onLevelChange = useCallback(
    (levelId: any) => {
      setSelectedLevelId(levelId);
    },
    [selectedOccupationId],
  );

  const {fields, append, remove} = useFieldArray({
    control,
    name: id,
  });

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <>
      {fields.map((item: any, index: any) => {
        let country = `${id}.${index}.country`;
        let sector = `${id}.${index}.sector`;
        let occupation = `${id}.${index}.occupation`;
        let level = `${id}.${index}.level`;

        return (
          <React.Fragment key={item.id}>
            <Grid container item spacing={4}>
              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={country}
                  label={messages['common.country']}
                  isLoading={false}
                  control={control}
                  options={countries}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  onChange={onCountryChange}
                />
              </Grid>

              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={sector}
                  label={messages['common.sector']}
                  isLoading={false}
                  control={control}
                  options={rplSectors}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  onChange={onSectorChange}
                />
              </Grid>

              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={occupation}
                  label={messages['common.occupation']}
                  isLoading={false}
                  control={control}
                  options={rplOccupations}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  onChange={onOccupationChange}
                />
              </Grid>

              <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
                <CustomFormSelect
                  id={level}
                  label={messages['common.skill_level']}
                  isLoading={false}
                  control={control}
                  options={rplLevels}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                />
              </Grid>
            </Grid>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default JobExperienceFieldArray;
