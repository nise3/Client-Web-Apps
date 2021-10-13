import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  getMomentDateFormat,
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import yup from '../../../@softbd/libs/yup';
import {
  assignTrainersToBatch,
  createBatch,
  updateBatch,
} from '../../../services/instituteManagement/BatchService';
import IconBatch from '../../../@softbd/icons/IconBatch';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {FormControlLabel, Switch} from '@mui/material';
import {
  useFetchBatch,
  useFetchBranches,
  useFetchCourses,
  useFetchInstitutes,
  useFetchProgrammes,
  useFetchTrainers,
  useFetchTrainingCenters,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface BatchAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  course_id: '',
  programme_id: '',
  institute_id: '',
  branch_id: '',
  training_center_id: '',
  registration_start_date: '',
  registration_end_date: '',
  batch_start_date: '',
  batch_end_date: '',
  number_of_seats: '',
  available_seats: '',
  row_status: '1',
  dynamic_form_field: {},
  trainers: [],
};

const BatchAddEditPopup: FC<BatchAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;

  const {
    data: itemData,
    isLoading,
    mutate: mutateBatch,
  } = useFetchBatch(itemId);

  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitutes(instituteFilters);

  const [branchFilters, setBranchFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: branches, isLoading: isLoadingBranches} =
    useFetchBranches(branchFilters);

  const [programmeFilters, setProgrammeFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: programmes, isLoading: isLoadingProgrammes} =
    useFetchProgrammes(programmeFilters);

  const [trainingCenterFilters, setTrainingCenterFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: trainingCenters, isLoading: isLoadingTrainingCenters} =
    useFetchTrainingCenters(trainingCenterFilters);

  const [coursesFilters, setCoursesFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: courses, isLoading: isLoadingCourses} =
    useFetchCourses(coursesFilters);

  const [trainersFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: trainers, isLoading: isLoadingTrainers} =
    useFetchTrainers(trainersFilters);

  const [configItemsState, setConfigItemsState] = useState<any>([]);
  const [configRequiredItems, setConfigRequiredItems] = useState<any>([]);
  const configItemList = useMemo(
    () => [
      {
        key: 'ethnic_group_info',
        label: messages['batches.ethnic_group_info'],
      },
      {
        key: 'freedom_fighter_info',
        label: messages['batches.freedom_fighter_info'],
      },
      {
        key: 'disability_info',
        label: messages['batches.disability_info'],
      },
      {
        key: 'ssc_passing_info',
        label: messages['batches.ssc_passing_info'],
      },
      {
        key: 'hsc_passing_status',
        label: messages['batches.hsc_passing_status'],
      },
      {
        key: 'honors_passing_info',
        label: messages['batches.honors_passing_info'],
      },
      {
        key: 'masters_passing_info',
        label: messages['batches.masters_passing_info'],
      },
      {
        key: 'occupation_info',
        label: messages['batches.occupation_info'],
      },
      {
        key: 'guardian_info',
        label: messages['batches.guardian_info'],
      },
    ],
    [messages],
  );
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      course_id: yup
        .string()
        .trim()
        .required()
        .label(messages['course.label'] as string),
      training_center_id: yup
        .string()
        .trim()
        .required()
        .label(messages['training_center.label'] as string),
      number_of_seats: yup
        .string()
        .trim()
        .required()
        .label(messages['batches.total_seat'] as string),
      registration_start_date: yup
        .string()
        .trim()
        .required()
        .label(messages['batches.registration_start_date'] as string),
      registration_end_date: yup
        .string()
        .trim()
        .required()
        .label(messages['batches.registration_end_date'] as string),
      batch_start_date: yup
        .string()
        .trim()
        .required()
        .label(messages['batches.start_date'] as string),
      batch_end_date: yup
        .string()
        .trim()
        .required()
        .label(messages['batches.end_date'] as string),
    });
  }, [messages]);
  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Batch>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        course_id: itemData?.course_id,
        programme_id: itemData?.programme_id,
        institute_id: itemData?.institute_id,
        branch_id: itemData?.branch_id,
        training_center_id: itemData?.training_center_id,
        registration_start_date: itemData?.registration_start_date
          ? getMomentDateFormat(itemData.registration_start_date, 'YYYY-MM-DD')
          : '',
        registration_end_date: itemData?.registration_end_date
          ? getMomentDateFormat(itemData.registration_end_date, 'YYYY-MM-DD')
          : '',
        batch_start_date: itemData?.batch_start_date
          ? getMomentDateFormat(itemData.batch_start_date, 'YYYY-MM-DD')
          : '',
        batch_end_date: itemData?.batch_end_date
          ? getMomentDateFormat(itemData.batch_end_date, 'YYYY-MM-DD')
          : '',
        number_of_seats: itemData?.number_of_seats,
        available_seats: itemData?.available_seats,
        trainers: getTrainerIds(itemData?.trainers),
        row_status: String(itemData?.row_status),
      });

      setBranchFilters({
        row_status: RowStatus.ACTIVE,
        institute_id: itemData?.institute_id,
      });
      setProgrammeFilters({
        row_status: RowStatus.ACTIVE,
        institute_id: itemData?.institute_id,
      });

      setCoursesFilters({
        row_status: RowStatus.ACTIVE,
        institute_id: itemData?.institute_id,
      });

      setTrainingCenterFilters({
        row_status: RowStatus.ACTIVE,
        branch_id: itemData?.branch_id,
      });

      setValuesOfConfigs(itemData?.dynamic_form_field);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const getTrainerIds = (trainers: Array<Trainer>) => {
    return trainers.map((item: Trainer) => item.id);
  };

  const onInstituteChange = useCallback((instituteId: number) => {
    setBranchFilters({
      row_status: RowStatus.ACTIVE,
      institute_id: instituteId,
    });
    setProgrammeFilters({
      row_status: RowStatus.ACTIVE,
      institute_id: instituteId,
    });

    setCoursesFilters({
      row_status: RowStatus.ACTIVE,
      institute_id: instituteId,
    });
  }, []);

  const onBranchChange = useCallback((branchId: number) => {
    setTrainingCenterFilters({
      row_status: RowStatus.ACTIVE,
      branch_id: branchId,
    });
  }, []);

  const setValuesOfConfigs = (config: string | undefined | null) => {
    try {
      let configJson = JSON.parse(config || '{}');
      let itemsState: any = [];
      let itemsRequiredState: any = [];
      Object.keys(configJson || {}).map((key: string) => {
        let value = configJson[key];
        if (value[0]) {
          itemsState.push(key);
        }
        if (value[1]) {
          itemsRequiredState.push(key);
        }
      });
      setConfigItemsState(itemsState);
      setConfigRequiredItems(itemsRequiredState);
    } catch (e) {
      console.log('Failed to parse config data', e);
    }
  };
  const getConfigInfoData = (config: any) => {
    let configJson: any = {};
    Object.keys(config).map((key: any) => {
      configJson[key] = [
        configItemsState.includes(key),
        configRequiredItems.includes(key),
      ];
    });

    return JSON.stringify(configJson);
  };

  const onSubmit: SubmitHandler<Batch> = async (data: Batch) => {
    data.dynamic_form_field = getConfigInfoData(data.dynamic_form_field);
    const response = itemId
      ? await updateBatch(itemId, data)
      : await createBatch(data);

    let assignTrainersResponse;
    if (itemId && isEdit) {
      assignTrainersResponse = await assignTrainersToBatch(
        itemId,
        data.trainers,
      );
    } else {
      assignTrainersResponse = await assignTrainersToBatch(
        response.data.id,
        data.trainers,
      );
    }
    if (isResponseSuccess(response) && !isEdit && assignTrainersResponse) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='batches.label' />}}
        />,
      );
      props.onClose();
      refreshDataTable();
    } else if (
      isResponseSuccess(response) &&
      isEdit &&
      assignTrainersResponse
    ) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='batches.label' />}}
        />,
      );
      mutateBatch();
      props.onClose();
      refreshDataTable();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconBatch />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='batches.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='batches.label' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitutes}
            control={control}
            options={institutes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onInstituteChange}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='branch_id'
            label={messages['branch.label']}
            isLoading={isLoadingBranches}
            control={control}
            options={branches}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onBranchChange}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='programme_id'
            label={messages['programme.label']}
            isLoading={isLoadingProgrammes}
            control={control}
            options={programmes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='training_center_id'
            label={messages['training_center.label']}
            isLoading={isLoadingTrainingCenters}
            control={control}
            options={trainingCenters}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='course_id'
            label={messages['course.label']}
            isLoading={isLoadingCourses}
            control={control}
            options={courses}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomDateTimeField
            id='registration_start_date'
            label={messages['batches.registration_start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomDateTimeField
            id='registration_end_date'
            label={messages['batches.registration_end_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomDateTimeField
            id='batch_start_date'
            label={messages['batches.start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomDateTimeField
            id='batch_end_date'
            label={messages['batches.end_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomTextInput
            id='number_of_seats'
            label={messages['batches.total_seat']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='available_seats'
            label={messages['batches.available_seat']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='trainers'
            label={messages['trainers.label']}
            isLoading={isLoadingTrainers}
            control={control}
            options={trainers}
            optionValueProp='id'
            optionTitleProp={['trainer_name_en', 'trainer_name_bn']}
            errorInstance={errors}
            multiple={true}
            defaultValue={initialValues.trainers}
          />
        </Grid>

        <Grid item container xs={12}>
          {configItemList.map((item: any, index: any) => {
            let states = [...configItemsState];
            return (
              <Grid item container xs={6} style={{minHeight: 40}} key={index}>
                <Grid item xs={5} style={{marginTop: 5}}>
                  <CustomCheckbox
                    id={`dynamic_form_field[${item.key}]`}
                    label={item.label}
                    checked={states.includes(item.key)}
                    isLoading={isLoading}
                    register={register}
                    errorInstance={errors}
                    onChange={() => {
                      let itemStates = [...configItemsState];
                      if (itemStates.includes(item.key)) {
                        itemStates = itemStates.filter(
                          (key: any) => key != item.key,
                        );
                      } else {
                        itemStates.push(item.key);
                      }
                      setConfigItemsState(itemStates);
                    }}
                  />
                </Grid>

                {states.includes(item.key) && (
                  <Grid item xs={4}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={configRequiredItems.includes(item.key)}
                          onChange={() => {
                            let requiredStates = [...configRequiredItems];
                            if (requiredStates.includes(item.key)) {
                              requiredStates = requiredStates.filter(
                                (key: any) => key != item.key,
                              );
                            } else {
                              requiredStates.push(item.key);
                            }
                            setConfigRequiredItems(requiredStates);
                          }}
                          color='primary'
                        />
                      }
                      label={
                        configRequiredItems.includes(item.key)
                          ? messages['common.required']
                          : messages['common.not_required']
                      }
                    />
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>

        <Grid item xs={6}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default BatchAddEditPopup;
