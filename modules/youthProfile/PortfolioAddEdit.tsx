import {Box, Card, CardContent, Grid, Typography} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import YouthProfileNavigationSidebar from './component/YouthProfileNavigationSidebar';

interface PortfolioAddEditProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  upload_link: '',
  title: '',
  description: '',
  upload_file: '',
};

const PortfolioAddEdit: FC<PortfolioAddEditProps> = ({itemId, ...props}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      upload_link: yup
        .string()
        .label(messages['upload_link.portfolio_modal'] as string),
      title: yup.string().label(messages['common.title'] as string),
      description: yup
        .string()
        .label(messages['common.description'] as string),
      upload_file: yup
        .string()
        .label(messages['upload_file.portfolio_modal'] as string),
    });
  }, [messages]);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    if (itemId) {
      setItemData({
        upload_link: 'link.com',
        title: 'Title',
        description: 'This is description',
      });
    }
  }, [itemId]);

  useEffect(() => {
    if (itemData) {
      reset({
        upload_link: itemData.upload_link,
        title: itemData?.title,
        description: itemData?.description,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data) => {
    const response = itemId
      ? await updateRankType(itemId, data)
      : await createRankType(data);
    if (isResponseSuccess(response) && isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
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
    <Box mt={4} mb={2}>
      <Grid container justifyContent={'center'} spacing={2}>
        <Grid item xs={3}>
          <YouthProfileNavigationSidebar />
        </Grid>
        <Grid item xs={5}>
          <Card>
            <CardContent>
              <Typography variant={'h6'} mb={4}>
                {isEdit ? (messages['personal_info_edit.label']) : (messages['common.add_new_portfolio'])}
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='upload_link'
                      label={messages['upload_link.portfolio_modal']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='title'
                      label={messages['common.title']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <CustomTextInput
                      id='description'
                      label={messages['common.description']}
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
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PortfolioAddEdit;
