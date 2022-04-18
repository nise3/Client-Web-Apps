import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRCS} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {
  createCurriculum,
  updateCurriculum,
} from '../../../services/4IRManagement/CurriculumService';

interface CurriculumAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  project: '',
};

const FourIRCurriculumAddEditPopup: FC<CurriculumAddEditPopupProps> = ({
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
      project: yup
        .string()
        .title()
        .label(messages['4ir_curriculum.label'] as string),
    });
  }, [messages]);

  const {
    //control,
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
      let files = itemData?.project;
      /**To fetch active cv paths**/
      files.map((file: any) => {
        urlPaths.push(file.file_link);
      });
      setFileLinks(urlPaths);

      reset({
        project: urlPaths,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await updateCurriculum(itemId, data);
        updateSuccessMessage('4ir_curriculum.label');
        mutateProject();
      } else {
        await createCurriculum(data);
        createSuccessMessage('4ir_curriculum.label');
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
              values={{subject: <IntlMessages id='4ir_curriculum.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_curriculum.label' />}}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'md' : 'sm'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container>
        <Grid item xs={12}>
          <FileUploadComponent
            required
            id='project'
            defaultFileUrl={fileLinks}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['4ir_curriculum.label']}
            //uploadedUrls={watch('project')}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRCurriculumAddEditPopup;
