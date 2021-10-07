import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {setServerValidationErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  createRankType,
  updateRankType,
} from '../../../services/organaizationManagement/RankTypeService';
import yup from '../../../@softbd/libs/yup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {Grid, Box, Card, CardContent} from '@mui/material';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {DialogTitle} from '../../../@softbd/modals/CustomMuiModal/CustomMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';

interface EducationAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const exams = [
  {id: 1, title: 'HSC'},
  {id: 2, title: 'SSC'},
  {id: 3, title: 'BSC'},
  {id: 4, title: 'MSC'},
];

const boards = [
  {id: 1, title: 'Dhaka'},
  {id: 2, title: 'Rajshahi'},
  {id: 3, title: 'Chittagong'},
  {id: 4, title: 'Barisal'},
];

const groups = [
  {id: 1, title: 'science'},
  {id: 2, title: 'arts'},
  {id: 3, title: 'commerce'},
];

const resultTypes = [
  {id: 1, title: 'Grade'},
  {id: 2, title: 'Class'},
];

const passingYears = () => {
  let passingYearsArray = [];
  for (let i = 2021; i > 1971; i--) {
    passingYearsArray.push({year: i});
  }
  return passingYearsArray;
};

const initialValues = {
  exam: '',
  board: '',
  institution: '',
  roll_no: '',
  reg_no: '',
  group: '',
  result_type: '',
  result: '',
  passing_year: '',
};

const EducationAddEditPage: FC<EducationAddEditPageProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      exam: yup
        .string()
        .label(messages['education.exam'] as string)
        .required(),
      board: yup.string().label(messages['education.board'] as string),
      institution: yup
        .string()
        .label(messages['education.institution'] as string),
      roll_no: yup.string().label(messages['education.roll_no'] as string),
      reg_no: yup.string().label(messages['education.reg_no'] as string),
      group: yup.string().label(messages['education.group'] as string),
      result_type: yup
        .string()
        .label(messages['education.result_type'] as string),
      result: yup.string().label(messages['education.result'] as string),
      passing_year: yup
        .string()
        .label(messages['education.passing_year'] as string),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [itemData, setItemData] = useState<any>(null);
  const isEdit = itemId != null;

  console.log('item id: ', itemId);

  useEffect(() => {
    if (itemId) {
      setItemData({
        exam: 'HSC',
        board: '1',
        institution: 'S.X college',
        roll_no: '227289',
        reg_no: '8494937',
        group: '1',
        result_type: 'Grade',
        result: '5',
        passing_year: '1773',
      });
    }
  }, [itemId]);

  useEffect(() => {
    if (itemData) {
      reset({
        exam: itemData.exam,
        board: itemData?.board,
        institution: itemData?.institution,
        roll_no: itemData?.roll_no,
        reg_no: itemData?.reg_no,
        group: itemData?.group,
        result_type: itemData?.result_type,
        result: itemData?.result,
        passing_year: itemData?.passing_year,
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
        <Grid item>
          <Card>
            <CardContent sx={{position: 'relative'}}>
              <DialogTitle onClose={props.onClose}>
                {messages['common.education']}
              </DialogTitle>
              <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
                <Grid container spacing={5}>
                  <Grid item xs={12} md={6}>
                    <CustomFormSelect
                      id={'exam'}
                      label={messages['education.exam']}
                      isLoading={false}
                      control={control}
                      options={exams}
                      optionValueProp={'id'}
                      optionTitleProp={['title']}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomFormSelect
                      id={'board'}
                      label={messages['education.board']}
                      isLoading={false}
                      control={control}
                      options={boards}
                      optionValueProp={'id'}
                      optionTitleProp={['title']}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='institution'
                      label={messages['institute.label']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='roll_no'
                      label={messages['education.roll_no']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='reg_no'
                      label={messages['education.reg_no']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomFormSelect
                      id={'group'}
                      label={messages['education.group']}
                      isLoading={false}
                      control={control}
                      options={groups}
                      optionValueProp={'id'}
                      optionTitleProp={['title']}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomFormSelect
                      id={'result_type'}
                      label={messages['education.result_type']}
                      isLoading={false}
                      control={control}
                      options={resultTypes}
                      optionValueProp={'id'}
                      optionTitleProp={['title']}
                      errorInstance={errors}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomTextInput
                      id='result'
                      label={messages['education.result']}
                      register={register}
                      errorInstance={errors}
                      isLoading={false}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <CustomFormSelect
                      id={'passing_year'}
                      label={messages['education.passing_year']}
                      isLoading={false}
                      control={control}
                      options={passingYears()}
                      optionValueProp={'year'}
                      optionTitleProp={['year']}
                      errorInstance={errors}
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
    </Box>
  );
};

export default EducationAddEditPage;
