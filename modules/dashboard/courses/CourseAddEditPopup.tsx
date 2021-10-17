import yup from '../../../@softbd/libs/yup';
import {Button, FormControlLabel, Grid, Switch} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  createCourse,
  updateCourse,
} from '../../../services/instituteManagement/CourseService';
import IconCourse from '../../../@softbd/icons/IconProgramme';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  useFetchCourse,
  useFetchInstitutes,
} from '../../../services/instituteManagement/hooks';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';

interface CourseAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  id: '',
  title_en: '',
  title: '',
  institute_id: '',
  code: '',
  course_fee: '',
  duration: '',
  description: '',
  objectives: '',
  target_group: '',
  eligibility: '',
  prerequisite: '',
  training_methodology: '',
  contents: '',
  row_status: '1',
};

const CourseAddEditPopup: FC<CourseAddEditPopupProps> = ({
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
    mutate: mutateCourse,
  } = useFetchCourse(itemId);
  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitutes(instituteFilters);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title_en: yup
        .string()
        .title('en')
        .label(messages['common.title_en'] as string),
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
      institute_id: yup
        .string()
        .trim()
        .required()
        .label(messages['institute.label'] as string),
      code: yup
        .string()
        .trim()
        .required()
        .label(messages['common.code'] as string),
      course_fee: yup
        .string()
        .required()
        .label(messages['course.fee'] as string),
      duration: yup.string(),
      description: yup.string(),
      target_group: yup.string(),
      objectives: yup.string(),
      training_methodology: yup.string(),
      evaluation_system: yup.string(),
      prerequisite: yup.string(),
      eligibility: yup.string(),
      cover_image: yup.string(),
    });
  }, [messages]);
  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Course>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        institute_id: itemData?.institute_id,
        code: itemData?.code,
        course_fee: itemData?.course_fee,
        duration: itemData?.duration,
        description: itemData?.description,
        objectives: itemData?.objectives,
        target_group: itemData?.target_group,
        eligibility: itemData?.eligibility,
        prerequisite: itemData?.prerequisite,
        training_methodology: itemData?.training_methodology,
        contents: itemData?.contents,
        row_status: String(itemData?.row_status),
      });
      setValuesOfConfigs(itemData?.dynamic_form_field);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

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

  const onSubmit: SubmitHandler<Course> = async (data: Course) => {
    data.dynamic_form_field = getConfigInfoData(data.dynamic_form_field);
    const response = itemId
      ? await updateCourse(itemId, data)
      : await createCourse(data);

    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='course.label' />}}
        />,
      );
      mutateCourse();
      props.onClose();
      refreshDataTable();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='course.label' />}}
        />,
      );
      props.onClose();
      refreshDataTable();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconCourse />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='course.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='course.label' />}}
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
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitutes}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='code'
            label={messages['course.code']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='course_fee'
            label={messages['course.fee']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='duration'
            label={messages['course.duration']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='target_group'
            label={messages['course.target_group']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='objectives'
            label={messages['course.objectives']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contents'
            label={messages['course.contents']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='training_methodology'
            label={messages['course.training_methodology']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='prerequisite'
            label={messages['course.prerequisite']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='eligibility'
            label={messages['course.eligibility']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
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
        <Grid item xs={12}>
          <input
            id='cover_image'
            name='btn-upload'
            style={{display: 'none'}}
            type='file'
          />
          <Button className='btn-choose' variant='outlined' component='span'>
            Cover Image
          </Button>
        </Grid>
        <Grid item container xs={12}>
          {/*/////////////////////////////*/}
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
      </Grid>
    </HookFormMuiModal>
  );
};
export default CourseAddEditPopup;
