import React, {useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {Button, Grid} from '@mui/material';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import yup from '../../../@softbd/libs/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useIntl} from 'react-intl';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomTimePicker from '../../../@softbd/elements/input/TimePicker';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
//import {useFetchOrganizations} from '../../../services/organaizationManagement/hooks';

const FourIRShowcasingPage = () => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage} = useSuccessMessage();
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      organization_name: yup
        .string()
        .title()
        .label(messages['common.organization_name'] as string),
    });
  }, [messages]);

  /*const {data: organizationData, isLoading: isLoadingOrganizationData} =
    useFetchOrganizations({});
  const [selectedOrganizationList, setSelectedOrganizationList] = useState<any>(
    [],
  );
  const onOrganizationChange = useCallback((options) => {
    setSelectedOrganizationList(options);
  }, []);*/

  const {
    control,
    register,
    //reset,
    setError,
    handleSubmit,
    formState: {errors},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      // await createCell(data);
      createSuccessMessage('4ir_showcasing.label');

      /* props.onClose();
      refreshDataTable();*/
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir_showcasing.label' />
          </>
        }>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
          <Grid container spacing={5} mt={1}>
            <Grid item xs={12} md={6}>
              <CustomSelectAutoComplete
                required
                id='organization_name'
                label={messages['common.organization_name']}
                //isLoading={isLoadingOrganizationData}
                control={control}
                //options={organizationData}
                optionValueProp='id'
                optionTitleProp={['title']}
                //defaultValue={selectedOrganizationList}
                errorInstance={errors}
                //onChange={onOrganizationChange}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTimePicker
                id='start_time'
                label={messages['common.start_time']}
                register={register}
              />
            </Grid>
            <Grid item xs={3}>
              <CustomTimePicker
                id='end_time'
                label={messages['common.end_time']}
                register={register}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomDateTimeField
                id='date'
                label={messages['common.date']}
                register={register}
                errorInstance={errors}
                //isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='invite_others'
                label={messages['4ir_showcasing.invite_others']}
                register={register}
                errorInstance={errors}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='venue'
                label={messages['common.venue']}
                register={register}
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='event_description'
                label={messages['common.event_description']}
                register={register}
                errorInstance={errors}
                multiline={true}
                rows={3}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent={'center'}>
                <Button
                  type={'submit'}
                  //disabled={isSubmitting || isFormSubmitted}
                  variant='contained'>
                  {messages['common.submit']}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </PageBlock>
    </>
  );
};

export default FourIRShowcasingPage;
