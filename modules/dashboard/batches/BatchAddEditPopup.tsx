import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  getMomentDateFormat,
  isResponseSuccess,
} from '../../../@softbd/common/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@material-ui/core/Grid';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import * as yup from 'yup';
import {
  assignTrainersToBatch,
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
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {FormControlLabel, Switch} from '@material-ui/core';
import {getAllTrainers} from '../../../services/instituteManagement/TrainerService';

interface BatchAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  course_id: yup.string().trim().required().label('Course'),
  training_center_id: yup.string().trim().required().label('Training Center'),
  number_of_seats: yup.string().trim().required().label('Training Center'),
  registration_start_date: yup
    .string()
    .trim()
    .required()
    .label('Registration start date'),
  registration_end_date: yup
    .string()
    .trim()
    .required()
    .label('Registration end date'),
  batch_start_date: yup.string().trim().required().label('Batch start date'),
  batch_end_date: yup.string().trim().required().label('Batch end date'),
});

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [institutes, setInstitutes] = useState<Array<Institute>>([]);
  const [trainingCenters, setTrainingCenters] = useState<Array<TrainingCenter>>(
    [],
  );
  const [programmes, setProgrammes] = useState<Array<Programme>>([]);
  const [branches, setBranches] = useState<Array<Branch>>([]);
  const [courses, setCourses] = useState<Array<Course>>([]);
  const [configItemsState, setConfigItemsState] = useState<any>([]);
  const [configRequiredItems, setConfigRequiredItems] = useState<any>([]);
  const [trainers, setTrainers] = useState<Array<Trainer>>([]);

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
            registration_start_date: item?.registration_start_date
              ? getMomentDateFormat(item.registration_start_date, 'YYYY-MM-DD')
              : '',
            registration_end_date: item?.registration_end_date
              ? getMomentDateFormat(item.registration_end_date, 'YYYY-MM-DD')
              : '',
            batch_start_date: item?.batch_start_date
              ? getMomentDateFormat(item.batch_start_date, 'YYYY-MM-DD')
              : '',
            batch_end_date: item?.batch_end_date
              ? getMomentDateFormat(item.batch_end_date, 'YYYY-MM-DD')
              : '',
            number_of_seats: item?.number_of_seats,
            available_seats: item?.available_seats,
            trainers: getTrainerIds(item?.trainers),
            row_status: String(item?.row_status),
          });
          onInstituteChange(item?.institute_id);
          onBranchChange(item?.branch_id);
          setValuesOfConfigs(item?.dynamic_form_field);
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
      await loadTrainersData();
    })();
    setIsLoading(false);
  }, []);

  const getTrainerIds = (trainers: Array<Trainer>) => {
    let ids = trainers.map((item: Trainer) => item.id);
    return ids;
  };

  const loadTrainersData = async () => {
    let response = await getAllTrainers({
      row_status: RowStatus.ACTIVE,
    });
    if (response) {
      setTrainers(response.data);
    }
  };

  const loadInstituteData = async () => {
    let response = await getAllInstitutes({
      row_status: RowStatus.ACTIVE,
    });
    if (response) {
      setInstitutes(response.data);
    }
  };

  const onInstituteChange = useCallback((instituteId: number) => {
    if (instituteId) {
      loadBranchByInstitute(instituteId);
      loadProgrammeByInstitute(instituteId);
      loadCourseByInstitute(instituteId);
    } else {
      setBranches([]);
      setProgrammes([]);
      setCourses([]);
      setTrainingCenters([]);
    }
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
        setTrainingCenters([]);
      } else {
        setBranches([]);
        setTrainingCenters([]);
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
      } else {
        setProgrammes([]);
      }
    })();
  };

  const loadTrainingCenterByBranch = (branchId: number) => {
    (async () => {
      if (branchId) {
        let response = await getAllTrainingCenters({
          row_status: RowStatus.ACTIVE,
          branch_id: branchId,
        });
        if (response) {
          setTrainingCenters(response.data);
        } else {
          setTrainingCenters([]);
        }
      } else {
        setTrainingCenters([]);
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
      } else {
        setCourses([]);
      }
    })();
  };

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

    if (isEdit && itemId) {
      let response = await updateBatch(itemId, data);
      let assignTrainersResponse = await assignTrainersToBatch(
        itemId,
        data.trainers,
      );
      if (isResponseSuccess(response) && assignTrainersResponse) {
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
      let assignTrainersResponse = await assignTrainersToBatch(
        response.data.id,
        data.trainers,
      );
      if (isResponseSuccess(response) && assignTrainersResponse) {
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
          <CustomFormSelect
            id='trainers'
            label={messages['trainers.label']}
            isLoading={isLoading}
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
              <>
                <Grid container xs={6} style={{minHeight: 40}}>
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
              </>
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
