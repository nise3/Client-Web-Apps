import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

//import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRCS} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
//import {createCS, updateCS} from '../../../services/4IRManagement/CSService';
import {useFetchPublicPrograms} from '../../../services/instituteManagement/hooks';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {LANGUAGE_MEDIUM, LEVEL} from '../courses/CourseEnums';
import {useFetchPublicSkills} from '../../../services/youthManagement/hooks';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';

interface CACAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  fee: '',
  hour: '',
  language_medium: '',
  //skills: [],
  level: '',
  program_id: '',
  target_group: '',
  objectives: '',
  overview: '',
  training_methodology: '',
  evaluation_system: '',
  prerequisite: '',
  eligibility: '',
  cover_image: '',
  row_status: '1',
};

const FourIRCACAddEditPopup: FC<CACAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  //const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [
    fileLinks,
    // setFileLinks
  ] = useState<any>([]);
  const [skillFilter] = useState<any>({});
  const [programmeFilters] = useState<any>({});
  const {
    data: itemData,
    isLoading,
    //mutate: mutateProject,
  } = useFetch4IRCS(itemId);

  const {data: skills, isLoading: isLoadingSkills} =
    useFetchPublicSkills(skillFilter);
  const {data: programmes, isLoading: isLoadingProgrammes} =
    useFetchPublicPrograms(programmeFilters);
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .label(messages['common.title'] as string),
    });
  }, [messages]);
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

  const {
    control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      let urlPaths: any = [];
      let files = itemData?.projects;
      /**To fetch active cv paths**/
      files.map((file: any) => {
        urlPaths.push(file.file_link);
      });
      //setFileLinks(urlPaths);

      reset({
        title: itemData?.title,
        fee: itemData?.fee,
        hour: itemData?.hour,
        language_medium: itemData?.language_medium,
        skills: itemData?.skills,
        level: itemData?.level,
        program_id: itemData?.program_id,
        target_group: itemData?.target_group,
        objectives: itemData?.objectives,
        overview: itemData?.overview,
        training_methodology: itemData?.training_methodology,
        evaluation_system: itemData?.evaluation_system,
        prerequisite: itemData?.prerequisite,
        eligibility: itemData?.eligibility,
        cover_image: itemData?.cover_image,
        row_status: itemData?.row_status,
        //projects: urlPaths,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      /*if (itemId) {
        await updateCS(itemId, data);
        updateSuccessMessage('4ir_cac.add_edit');
        mutateProject();
      } else {
        await createCS(data);
        createSuccessMessage('4ir_cac.add_edit');
      }*/
      console.log(data);
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
          <IconBranch />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='4ir_cac.add_edit' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_cac.add_edit' />}}
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
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='fee'
            label={messages['course.fee']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='hour'
            label={messages['common.hour']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            //required
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
        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            //required
            id={'skills'}
            label={messages['common.skills']}
            isLoading={isLoadingSkills}
            options={skills}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <CustomFormSelect
            //required
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='target_group'
            label={messages['course_details.target_group']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='objectives'
            label={messages['course.objectives']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='training_methodology'
            label={messages['course_details.training_methodology']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='prerequisite'
            label={messages['course.prerequisite']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='eligibility'
            label={messages['course.eligibility']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='cover_image'
            defaultFileUrl={fileLinks}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['course.cover_image']}
            required={false}
            // uploadedUrls={watch('projects')}
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
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRCACAddEditPopup;
