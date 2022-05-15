import React, {FC, useEffect, useMemo} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {getMomentDateFormat} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import yup from '../../../@softbd/libs/yup';
import IconBatch from '../../../@softbd/icons/IconBatch';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {useFetchExamDetails} from '../../../services/instituteManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {IBatch} from '../../../shared/Interface/institute.interface';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {Link} from '../../../@softbd/elements/common';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUserCheck} from 'react-icons/fi';
import {useRouter} from 'next/router';

interface BatchAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  youthId: number | null;
  //refreshDataTable: () => void;
}

const initialValues = {
  title_en: '',
  title: '',
  course_id: '',
  programme_id: '',
  institute_id: '',
  industry_association_id: '',
  branch_id: '',
  training_center_id: '',
  registration_start_date: '',
  registration_end_date: '',
  batch_start_date: '',
  batch_end_date: '',
  number_of_seats: '',
  // available_seats: '',
  row_status: '1',
  trainers: [],
};

const BatchAddEditPopup: FC<BatchAddEditPopupProps> = ({
  itemId,
  //refreshDataTable,
  youthId,
  ...props
}) => {
  const {messages} = useIntl();
  const router = useRouter();
  const path = router.asPath;
  const {errorStack} = useNotiStack();
  //const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  /*  const [onlineExam, setOnlineExam] = useState<any>(null);
  const [offlineExam, setOfflineExam] = useState<any>(null);*/
  const isEdit = itemId != null;
  const authUser = useAuthUser<CommonAuthUser>();
  console.log('Youth ID', youthId);
  const {
    data: itemData,
    isLoading,
    //mutate: mutateBatch,
  } = useFetchExamDetails(1);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.title'] as string),
      title_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),

      institute_id: authUser?.isSystemUser
        ? yup
            .string()
            .trim()
            .required()
            .label(messages['institute.label'] as string)
        : yup.string().nullable(),
      course_id: yup
        .string()
        .trim()
        .required()
        .label(messages['course.label'] as string),
      training_center_id:
        authUser && !authUser?.isTrainingCenterUser
          ? yup
              .string()
              .trim()
              .required()
              .label(messages['training_center.label'] as string)
          : yup.string(),
      number_of_seats: yup
        .string()
        .trim()
        .required()
        .label(messages['batches.total_seat'] as string),
      registration_start_date: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['batches.registration_start_date'] as string),
      registration_end_date: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['batches.registration_end_date'] as string),
      batch_start_date: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['batches.start_date'] as string),
      batch_end_date: yup
        .string()
        .trim()
        .required()
        .matches(/(19|20)\d\d-[01]\d-[0123]\d/)
        .label(messages['batches.end_date'] as string),
    });
  }, [messages, authUser]);

  const {
    register,
    //control,
    reset,
    setError,
    handleSubmit,
    formState: {isSubmitting},
  } = useForm<IBatch>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        course_id: itemData?.course_id,
        institute_id: itemData?.institute_id,
        industry_association_id: itemData?.industry_association_id,
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
        row_status: String(itemData?.row_status),
      });

      if (
        !authUser?.isTrainingCenterUser &&
        !authUser?.isIndustryAssociationUser
      ) {
      }
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  /*  useEffect(() => {
    itemData &&
      itemData.exams &&
      itemData.exams.map((exam: any) => {
        {
          ExamTypes.ONLINE === Number(exam?.exam_type_id)
            ? setOnlineExam(exam)
            : setOfflineExam(exam);
        }
      });
  }, [itemData]);*/

  const onSubmit: SubmitHandler<IBatch> = async (data: IBatch) => {
    /*let assignTrainersResponse;

    if (!authUser?.isSystemUser) {
      delete data.institute_id;
      delete data.industry_association_id;
    }

    if (authUser?.isTrainingCenterUser) {
      delete data.branch_id;
      delete data.training_center_id;
    }*/

    try {
      /*if (itemId) {
        await updateBatch(itemId, data);
        mutateBatch();
        assignTrainersResponse = await assignTrainersToBatch(
          itemId,
          data.trainers,
        );
        if (assignTrainersResponse) {
          updateSuccessMessage('batches.label');
        }
      } else {
        const response = await createBatch(data);
        createSuccessMessage('batches.label');
        if (
          data.trainers &&
          data.trainers.length > 0 &&
          response &&
          response.data
        ) {
          assignTrainersResponse = await assignTrainersToBatch(
            response.data.id,
            data.trainers,
          );
        }
        if (assignTrainersResponse) {
          successStack(messages['trainers.assign_success'] as string);
        }
      }
      props.onClose();
      refreshDataTable();*/
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
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
              values={{subject: <IntlMessages id='batches.marking' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='batches.marking' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.offline']}
            register={register}
            type={'number'}
            inputProps={{
              step: 1,
            }}
            //errorInstance={errors}
            disabled={false}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={5}>
            <Grid item xs={6}>
              <CustomTextInput
                required
                id='title'
                label={messages['common.online']}
                register={register}
                type={'number'}
                inputProps={{
                  step: 1,
                }}
                //errorInstance={errors}
                disabled={true}
                isLoading={isLoading}
              />
            </Grid>

            <Grid item xs={6}>
              {console.log(`pathid is: ${path}/${youthId}/marksheet/${1}`)}

              <Link href={`${path}/${youthId}/marksheet/${1}`} passHref={true}>
                <CommonButton
                  btnText={messages['batches.marksheet'] as string}
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  style={{marginLeft: '10px'}}
                  variant='outlined'
                  color='primary'
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default BatchAddEditPopup;
