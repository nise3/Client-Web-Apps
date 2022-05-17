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
import {ResultTypes} from '../../../@softbd/utilities/ResultTypes';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {Body1} from '../../../@softbd/elements/common';
import CustomFieldArrayResultConfigGrading from './CustomFieldArrayResultConfigGrading';
import IconResultConfig from '../../../@softbd/icons/IconResultConfig';
import InputAdornment from '@mui/material/InputAdornment';
import {
  createResultConfig,
  updateResultConfig,
} from '../../../services/instituteManagement/CourseResultConfig';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useFetchResultConfigs} from '../../../services/instituteManagement/hooks';

type IProps = {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
};

const ResultConfigAddEditPopup = ({
  itemId,
  refreshDataTable,
  ...props
}: IProps) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const [courseId] = useState({course_id: itemId});
  const {data: itemData, isLoading, mutate} = useFetchResultConfigs(courseId);

  console.log('itemdata->', itemData);

  let isEdit = itemData?.id != null; //todo: temporary

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
          .label(messages['common.online'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
        offline: yup
          .string()
          .label(messages['common.offline'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
        mixed: yup
          .string()
          .label(messages['common.mixed'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
        practical: yup
          .string()
          .label(messages['common.practical'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
        field_work: yup
          .string()
          .label(messages['common.field_work'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
        presentation: yup
          .string()
          .label(messages['common.presentation'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
        assignment: yup
          .string()
          .label(messages['common.assignment'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
        attendance: yup
          .string()
          .label(messages['common.attendance'] as string)
          .nullable()
          .test(
            'max_validation',
            `${messages['common.total_percentage']}`,
            (value) =>
              !value || Boolean(Number(value) <= 100 && percentages <= 100),
          ),
      }),
    });
  }, [messages, percentages]);

  const {
    control,
    register,
    // reset,
    setError,
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
          Number(value?.result_percentages.mixed) +
          Number(value?.result_percentages.practical) +
          Number(value?.result_percentages.field_work) +
          Number(value?.result_percentages.presentation) +
          Number(value?.result_percentages.assignment) +
          Number(value?.result_percentages.attendance);

        console.log('values->', values);

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

  useEffect(() => {}, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    let formData = _.cloneDeep(data);

    if (ResultTypes.GRADING == formData.result_type) {
      delete formData.pass_marks;
    }

    if (ResultTypes.MARKING == formData.result_type) {
      delete formData.gradings;
    }

    formData.course_id = itemId;

    console.log('fromData->', formData);
    try {
      if (itemData && itemData.id) {
        await updateResultConfig(itemData.id, formData);
        updateSuccessMessage('course.label');
        mutate();
      } else {
        await createResultConfig(formData);
        createSuccessMessage('course.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconResultConfig />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='common.result_config' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='common.result_config' />}}
            />
          )}
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
            <Grid item xs={12}>
              <Body1>{messages['common.result_percentage']}</Body1>
            </Grid>
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
                id={'result_percentages[mixed]'}
                type={'number'}
                label={messages['common.mixed']}
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

export default ResultConfigAddEditPopup;
