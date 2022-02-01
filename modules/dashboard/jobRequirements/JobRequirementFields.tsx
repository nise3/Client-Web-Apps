import React, {FC} from 'react';
import {Grid} from '@mui/material';
import {useIntl} from 'react-intl';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';

interface CustomFieldProps {
  errorInstance: any;
  control: any;
  instituteOptions: Array<any>;
  skillOptions: Array<any>;
  register: any;
  isLoadingInstitute: boolean;
  isLoadingSkill: boolean;
  index: any;
}

const JobRequirementFields: FC<CustomFieldProps> = ({
  errorInstance: errors,
  control,
  instituteOptions,
  skillOptions,
  register,
  isLoadingInstitute,
  isLoadingSkill,
  index,
  ...props
}) => {
  const {messages} = useIntl();

  return (
    <>
      <Grid container item xs={12} spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            id={'hr_demands[' + index + '][institute_id]'}
            label={messages['common.institute']}
            isLoading={isLoadingInstitute}
            options={instituteOptions}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id={'hr_demands[' + index + '][end_date]'}
            label={messages['common.end_date']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            required
            id={'hr_demands[' + index + '][mandatory_skill_ids]'}
            label={messages['common.mandatory_skills']}
            isLoading={isLoadingSkill}
            options={skillOptions}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            id={'hr_demands[' + index + '][optional_skill_ids]'}
            label={messages['common.optional_skills']}
            isLoading={isLoadingSkill}
            options={skillOptions}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'hr_demands[' + index + '][vacancy]'}
            label={messages['common.vacancy']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'hr_demands[' + index + '][requirement]'}
            label={messages['common.requirements']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default JobRequirementFields;
