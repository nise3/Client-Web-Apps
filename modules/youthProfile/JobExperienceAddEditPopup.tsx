import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {
  isNeedToSelectOrganization,
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import CancelButton from '../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../@crema/utility/IntlMessages';
import IconRankType from '../../@softbd/icons/IconRankType';
import HookFormMuiModal from '../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';

interface JobExperienceAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  company_name: '',
  position: '',
  type_of_employee: '',
  location: '',
  job_description: '',
  start_date: '',
  end_date: '',
};

const JobExperienceAddEditPopup: FC<JobExperienceAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      company_name: yup
        .string()
        .label(messages['common.company_name'] as string),
      position: yup.string().label(messages['common.position'] as string),
      type_of_employee: yup
        .string()
        .label(messages['common.type_of_employee'] as string),
      location: yup.string().label(messages['common.location'] as string),
      job_description: yup
        .string()
        .label(messages['common.job_description'] as string),
      start_date: yup.string().label(messages['common.start_date'] as string),
      end_date: yup.string().label(messages['common.end_date'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<RankType>({
    resolver: yupResolver(validationSchema),
  });

  let itemData = {};

  if (itemId) {
    itemData = {
      company_name: 'softbd ltd',
      position: 'software engineer',
      type_of_employee: 'full time',
      location: 'dhaka 1232',
      job_description: 'building web apps',
      start_date: '12 oct 2993',
      end_date: '12 oct 2993',
    };
  }

  // useEffect(() => {
  //   if (itemData) {
  //     reset({
  //       company_name: itemData?.company_name,
  //       position: itemData?.position,
  //       type_of_employee: itemData?.type_of_employee,
  //       location: itemData?.location,
  //       job_description: itemData?.job_description,
  //       start_date: itemData?.start_date,
  //       end_date: itemData?.end_date,
  //     });
  //   } else {
  //     reset(initialValues);
  //   }
  // }, [itemData]);
  //
  // const onSubmit: SubmitHandler<RankType> = async (data: RankType) => {
  //   const response = itemId
  //     ? await updateRankType(itemId, data)
  //     : await createRankType(data);
  //   if (isResponseSuccess(response) && isEdit) {
  //     successStack(
  //       <IntlMessages
  //         id='common.subject_updated_successfully'
  //         values={{subject: <IntlMessages id='rank_types.label' />}}
  //       />,
  //     );
  //     mutateRankType();
  //     props.onClose();
  //   } else if (isResponseSuccess(response) && !isEdit) {
  //     successStack(
  //       <IntlMessages
  //         id='common.subject_created_successfully'
  //         values={{subject: <IntlMessages id='rank_types.label' />}}
  //       />,
  //     );
  //     props.onClose();
  //   } else if (isValidationError(response)) {
  //     setServerValidationErrors(response.errors, setError, validationSchema);
  //   }
  // };
  //
  // return (
  //   <HookFormMuiModal
  //     open={true}
  //     {...props}
  //     title={
  //       <>
  //         <IconRankType />
  //         {isEdit ? (
  //           <IntlMessages
  //             id='common.edit'
  //             values={{subject: <IntlMessages id='rank_types.label' />}}
  //           />
  //         ) : (
  //           <IntlMessages
  //             id='common.add_new'
  //             values={{subject: <IntlMessages id='rank_types.label' />}}
  //           />
  //         )}
  //       </>
  //     }
  //     maxWidth={'sm'}
  //     handleSubmit={handleSubmit(onSubmit)}
  //     actions={
  //       <>
  //         <CancelButton onClick={props.onClose} isLoading={isLoading} />
  //         <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
  //       </>
  //     }>
  //     <Grid container spacing={5}>
  //       <Grid item xs={6}>
  //         <CustomTextInput
  //           id='title_en'
  //           label={messages['common.title_en']}
  //           register={register}
  //           errorInstance={errors}
  //           isLoading={isLoading}
  //         />
  //       </Grid>
  //       <Grid item xs={6}>
  //         <CustomTextInput
  //           id='title_bn'
  //           label={messages['common.title_bn']}
  //           register={register}
  //           errorInstance={errors}
  //           isLoading={isLoading}
  //         />
  //       </Grid>
  //       {authUser && isNeedToSelectOrganization(authUser) && (
  //         <Grid item xs={6}>
  //           <CustomFormSelect
  //             id='organization_id'
  //             label={messages['organization.label']}
  //             isLoading={isLoadingOrganizations}
  //             control={control}
  //             options={organizations}
  //             optionValueProp={'id'}
  //             optionTitleProp={['title_en', 'title_bn']}
  //             errorInstance={errors}
  //           />
  //         </Grid>
  //       )}
  //
  //       <Grid item xs={6}>
  //         <CustomTextInput
  //           id='description'
  //           label={messages['common.description']}
  //           register={register}
  //           errorInstance={errors}
  //           isLoading={isLoading}
  //           multiline={true}
  //           rows={3}
  //         />
  //       </Grid>
  //     </Grid>
  //   </HookFormMuiModal>
  // );
  return <></>;
};

export default JobExperienceAddEditPopup;
