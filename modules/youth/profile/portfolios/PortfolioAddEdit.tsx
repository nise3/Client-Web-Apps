import {Box, Grid, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useFetchPortfolio} from '../../../../services/youthManagement/hooks';
import {
  createPortfolio,
  updatePortfolio,
} from '../../../../services/youthManagement/PortfolioService';
import CustomHookForm from '../component/CustomHookForm';
import {YouthPortfolio} from '../../../../services/youthManagement/typing';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import FileUploadComponent from '../../../filepond/FileUploadComponent';

interface PortfolioAddEditProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  description: '',
  description_en: '',
  file_path: '',
};

const PortfolioAddEdit: FC<PortfolioAddEditProps> = ({itemId, ...props}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const {
    data: itemData,
    mutate: mutatePortfolio,
    isLoading,
  } = useFetchPortfolio(itemId);

  console.log('data port----', itemData);
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

      file_path: yup
        .string()
        .required()
        .label(messages['common.file_upload'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<YouthPortfolio>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title: itemData?.title,
        title_en: itemData?.title_en,
        description: itemData?.description,
        description_en: itemData?.description_en,
        file_path: itemData?.file_path,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: YouthPortfolio) => {
    console.log('data-------', data);

    try {
      if (itemId) {
        await updatePortfolio(itemId, data);
        updateSuccessMessage('portfolio.label');
      } else {
        await createPortfolio(data);
        createSuccessMessage('portfolio.label');
      }
      mutatePortfolio();
      props.onClose();
    } catch (error: any) {
      console.log('errors----', error);
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['portfolio.label']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton onClick={props.onClose} isLoading={isLoading} />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={props.onClose}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CustomTextInput
                required
                id='title'
                label={messages['common.title']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextInput
                id='title_en'
                label={messages['common.title_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
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

            <Grid item xs={12}>
              <CustomTextInput
                id='description_en'
                label={messages['common.description_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <FileUploadComponent
                id='file_path'
                defaultFileUrl={itemData?.file_path}
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['upload_file.portfolio_modal']}
                required={true}
              />
            </Grid>
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default PortfolioAddEdit;
