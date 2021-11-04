import React, {FC} from 'react';
import Grid from '@mui/material/Grid';
import {useIntl} from 'react-intl';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';

interface OtherInfoFormProps {
  register: any;
  errors: any;
  control: any;
}

const siblings = [
  {
    total: 0,
  },
  {
    total: 1,
  },
  {
    total: 2,
  },
  {
    total: 3,
  },
  {
    total: 4,
  },
  {
    total: 5,
  },
  {
    total: 6,
  },
  {
    total: 7,
  },
  {
    total: 8,
  },
  {
    total: 9,
  },
  {
    total: 10,
  },
];

const OtherInfoForm: FC<OtherInfoFormProps> = ({register, errors, control}) => {
  const {messages} = useIntl();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <FormRadioButtons
          id='miscellaneous_info[has_own_family_home]'
          label={'common.has_own_family_home'}
          radios={[
            {
              key: '1',
              label: messages['common.yes'],
            },
            {
              key: '0',
              label: messages['common.no'],
            },
          ]}
          control={control}
          defaultValue={'1'}
          isLoading={false}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormRadioButtons
          id='miscellaneous_info[has_own_family_land]'
          label={'common.has_own_family_land'}
          radios={[
            {
              key: '1',
              label: messages['common.yes'],
            },
            {
              key: '0',
              label: messages['common.no'],
            },
          ]}
          control={control}
          defaultValue={'1'}
          isLoading={false}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <CustomFilterableFormSelect
          id='miscellaneous_info[number_of_siblings]'
          label={messages['common.number_of_siblings']}
          isLoading={false}
          control={control}
          options={siblings}
          optionValueProp={'total'}
          optionTitleProp={['total']}
          errorInstance={errors}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormRadioButtons
          id='miscellaneous_info[recommended_by_any_organization]'
          label={'common.recommended_by_any_organization'}
          radios={[
            {
              key: '1',
              label: messages['common.yes'],
            },
            {
              key: '0',
              label: messages['common.no'],
            },
          ]}
          control={control}
          defaultValue={'1'}
          isLoading={false}
        />
      </Grid>
    </Grid>
  );
};

export default OtherInfoForm;
