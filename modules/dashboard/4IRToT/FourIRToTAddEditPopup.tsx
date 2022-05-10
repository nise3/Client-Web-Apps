import yup from '../../../@softbd/libs/yup';
import {Button, ButtonGroup, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
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
import {AddCircleOutline, RemoveCircleOutline} from '@mui/icons-material';
import OrganiserFieldArray from './OrganiserFieldArray';
import CoOrganizerFieldArray from './CoOrganizerFieldArray';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
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
  row_status: '1',
  participants: '',
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
  //const [fileLinks, setFileLinks] = useState<any>([]);
  const [organisers, setOrganisers] = useState<any>([1]);
  const [coOrganisers, setCoOrganisers] = useState<any>([1]);
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
      organiser_info: yup.array().of(
        yup.object().shape({
          organiser_name: yup
            .string()
            .title()
            .label(messages['common.name'] as string),
          organiser_mobile: yup
            .string()
            .trim()
            .required()
            .label(messages['common.mobile'] as string)
            .matches(MOBILE_NUMBER_REGEX),
          organiser_address: yup
            .string()
            .title()
            .label(messages['common.address'] as string),
          organiser_email: yup
            .string()
            .email()
            .required()
            .label(messages['common.email'] as string),
        }),
      ),
      co_organiser_info: yup.array().of(
        yup.object().shape({
          co_organiser_name: yup
            .string()
            .title()
            .label(messages['common.name'] as string),
          co_organiser_mobile: yup
            .string()
            .trim()
            .required()
            .label(messages['common.mobile'] as string)
            .matches(MOBILE_NUMBER_REGEX),
          co_organiser_address: yup
            .string()
            .title()
            .label(messages['common.address'] as string),
          co_organiser_email: yup
            .string()
            .email()
            .required()
            .label(messages['common.email'] as string),
        }),
      ),
    });
  }, [messages]);

  const {
    control,
    register,
    reset,
    setError,
    getValues,
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

  const addNewOrganiser = useCallback(() => {
    setOrganisers((prev: any) => [...prev, prev.length + 1]);
  }, []);

  const removeOrganiser = useCallback(() => {
    let organiserInfos = getValues('organiser_info');

    let array = [...organisers];
    if (organisers.length > 1) {
      organiserInfos?.splice(organisers.length - 1, 1);
      setValue('organiser_info', organiserInfos);
      array.splice(organisers.length - 1, 1);
      setOrganisers(array);
    }
  }, [organisers]);

  const addNewCoOrganiser = useCallback(() => {
    setCoOrganisers((prev: any) => [...prev, prev.length + 1]);
  }, []);

  const removeCoOrganiser = useCallback(() => {
    let coOrganiserInfos = getValues('co_organiser_info');

    let array = [...coOrganisers];
    if (coOrganisers.length > 1) {
      coOrganiserInfos?.splice(coOrganisers.length - 1, 1);
      setValue('co_organiser_info', coOrganiserInfos);
      array.splice(coOrganisers.length - 1, 1);
      setCoOrganisers(array);
    }
  }, [coOrganisers]);

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
          <Grid container spacing={2} sx={{marginTop: '3px'}}>
            {organisers.map((organiser: any, index: number) => (
              <OrganiserFieldArray
                id={`organiser_info[${index}]`}
                key={index}
                register={register}
                errors={errors}
                resetOrganiser={reset}
                data={itemData}
                initialValues={initialValues}
                isLoading={isLoading}
              />
            ))}
            <Grid item xs={12} display={'flex'} justifyContent='flex-end'>
              <ButtonGroup
                color='primary'
                aria-label='outlined primary button group'>
                <Button onClick={addNewOrganiser}>
                  <AddCircleOutline />
                </Button>
                <Button
                  onClick={removeOrganiser}
                  disabled={organisers.length < 2}>
                  <RemoveCircleOutline />
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <h3 style={{marginTop: '2px', marginBottom: '0', color: 'gray'}}>
            {messages['4ir_tot.co_organiser']}
          </h3>
          <Grid container spacing={2} sx={{marginTop: '3px'}}>
            {coOrganisers.map((co_organiser: any, index: number) => (
              <CoOrganizerFieldArray
                id={`co_organiser_info[${index}]`}
                key={index}
                register={register}
                errors={errors}
                resetCoOrganiser={reset}
                data={itemData}
                initialValues={initialValues}
                isLoading={isLoading}
              />
            ))}
            <Grid item xs={12} display={'flex'} justifyContent='flex-end'>
              <ButtonGroup
                color='primary'
                aria-label='outlined primary button group'>
                <Button onClick={addNewCoOrganiser}>
                  <AddCircleOutline />
                </Button>
                <Button
                  onClick={removeCoOrganiser}
                  disabled={coOrganisers.length < 2}>
                  <RemoveCircleOutline />
                </Button>
              </ButtonGroup>
            </Grid>
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
          <Grid item xs={12} mt={2}>
            <FormRowStatus
              id='row_status'
              control={control}
              defaultValue={initialValues.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRToTAddEditPopup;
