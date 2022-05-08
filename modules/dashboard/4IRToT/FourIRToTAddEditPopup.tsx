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

//import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRCS} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
// import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
//import {createCS, updateCS} from '../../../services/4IRManagement/CSService';

interface ToTAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  master_trainer_name: '',
  master_trainer_mobile: '',
  master_trainer_address: '',
  master_trainer_email: '',
  organiser_name: '',
  organiser_mobile: '',
  organiser_address: '',
  organiser_email: '',
  co_organiser_name: '',
  co_organiser_mobile: '',
  co_organiser_address: '',
  co_organiser_email: '',
  row_status: '1',
};

const FourIRToTAddEditPopup: FC<ToTAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  //const linkRef = useRef<any>();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  //const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [fileLinks, setFileLinks] = useState<any>([]);
  const {
    data: itemData,
    isLoading,
    //mutate: mutateProject,
  } = useFetch4IRCS(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      master_trainer_name: yup
        .string()
        .title()
        .label(messages['common.name'] as string),
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
  } = useForm<any>({
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
        master_trainer_name: itemData?.master_trainer_name,
        master_trainer_mobile: itemData?.master_trainer_mobile,
        master_trainer_address: itemData?.master_trainer_address,
        master_trainer_email: itemData?.master_trainer_email,
        organiser_name: itemData?.organiser_name,
        organiser_mobile: itemData?.organiser_mobile,
        organiser_address: itemData?.organiser_address,
        organiser_email: itemData?.organiser_email,
        co_organiser_name: itemData?.co_organiser_name,
        co_organiser_mobile: itemData?.co_organiser_mobile,
        co_organiser_address: itemData?.co_organiser_address,
        co_organiser_email: itemData?.co_organiser_email,
        row_status: itemData?.row_status,
        //projects: urlPaths,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      /*if (itemId) {
        await updateCS(itemId, data);
        updateSuccessMessage('4ir_tot.label');
        mutateProject();
      } else {
        await createCS(data);
        createSuccessMessage('4ir_tot.label');
      }*/
      console.log(data);
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  /*const urlToFile = (url: any, filename: any, mimeType: any) => {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, {type: mimeType});
      });
  };*/

  /*  const fileDownloadHandler = async () => {
    try {
      console.log('downloaded');
    } catch (e) {
      console.log(e);
    }
  };*/

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
              values={{subject: <IntlMessages id='4ir_tot.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='4ir_tot.label' />}}
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3 style={{marginTop: '2px', marginBottom: '0', color: 'gray'}}>
            {messages['4ir_tot.master_trainer']}
          </h3>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='master_trainer_name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='master_trainer_mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='master_trainer_address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='master_trainer_email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <h3 style={{marginTop: '2px', marginBottom: '0', color: 'gray'}}>
            {messages['4ir_tot.organiser']}
          </h3>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='organiser_name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organiser_mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organiser_address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='organiser_email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        {/*<Grid item xs={12}>
          <Typography variant={'h6'}>
            {messages['4ir_tot.co_organiser']}
          </Typography>
        </Grid>*/}
        <Grid item xs={12}>
          <h3 style={{marginTop: '2px', marginBottom: '0', color: 'gray'}}>
            {messages['4ir_tot.co_organiser']}
          </h3>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='co_organiser_name'
            label={messages['common.name']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='co_organiser_mobile'
            label={messages['common.mobile']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='co_organiser_address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='co_organiser_email'
            label={messages['common.email']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='participants'
            defaultFileUrl={fileLinks}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['4ir_tot.participants']}
            required={false}
            // uploadedUrls={watch('projects')}
          />
        </Grid>
        {/*<Grid item xs={12} md={6} mt={4}>
          <CommonButton
            key={1}
            onClick={() => fileDownloadHandler()}
            btnText={messages['common.download'] as string}
            variant={'outlined'}
            color={'primary'}
            sx={{width: '300px', height: '60px'}}
          />
        </Grid>*/}
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
export default FourIRToTAddEditPopup;
