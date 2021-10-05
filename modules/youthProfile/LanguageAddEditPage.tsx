import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {
  isResponseSuccess,
  isValidationError,
} from '../../@softbd/utilities/helpers';
import SubmitButton from '../../@softbd/elements/button/SubmitButton/SubmitButton';
import IntlMessages from '../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../services/organaizationManagement/RankTypeService';
import yup from '../../@softbd/libs/yup';
import useNotiStack from '../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRadioButtons from '../../@softbd/elements/input/CustomRadioButtonGroup/FormRadioButtons';
import YouthProfileNavigationSidebar from './component/YouthProfileNavigationSidebar';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Container,
} from '@mui/material';
import LanguageProficiencyViewPage from './LanguageProficiencyViewPage';
import HorizontalLine from './component/HorizontalLine';
import {useRouter} from 'next/router';

interface LanguageAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const languages = [
  {id: 1, title_en: 'English'},
  {id: 2, title_en: 'Bengali'},
];
const initialValues = {
  language: '',
  read: '',
  write: '',
  speak: '',
  understand: '',
};

const LanguageAddEditPage: FC<LanguageAddEditPageProps> = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const router = useRouter();
  const {languageId} = router.query;

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      language: yup.string().label(messages['language.label'] as string),
      read: yup.string().label(messages['language.read'] as string),
      write: yup.string().label(messages['language.write'] as string),
      speak: yup.string().label(messages['language.speak'] as string),
      understand: yup.string().label(messages['language.understand'] as string),
    });
  }, [messages]);

  const {
    control,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData, setItemData] = useState<any>(null);
  const itemId = Number(languageId);
  const isEdit = itemId != null;

  useEffect(() => {
    if (Number(languageId)) {
      setItemData({
        language: '1',
        read: '1',
        write: '2',
        speak: '1',
        understand: '2',
      });
    }
  }, [languageId]);

  useEffect(() => {
    if (itemData) {
      reset({
        language: itemData.language,
        read: itemData?.read,
        write: itemData?.write,
        speak: itemData?.speak,
        understand: itemData?.understand,
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
    } else if (isResponseSuccess(response) && !isEdit) {
      successStack(
        <IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='rank_types.label' />}}
        />,
      );
    } else if (isValidationError(response)) {
      setServerValidationErrors(response.errors, setError, validationSchema);
    }
  };

  return (
    <Container maxWidth={'lg'}>
      <Box mt={4} mb={2}>
        <Grid container justifyContent={'center'} spacing={2}>
          <Grid item md={4}>
            <YouthProfileNavigationSidebar />
          </Grid>
          <Grid item md={8}>
            <Card>
              <CardContent>
                <Typography variant={'h6'} mb={4}>
                  {messages['language.label']}
                </Typography>

                <LanguageProficiencyViewPage />
                <HorizontalLine />

                <Typography variant={'h6'} mb={4}>
                  {itemId ? (
                    <IntlMessages
                      id='common.edit'
                      values={{subject: <IntlMessages id='language.label' />}}
                    />
                  ) : (
                    <IntlMessages
                      id='common.add_new'
                      values={{subject: <IntlMessages id='language.label' />}}
                    />
                  )}
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                  <Grid container spacing={5}>
                    <Grid item xs={12}>
                      <CustomFormSelect
                        id={'language'}
                        isLoading={false}
                        control={control}
                        options={languages}
                        optionValueProp={'id'}
                        optionTitleProp={['title_en']}
                        errorInstance={errors}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormRadioButtons
                        id='read'
                        label={'language.read'}
                        radios={[
                          {
                            key: '1',
                            label: messages['common.easily'],
                          },
                          {
                            key: '2',
                            label: messages['common.not_easily'],
                          },
                        ]}
                        control={control}
                        defaultValue={initialValues.read}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormRadioButtons
                        id='write'
                        label={'language.write'}
                        radios={[
                          {
                            key: '1',
                            label: messages['common.easily'],
                          },
                          {
                            key: '2',
                            label: messages['common.not_easily'],
                          },
                        ]}
                        control={control}
                        defaultValue={initialValues.write}
                        isLoading={false}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormRadioButtons
                        id='speak'
                        label={'language.speak'}
                        radios={[
                          {
                            key: '1',
                            label: messages['common.fluent'],
                          },
                          {
                            key: '2',
                            label: messages['common.not_fluent'],
                          },
                        ]}
                        control={control}
                        defaultValue={initialValues.speak}
                        isLoading={false}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FormRadioButtons
                        id='understand'
                        label={'language.understand'}
                        radios={[
                          {
                            key: '1',
                            label: messages['common.easily'],
                          },
                          {
                            key: '2',
                            label: messages['common.not_easily'],
                          },
                        ]}
                        control={control}
                        defaultValue={initialValues.understand}
                        isLoading={false}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SubmitButton
                        isSubmitting={isSubmitting}
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
    </Container>
  );
};

export default LanguageAddEditPage;
