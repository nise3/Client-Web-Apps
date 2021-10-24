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
import {
  useFetchBatch,
  useFetchBranches,
  useFetchCourses,
  useFetchInstitutes,
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

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      institute_id: yup
        .string()
        .trim()
        .required()
        .label(messages['institute.label'] as string),
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
      available_seats: yup
        .string()
        .trim()
        .required()
        .label(messages['batches.available_seat'] as string),
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

      setCoursesFilters({
        row_status: RowStatus.ACTIVE,
        institute_id: itemData?.institute_id,
      });

      setTrainingCenterFilters({
        row_status: RowStatus.ACTIVE,
        branch_id: itemData?.branch_id,
      });
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

  const onSubmit: SubmitHandler<Batch> = async (data: Batch) => {
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
            optionTitleProp={['trainer_name_en', 'trainer_name']}
            errorInstance={errors}
            multiple={true}
            defaultValue={initialValues.trainers}
          />
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
