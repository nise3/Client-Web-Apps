import yup from '../../../@softbd/libs/yup';
import {Button, FormControlLabel, Grid, Switch} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {
  useFetchBranches,
  useFetchCourse,
  useFetchInstitutes,
  useFetchProgrammes,
} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import {LANGUAGE_MEDIUM, LEVEL} from './CourseEnums';
import {useFetchYouthSkills} from '../../../services/youthManagement/hooks';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import CourseConfigKeys from '../../../@softbd/utilities/CourseConfigKeys';

interface CourseAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  institute_id: '',
  branch_id: '',
  program_id: '',
  level: '',
  language_medium: '',
  code: '',
  course_fee: '',
  duration: '',
  skills: [],
  row_status: '1',
};

const CourseAddEditPopup: FC<CourseAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateCourse,
  } = useFetchCourse(itemId);
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

  const [youthSkillsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchYouthSkills(youthSkillsFilter);

  const [configItemsState, setConfigItemsState] = useState<any>([]);
  const [configRequiredItems, setConfigRequiredItems] = useState<any>([]);
  const [isEducationChecked, setIsEducationChecked] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
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
      level: yup
        .string()
        .trim()
        .required()
        .label(messages['course.course_level'] as string),
      language_medium: yup
        .string()
        .trim()
        .required()
        .label(messages['course.language_medium'] as string),
      skills: yup
        .array()
        .of(yup.number())
        .min(1)
        .label(messages['common.skills'] as string),
    });
  }, [messages]);

  const configItemList = useMemo(
    () => [
      {
        key: CourseConfigKeys.ETHNIC_GROUP_KEY,
        label: messages['course.ethnic_group_info'],
        isVisible: true,
      },
      {
        key: CourseConfigKeys.FREEDOM_FIGHTER_KEY,
        label: messages['course.freedom_fighter_info'],
        isVisible: true,
      },
      {
        key: CourseConfigKeys.DISABILITY_KEY,
        label: messages['course.disability_info'],
        isVisible: true,
      },
      {
        key: CourseConfigKeys.EDUCATION_KEY,
        label: messages['course.education_info'],
        isVisible: true,
      },
      {
        key: CourseConfigKeys.EDUCATION_PSC_KEY,
        label: messages['course.psc_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.EDUCATION_JSC_KEY,
        label: messages['course.jsc_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.EDUCATION_SSC_KEY,
        label: messages['course.ssc_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.EDUCATION_HSC_KEY,
        label: messages['course.hsc_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.EDUCATION_DIPLOMA_KEY,
        label: messages['course.diploma_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.EDUCATION_HONOURS_KEY,
        label: messages['course.honors_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.EDUCATION_MASTERS_KEY,
        label: messages['course.masters_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.EDUCATION_PHD_KEY,
        label: messages['course.phd_passing_info'],
        isVisible: isEducationChecked,
      },
      {
        key: CourseConfigKeys.OCCUPATION_KEY,
        label: messages['course.occupation_info'],
        isVisible: true,
      },
      {
        key: CourseConfigKeys.GUARDIAN_KEY,
        label: messages['course.guardian_info'],
        isVisible: true,
      },
      {
        key: CourseConfigKeys.MISCELLANEOUS_KEY,
        label: messages['course.miscellaneous_info'],
        isVisible: true,
      },
    ],
    [messages, isEducationChecked],
  );

  const levels = useMemo(
    () => [
      {
        id: LEVEL.BEGINNER,
        label: messages['level.beginner'],
      },
      {
        id: LEVEL.INTERMEDIATE,
        label: messages['level.intermediate'],
      },
      {
        id: LEVEL.EXPERT,
        label: messages['level.expert'],
      },
    ],
    [messages],
  );

  const languageMedium = useMemo(
    () => [
      {
        id: LANGUAGE_MEDIUM.BN,
        label: messages['language.bn'],
      },
      {
        id: LANGUAGE_MEDIUM.EN,
        label: messages['language.en'],
      },
    ],
    [messages],
  );

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
        code: itemData?.code,
        institute_id: itemData?.institute_id,
        branch_id: itemData?.branch_id,
        program_id: itemData?.program_id,
        level: itemData?.level,
        language_medium: itemData?.language_medium,
        course_fee: itemData?.course_fee,
        duration: itemData?.duration,
        overview: itemData?.overview,
        overview_en: itemData?.overview_en,
        objectives: itemData?.objectives,
        objectives_en: itemData?.objectives_en,
        target_group: itemData?.target_group,
        target_group_en: itemData?.target_group_en,
        training_methodology: itemData?.training_methodology,
        training_methodology_en: itemData?.training_methodology_en,
        evaluation_system: itemData?.evaluation_system,
        evaluation_system_en: itemData?.evaluation_system_en,
        eligibility: itemData?.eligibility,
        eligibility_en: itemData?.eligibility_en,
        prerequisite: itemData?.prerequisite,
        prerequisite_en: itemData?.prerequisite_en,
        row_status: String(itemData?.row_status),
        skills: getSkillIds(itemData?.skills),
      });
      setValuesOfConfigs(itemData?.application_form_settings);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const getSkillIds = (skills: any) => {
    return skills.map((item: any) => item.id);
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
          if (key == CourseConfigKeys.EDUCATION_KEY) {
            setIsEducationChecked(true);
          }
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

  const onInstituteChange = useCallback((instituteId: number) => {
    setBranchFilters({
      row_status: RowStatus.ACTIVE,
      institute_id: instituteId,
    });
    setProgrammeFilters({
      row_status: RowStatus.ACTIVE,
      institute_id: instituteId,
    });
  }, []);

  const onSubmit: SubmitHandler<Course> = async (data: Course) => {
    data.application_form_settings = getConfigInfoData(
      data.application_form_settings,
    );
    console.log(data);
    try {
      if (itemId) {
        await updateCourse(itemId, data);
        updateSuccessMessage('course.label');
        mutateCourse();
      } else {
        await createCourse(data);
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
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='code'
            label={messages['course.code']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <CustomTextInput
            id='course_fee'
            label={messages['course.fee']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6} sm={3} md={3}>
          <CustomTextInput
            id='duration'
            label={messages['course.duration']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitutes}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={onInstituteChange}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            id='branch_id'
            label={messages['branch.label']}
            isLoading={isLoadingBranches}
            control={control}
            options={branches}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            id='program_id'
            label={messages['programme.label']}
            isLoading={isLoadingProgrammes}
            control={control}
            options={programmes}
            optionValueProp='id'
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            id='skills'
            label={messages['common.select_your_skills']}
            isLoading={isLoadingSkills}
            control={control}
            options={skills}
            multiple={true}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            defaultValue={[]}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            id='level'
            label={messages['course.course_level']}
            isLoading={false}
            control={control}
            options={levels}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            id='language_medium'
            label={messages['course.language_medium']}
            isLoading={false}
            control={control}
            options={languageMedium}
            optionValueProp='id'
            optionTitleProp={['label']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='overview'
            label={messages['course.overview']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='overview_en'
            label={messages['course.overview_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
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
        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='target_group_en'
            label={messages['course.target_group_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
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

        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='objectives_en'
            label={messages['course.objectives_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
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

        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='training_methodology_en'
            label={messages['course.training_methodology_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='evaluation_system'
            label={messages['course.evaluation_system']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='evaluation_system_en'
            label={messages['course.evaluation_system_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
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

        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='prerequisite_en'
            label={messages['course.prerequisite_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
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

        <Grid item xs={12} sm={6} md={6}>
          <CustomTextInput
            id='eligibility_en'
            label={messages['course.eligibility_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
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
          {configItemList.map((item: any, index: any) => {
            let states = [...configItemsState];
            return item.isVisible ? (
              <Grid item container xs={6} style={{minHeight: 40}} key={index}>
                <Grid item xs={5} style={{marginTop: 5}}>
                  <CustomCheckbox
                    id={`application_form_settings[${item.key}]`}
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
                        if (item.key == CourseConfigKeys.EDUCATION_KEY) {
                          setIsEducationChecked(false);
                        }
                      } else {
                        itemStates.push(item.key);
                        if (item.key == CourseConfigKeys.EDUCATION_KEY) {
                          setIsEducationChecked(true);
                        }
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
            ) : (
              <></>
            );
          })}
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default CourseAddEditPopup;
