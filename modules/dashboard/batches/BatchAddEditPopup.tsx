import React, {FC, useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {isResponseSuccess} from '../../../@softbd/common/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@material-ui/core/Grid';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import * as yup from 'yup';
import {
  createBatch,
  getBatch,
  updateBatch,
} from '../../../services/instituteManagement/BatchService';
import IconBatch from '../../../@softbd/icons/IconBatch';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {getAllBranches} from '../../../services/instituteManagement/BranchService';
import {getAllProgrammes} from '../../../services/instituteManagement/ProgrammeService';
import {getAllTrainingCenters} from '../../../services/instituteManagement/TrainingCenterService';
import {getAllCourses} from '../../../services/instituteManagement/CourseService';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';

interface BatchAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({});

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
};

const configItemList = [
  {
    key: 'ethnic_group_info',
    label: 'Ethnic Group Info',
  },
  {
    key: 'freedom_fighter_info',
    label: 'Freedom Fighter Info',
  },
  {
    key: 'disability_info',
    label: 'Disability Info',
  },
  {
    key: 'ssc_passing_info',
    label: 'SSC Passing Info',
  },
  {
    key: 'hsc_passing_status',
    label: 'HSC Passing Info',
  },
  {
    key: 'honors_passing_info',
    label: 'Honours Passing Info',
  },
  {
    key: 'masters_passing_info',
    label: 'Masters Passing Info',
  },
  {
    key: 'occupation_info',
    label: 'Occupation Info',
  },
  {
    key: 'guardian_info',
    label: 'Guardian Info',
  },
];

const BatchAddEditPopup: FC<BatchAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [institutes, setInstitutes] = useState<Array<Institute>>([]);
  const [trainingCenters, setTrainingCenters] = useState<Array<TrainingCenter>>(
    [],
  );
  const [programmes, setProgrammes] = useState<Array<Programme>>([]);
  const [branches, setBranches] = useState<Array<Branch>>([]);
  const [courses, setCourses] = useState<Array<Course>>([]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let response = await getBatch(itemId);
        if (response) {
          let {data: item} = response;
          reset({
            course_id: item?.course_id,
            programme_id: item?.programme_id,
            institute_id: item?.institute_id,
            branch_id: item?.branch_id,
            training_center_id: item?.training_center_id,
            registration_start_date: item?.registration_start_date,
            registration_end_date: item?.registration_end_date,
            batch_start_date: item?.batch_start_date,
            batch_end_date: item?.batch_end_date,
            number_of_seats: item?.number_of_seats,
            available_seats: item?.available_seats,
            row_status: String(item?.row_status),
          });
          onInstituteChange(item?.institute_id);
          onBranchChange(item?.branch_id);
        }
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      await loadInstituteData();
    })();
    setIsLoading(false);
  }, []);

  const loadInstituteData = async () => {
    let response = await getAllInstitutes({
      row_status: RowStatus.ACTIVE,
    });
    if (response) {
      setInstitutes(response.data);
    }
  };

  const onInstituteChange = useCallback((instituteId: number) => {
    loadBranchByInstitute(instituteId);
    loadProgrammeByInstitute(instituteId);
    loadCourseByInstitute(instituteId);
  }, []);

  const onBranchChange = useCallback((branchId: number) => {
    loadTrainingCenterByBranch(branchId);
  }, []);

  const loadBranchByInstitute = (instituteId: number) => {
    (async () => {
      let response = await getAllBranches({
        row_status: RowStatus.ACTIVE,
        institute_id: instituteId,
      });
      if (response) {
        setBranches(response.data);
      }
    })();
  };

  const loadProgrammeByInstitute = (instituteId: number) => {
    (async () => {
      let response = await getAllProgrammes({
        row_status: RowStatus.ACTIVE,
        institute_id: instituteId,
      });
      if (response) {
        setProgrammes(response.data);
      }
    })();
  };

  const loadTrainingCenterByBranch = (branchId: number) => {
    (async () => {
      let response = await getAllTrainingCenters({
        row_status: RowStatus.ACTIVE,
        branch_id: branchId,
      });
      if (response) {
        setTrainingCenters(response.data);
      }
    })();
  };

  const loadCourseByInstitute = (instituteId: number) => {
    (async () => {
      let response = await getAllCourses({
        row_status: RowStatus.ACTIVE,
        institute_id: instituteId,
      });
      if (response) {
        setCourses(response.data);
      }
    })();
  };

  const onSubmit: SubmitHandler<Batch> = async (data: Batch) => {
    if (isEdit && itemId) {
      let response = await updateBatch(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='batches.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createBatch(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='batches.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
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
            isLoading={isLoading}
            control={control}
            options={institutes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={onInstituteChange}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='branch_id'
            label={messages['branch.label']}
            isLoading={isLoading}
            control={control}
            options={branches}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={onBranchChange}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='programme_id'
            label={messages['programme.label']}
            isLoading={isLoading}
            control={control}
            options={programmes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='training_center_id'
            label={messages['training_center.label']}
            isLoading={isLoading}
            control={control}
            options={trainingCenters}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFormSelect
            id='course_id'
            label={messages['course.label']}
            isLoading={isLoading}
            control={control}
            options={courses}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title_bn']}
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
