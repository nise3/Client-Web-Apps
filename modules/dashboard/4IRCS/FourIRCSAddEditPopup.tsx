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

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {ICS} from '../../../shared/Interface/4IR.interface';
import {useFetch4IRCS} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {createCS, updateCS} from '../../../services/4IRManagement/CSService';

interface CSAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  experts_list: '',
  level: '',
  approved_by: '',
  organization_name: '',
  sector_name: '',
  supported_by: '',
  comment: '',
  row_status: '1',
};

const FourIRCSAddEditPopup: FC<CSAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [fileLinks, setFileLinks] = useState<any>([]);
  const {
    data: itemData,
    isLoading,
    mutate: mutateProject,
  } = useFetch4IRCS(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      experts_list: yup
        .string()
        .title()
        .label(messages['4ir_cs.experts_list'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ICS>({
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
      setFileLinks(urlPaths);

      reset({
        experts_list: itemData?.experts_list,
        level: itemData?.level,
        approved_by: itemData?.approved_by,
        organization_name: itemData?.organization_name,
        sector_name: itemData?.sector_name,
        supported_by: itemData?.supported_by,
        comment: itemData?.comment,
        row_status: itemData?.row_status,
        //projects: urlPaths,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<ICS> = async (data: ICS) => {
    try {
      if (itemId) {
        await updateCS(itemId, data);
        updateSuccessMessage('4ir_cs.label');
        mutateProject();
      } else {
        await createCS(data);
        createSuccessMessage('4ir_cs.label');
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
          <IconBranch />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='4ir_cs.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_cs.label' />}}
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
            id='experts_list'
            label={messages['4ir_cs.experts_list']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='level'
            label={messages['common.level']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='approved_by'
            label={messages['4ir_cs.approved_by']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organization_name'
            label={messages['4ir_cs.organization_name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='sector_name'
            label={messages['rpl_sector.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='supported_by'
            label={messages['4ir_cs.supported_by']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='comment'
            label={messages['common.comment']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='projects'
            defaultFileUrl={fileLinks}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['common.project']}
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
export default FourIRCSAddEditPopup;
