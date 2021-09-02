import * as yup from 'yup';
import {Button, Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import {
  createCourse,
  getCourse,
  updateCourse,
} from '../../../services/instituteManagement/CourseService';
import IconCourse from '../../../@softbd/icons/IconProgramme';

interface CourseAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required('Enter title (En)'),
  title_bn: yup
    .string()
    .trim()
    .required('Enter title (Bn)')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
  institute_id: yup.string().trim().required(),
  code: yup.string().trim().required('Enter code'),
  course_fee: yup.string().required('Enter course fee'),
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

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  institute_id: 0,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [institutes, setInstitutes] = useState<Array<Institute> | []>([]);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Course>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let item = await getCourse(itemId);
        reset({
          title_en: item?.title_en,
          title_bn: item?.title_bn,
          institute_id: item?.institute_id,
          code: item?.code,
          course_fee: item?.course_fee,
          duration: item?.duration,
          description: item?.description,
          objectives: item?.objectives,
          target_group: item?.target_group,
          eligibility: item?.eligibility,
          prerequisite: item?.prerequisite,
          training_methodology: item?.training_methodology,
          contents: item?.contents,
          row_status: String(item?.row_status),
        });
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
      loadInstitutes();
    })();
  }, [itemId]);

  const loadInstitutes = async () => {
    setInstitutes(await getAllInstitutes());
  };

  const onSubmit: SubmitHandler<Course> = async (data: Course) => {
    if (isEdit && itemId) {
      let response = await updateCourse(itemId, data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='course.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createCourse(data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='course.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
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
      maxWidth={'sm'}
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
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoading}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
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
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='objectives'
            label={messages['course.objectives']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='contents'
            label={messages['course.contents']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='training_methodology'
            label={messages['course.training_methodology']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='prerequisite'
            label={messages['course.prerequisite']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='eligibility'
            label={messages['course.eligibility']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
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
      </Grid>
    </HookFormMuiModal>
  );
};
export default CourseAddEditPopup;
