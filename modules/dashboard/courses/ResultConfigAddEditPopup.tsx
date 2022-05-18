import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {Grid, Typography} from '@mui/material';
import React, {useEffect, useMemo, useState} from 'react';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {SubmitHandler, useForm} from 'react-hook-form';
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
import {createResultConfig} from '../../../services/instituteManagement/CourseResultConfig';
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

  const [selectedResultType, setSelectedResultType] = useState<any>(null);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      result_type: yup
        .string()
        .required()
        .label(messages['common.result_type'] as string),
      gradings: yup.array().of(
        yup.object().shape({
          label: yup
            .string()
            .label(messages['common.label'] as string)
            .when('gradings', {
              is: (value: any) => value,
              then: yup.string().required(),
            }),
          min: yup
            .string()
            .label(messages['common.min'] as string)
            .when('gradings', {
              is: (value: any) => value,
              then: yup.string().required(),
            }),
          max: yup
            .string()
            .label(messages['common.max'] as string)
            .when('gradings', {
              is: (value: any) => value,
              then: yup.string().required(),
            }),
        }),
      ),
      total_percentage: yup
        .number()
        .required()
        .test(
          'max_validation',
          `${messages['common.total_percentage']}`,
          (value) => !value || Boolean(Number(value) == 100),
        ),
      total_gradings: yup
        .number()
        .required()
        .test(
          'max_validation',
          `${messages['common.total_gradings']}`,
          (value) => !value || Boolean(Number(value) == 100),
        ),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    watch,
    handleSubmit,
    setValue,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  let watchResultPercentage = watch([
    'result_percentages[online]',
    'result_percentages[offline]',
    'result_percentages[mixed]',
    'result_percentages[practical]',
    'result_percentages[field_work]',
    'result_percentages[presentation]',
    'result_percentages[assignment]',
    'result_percentages[attendance]',
  ]);

  useEffect(() => {
    let values: number = 0;
    watchResultPercentage.map((value: any) => {
      if (value) {
        values += Number(value);
      }
    });

    setValue('total_percentage', values);
  }, [watchResultPercentage]);

  useEffect(() => {
    if (itemData && itemData.id) {
      reset({
        result_type: Number(itemData?.result_type),
        pass_marks: itemData?.pass_marks,
        result_percentages: itemData?.result_percentages,
        gradings: itemData?.gradings,
      });
      setSelectedResultType(Number(itemData?.result_type));
    } else {
      reset({
        gradings: [{min: 0}],
      });
    }
  }, [itemData]);

  console.log('errors->', errors);

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

    formData.course_id = itemId;
    if (itemData?.id) formData.id = itemData.id;

    console.log('fromData->', formData);
    try {
      await createResultConfig(formData);
      if (itemData && itemData.id) {
        updateSuccessMessage('course.label');
        mutate();
      } else {
        createSuccessMessage('course.label');
      }
      props.onClose();
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
          {itemData?.id != null ? (
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
                  <Body1>
                    {messages['common.label']}{' '}
                    <span style={{color: 'red'}}>*</span>
                  </Body1>
                </Grid>
                <Grid item xs={3}>
                  <Body1>
                    {messages['common.min']}{' '}
                    <span style={{color: 'red'}}>*</span>
                  </Body1>
                </Grid>
                <Grid item xs={3}>
                  <Body1>
                    {messages['common.max']}{' '}
                    <span style={{color: 'red'}}>*</span>
                  </Body1>
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
                watch={watch}
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
            {errors?.['total_percentage'] && (
              <Grid item xs={12}>
                <Typography sx={{color: 'red'}}>
                  {errors['total_percentage']?.message}
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default ResultConfigAddEditPopup;
