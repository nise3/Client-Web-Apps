import React, {useCallback, useState} from 'react';
import {Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import TextInputSkeleton from '../../../@softbd/elements/display/skeleton/TextInputSkeleton/TextInputSkeleton';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';

type Props = {
  id: string;
  isLoading?: boolean;
  register: any;
  errors: any;
  control: any;
  countries: any;
  sectors: any;
  occupations: any;
  levels: any;
};

const JobExperienceFieldArray = ({
  id,
  isLoading,
  register,
  errors,
  control,
  countries,
  sectors,
  occupations,
  levels,
}: Props) => {
  const {messages} = useIntl();
  const [sectorList, setSectorList] = useState<any>([]);
  const [occupationList, setOccupationList] = useState<any>([]);
  const [levelList, setLevelList] = useState<any>([]);

  const onCountryChange = useCallback(
    (countryId: any) => {
      const filteredSectors: any =
        sectors &&
        sectors.length > 0 &&
        sectors.filter((sector: any) => sector.country_id == countryId);
      console.log('sectors:', filteredSectors);
      setSectorList(filteredSectors);
    },
    [sectorList],
  );

  const onSectorChange = useCallback(
    (sectorId: any) => {
      const filteredOccupations: any =
        occupations &&
        occupations.length > 0 &&
        occupations.filter(
          (occupation: any) => occupation.sector_id == sectorId,
        );
      setOccupationList(filteredOccupations);
    },
    [occupationList],
  );

  const onOccupationChange = useCallback(
    (occupationId: any) => {
      const filteredLevels: any =
        levels &&
        levels.length > 0 &&
        levels.filter((level: any) => level.occupation_id == occupationId);
      setLevelList(filteredLevels);
    },
    [levelList],
  );

  return isLoading ? (
    <TextInputSkeleton />
  ) : (
    <Grid container item spacing={4}>
      <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
        <CustomFormSelect
          id={`${id}[rto_country_id]`}
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
          id={`${id}[rpl_sector_id]`}
          label={messages['common.sector']}
          isLoading={false}
          control={control}
          options={sectorList}
          optionValueProp={'id'}
          optionTitleProp={['title', 'title_en']}
          onChange={onSectorChange}
        />
      </Grid>

      <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
        <CustomFormSelect
          id={`${id}[rpl_occupation_id]`}
          label={messages['common.occupation']}
          isLoading={false}
          control={control}
          options={occupationList || []}
          optionValueProp={'id'}
          optionTitleProp={['title']}
          onChange={onOccupationChange}
        />
      </Grid>

      <Grid item xs={12} md={3} style={{paddingBottom: 20}}>
        <CustomFormSelect
          id={`${id}[rpl_level_id]`}
          label={messages['common.skill_level']}
          isLoading={false}
          control={control}
          options={levelList || []}
          optionValueProp={'id'}
          optionTitleProp={['title']}
        />
      </Grid>
    </Grid>
  );
};

export default JobExperienceFieldArray;
