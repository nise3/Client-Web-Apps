import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid} from '@mui/material';
import React, {useEffect, useMemo, useState} from 'react';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ICourse} from '../../../shared/Interface/institute.interface';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import _ from 'lodash';
import FormRadioButtons from '../../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import {ResultTypes} from './ResultTypes';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Body1} from '../../../@softbd/elements/common';
import CustomFieldArrayResultConfigGrading from './CustomFieldArrayResultConfigGrading';
import IconResultConfig from '../../../@softbd/icons/IconResultConfig';
import InputAdornment from '@mui/material/InputAdornment';

type IProps = {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
};

const ResultConfigPopup = ({itemId, refreshDataTable, ...props}: IProps) => {
  const {messages} = useIntl();

  const [selectedResultType, setSelectedResultType] = useState<any>(null);
  const [percentages, setPercentages] = useState<any>(null);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      result_type: yup
        .string()
        .required()
        .label(messages['common.result_type'] as string),
      result_percentages: yup.object().shape({
        online: yup
          .string()
          .label('1000?')
          .test(
            //todo: work will start from here....
            'max_validation',
            `${messages['common.online']} ${messages['common.not_valid']}`,
            (value) =>
              Boolean(percentages <= 100 && value && Number(value) <= 100),
          ),
      }),
    });
  }, [messages]);

  const {
    control,
    register,
    // reset,
    // setError,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm<ICourse>({
    resolver: yupResolver(validationSchema),
  });

  console.log('errors->', errors);

  useEffect(() => {
    const subscription = watch((value: any) => {
      console.log('watch->', value);
      if (value && value?.result_percentages) {
        let values =
          Number(value?.result_percentages.online) +
          Number(value?.result_percentages.offline) +
          Number(value?.result_percentages.practical) +
          Number(value?.result_percentages.field_work) +
          Number(value?.result_percentages.presentation) +
          Number(value?.result_percentages.assignment) +
          Number(value?.result_percentages.attendance);

        setPercentages(values);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const resultTypeLists = useMemo(
    () => [
      {
        key: ResultTypes.GRADING,
        label: messages['common.grading'],
      },
      {
        key: ResultTypes.MARKING,
        label: messages['common.marks'],
      },
    ],
    [messages],
  );

  const onSubmit: SubmitHandler<any> = async (data) => {
    let formData = _.cloneDeep(data);

    if (ResultTypes.GRADING == formData.result_type) {
      delete formData.pass_marks;
    }

    if (ResultTypes.MARKING == formData.result_type) {
      delete formData.gradings;
    }

    console.log('fromData->', formData);
    /*formData.application_form_settings = getConfigInfoData(
      data.application_form_settings,
    );

    if (!authUser?.isSystemUser) {
      delete formData?.institute_id;
    }

    formData.skills = (data?.skills || []).map((skill: any) => skill.id);

    try {
      if (itemId) {
        await updateCourse(itemId, formData);
        updateSuccessMessage('course.label');
        mutateCourse();
      } else {
        await createCourse(formData);
        createSuccessMessage('course.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }*/
  };

  let isLoading = false;

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconResultConfig />
          <IntlMessages
            id='common.add_new'
            values={{subject: <IntlMessages id='common.result_config' />}}
          />
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormRadioButtons
            label={'common.result_type'}
            required
            id='result_type'
            radios={resultTypeLists}
            control={control}
            isLoading={isLoading}
            onChange={(value) => {
              setSelectedResultType(value);
            }}
          />
        </Grid>

        {selectedResultType == ResultTypes.GRADING && (
          <>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <Body1>Label</Body1>
                </Grid>
                <Grid item xs={3}>
                  <Body1>Min</Body1>
                </Grid>
                <Grid item xs={3}>
                  <Body1>Max</Body1>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CustomFieldArrayResultConfigGrading
                id='gradings'
                isLoading={false}
                control={control}
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            </Grid>
          </>
        )}

        {selectedResultType == ResultTypes.MARKING && (
          <Grid item xs={12}>
            <CustomTextInput
              required
              id='pass_marks'
              type={'number'}
              label={messages['common.pass_marks']}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
              InputProps={{inputProps: {min: 0, max: 100}}}
            />
          </Grid>
        )}

        {selectedResultType !== null && (
          <>
            <Grid item xs={6}>
              <CustomTextInput
                id={'result_percentages[online]'}
                type={'number'}
                label={messages['common.online']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'result_percentages[offline]'}
                type={'number'}
                label={messages['common.offline']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'result_percentages[practical]'}
                type={'number'}
                label={messages['common.practical']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'result_percentages[field_work]'}
                type={'number'}
                label={messages['common.field_work']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'result_percentages[presentation]'}
                type={'number'}
                label={messages['common.presentation']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'result_percentages[assignment]'}
                type={'number'}
                label={messages['common.assignment']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextInput
                id={'result_percentages[attendance]'}
                type={'number'}
                label={messages['common.attendance']}
                register={register}
                errorInstance={errors}
                isLoading={false}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>%</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default ResultConfigPopup;
