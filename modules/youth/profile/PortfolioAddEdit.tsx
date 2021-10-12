import {Card, CardContent, Grid, Zoom} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {DialogTitle} from '../../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useFetchPortfolio} from '../../../services/youthManagement/hooks';
import {
  createPortfolio,
  updatePortfolio,
} from '../../../services/youthManagement/PortfolioService';

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
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const {data: itemData, mutate: mutatePortfolio} = useFetchPortfolio(itemId);
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn')
        .label(messages['common.title_bn'] as string),
    });
  }, [messages]);

  console.log(itemData);
  console.log(itemId);
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title: itemData.title,
        title_en: itemData?.title_en,
        description: itemData?.description,
        description_en: itemData?.description_en,
        file_path: itemData?.file_path,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updatePortfolio(itemId, data)
      : await createPortfolio(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      mutatePortfolio();
      props.onClose();
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
      props.onClose();
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Zoom in={true}>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item>
          <Card>
            <CardContent sx={{position: 'relative'}}>
              <DialogTitle onClose={props.onClose}>
                {messages['common.portfolio']}
              </DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='title_en'
                      label={messages['common.title_en']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='title'
                      label={messages['common.title_bn']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <CustomTextInput
                      id='description'
                      label={messages['common.description_bn']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
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
                      isLoading={false}
                      multiline={true}
                      rows={3}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='upload_file'
                      label={messages['upload_file.portfolio_modal']}
                      type={'file'}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={4} justifyContent={'flex-end'}>
                      <Grid item>
                        <CancelButton
                          onClick={props.onClose}
                          isLoading={false}
                        />
                      </Grid>
                      <Grid item>
                        <SubmitButton
                          isSubmitting={isSubmitting}
                          isLoading={false}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Zoom>
  );
};

export default PortfolioAddEdit;
