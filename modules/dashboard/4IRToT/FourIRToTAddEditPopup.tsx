import yup from '../../../@softbd/libs/yup';
import {Grid, Link} from '@mui/material';
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
import {useFetchFourIRToT} from '../../../services/4IRManagement/hooks';
import {MOBILE_NUMBER_REGEX} from '../../../@softbd/common/patternRegex';
import MasterTrainerFieldArray from './MasterTrainerFieldArray';
import {createToT, updateToT} from '../../../services/4IRManagement/ToTService';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DownloadIcon from '@mui/icons-material/Download';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import FileUploadComponent from '../../filepond/FileUploadComponent';

interface ToTAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
  fourIRInitiativeId: number;
}

const initialValues = {
  master_trainers: [{}],
  organizer_name: '',
  organizer_address: '',
  organizer_email: '',
  co_organizer_name: '',
  co_organizer_address: '',
  co_organizer_email: '',
  row_status: '1',
  participants: '',
  tot_date: '',
  proof_of_report_file: '',
};

const FourIRToTAddEditPopup: FC<ToTAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  fourIRInitiativeId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);

  const {data: itemData, isLoading, mutate: mutate} = useFetchFourIRToT(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      master_trainers: yup.array().of(
        yup.object().shape({
          name: yup
            .string()
            .trim()
            .required()
            .label(messages['common.name'] as string),
          organization_name: yup
            .string()
            .required()
            .label(messages['common.organization'] as string),
          designation: yup
            .string()
            .required()
            .label(messages['common.designation'] as string),
          mobile: yup
            .string()
            .trim()
            .required()
            .label(messages['common.mobile'] as string)
            .matches(MOBILE_NUMBER_REGEX),
          email: yup
            .string()
            .email()
            .required()
            .label(messages['common.email'] as string),
        }),
      ),
      organizer_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.name'] as string),
      organizer_address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
      organizer_email: yup
        .string()
        .email()
        .required()
        .label(messages['common.email'] as string),

      co_organizer_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.name'] as string),
      co_organizer_address: yup
        .string()
        .trim()
        .required()
        .label(messages['common.address'] as string),
      co_organizer_email: yup
        .string()
        .email()
        .required()
        .label(messages['common.email'] as string),
      tot_date: yup
        .string()
        .required()
        .label(messages['4ir.tot_date'] as string),
      proof_of_report_file: yup
        .string()
        .required()
        .label(messages['tot.proof_of_report_file'] as string),
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
      reset({
        master_trainers: getMasterTrainers(itemData?.master_trainers),
        organizer_name: itemData?.organizer_name,
        organizer_address: itemData?.organizer_address,
        organizer_email: itemData?.organizer_email,
        co_organizer_name: itemData?.co_organizer_name,
        co_organizer_address: itemData?.co_organizer_address,
        co_organizer_email: itemData?.co_organizer_email,
        row_status: itemData?.row_status,
        tot_date: itemData?.tot_date,
        proof_of_report_file: itemData?.proof_of_report_file,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append('four_ir_initiative_id', String(fourIRInitiativeId));

      Object.keys(data).forEach((field) => {
        if (data?.[field]) {
          if (field == 'participants') {
            formData.append(field, data[field]?.[0]);
          } else if (field == 'master_trainers') {
            formData.append('master_trainers', JSON.stringify(data[field]));
          } else {
            formData.append(field, data[field]);
          }
        }
      });

      if (itemId) {
        await updateToT(itemId, formData);
        updateSuccessMessage('4ir_tot.label');
        mutate();
        await closeAction();
      } else {
        await createToT(formData);
        createSuccessMessage('4ir_tot.label');
        setShowSuccessPopUp(true);
        await closeAction();
      }
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const getMasterTrainers = (masterTrainers: any) => {
    if (!masterTrainers || masterTrainers?.length < 1) return [];

    return (masterTrainers || []).map((item: any) => {
      return {
        name: item?.name,
        designation: item?.designation,
        organization_name: item?.organization_name,
        organization_name_en: item?.organization_name_en,
        mobile: item?.mobile,
        email: item?.email,
      };
    });
  };

  const emptyFile = (fileId: any) => {
    setValue(fileId, '');
  };

  const fileUploadHandler = (files: any, fileId: any) => {
    if (files.length < 1) {
      emptyFile(fileId);
      return;
    }

    if (
      files[0].type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      emptyFile(fileId);
      errorStack(messages['common.only_xlsx_file']);
      return;
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
          <Grid container spacing={2} sx={{marginTop: '3px'}}>
            {
              <MasterTrainerFieldArray
                id={`master_trainers`}
                register={register}
                errors={errors}
                control={control}
                isLoading={isLoading}
              />
            }
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <h3 style={{marginTop: '2px', marginBottom: '0', color: 'gray'}}>
            {messages['4ir_tot.organiser']}
          </h3>
          <Grid container spacing={2} sx={{marginTop: '3px'}}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='organizer_name'
                label={messages['common.name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='organizer_address'
                label={messages['common.address']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='organizer_email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <h3 style={{marginTop: '2px', marginBottom: '0', color: 'gray'}}>
            {messages['4ir_tot.co_organiser']}
          </h3>
          <Grid container spacing={2} sx={{marginTop: '3px'}}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='co_organizer_name'
                label={messages['common.name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='co_organizer_address'
                label={messages['common.address']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='co_organizer_email'
                label={messages['common.email']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={5}>
            <h3 style={{marginTop: '2px', marginBottom: '0', color: 'gray'}}>
              {messages['4ir_tot.participants']}
            </h3>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <CustomTextInput
                  required
                  id='participants'
                  name='participants'
                  label={''}
                  register={register}
                  type={'file'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(files: any) =>
                    fileUploadHandler(files, 'participants')
                  }
                  errorInstance={errors}
                />
              </Grid>

              <Grid item container xs={'auto'} spacing={5}>
                <Grid item>
                  <Link
                    href='/template/perticipient-list.xlsx'
                    download
                    underline={'none'}>
                    <CommonButton
                      key={1}
                      onClick={() => console.log('file downloading')}
                      btnText={'4ir_tot.participants'}
                      variant={'outlined'}
                      color={'primary'}
                      startIcon={<DownloadIcon />}
                    />
                  </Link>
                </Grid>
                <Grid item>
                  <CommonButton
                    key={1}
                    onClick={() => emptyFile('participants')}
                    btnText={'common.remove'}
                    variant={'outlined'}
                    color={'secondary'}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={6} mt={5}>
          <CustomDateTimeField
            required
            id='tot_date'
            label={messages['4ir.tot_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6} md={6}>
          <FileUploadComponent
            id='proof_of_report_file'
            defaultFileUrl={itemData?.proof_of_report_file}
            errorInstance={errors}
            setValue={setValue}
            register={register}
            label={messages['tot.proof_of_report_file']}
            required={true}
            acceptedFileTypes={[
              'image/*',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            ]}
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
      {showSuccessPopUp && fourIRInitiativeId && (
        <SuccessPopup
          closeAction={closeAction}
          stepNo={8}
          initiativeId={fourIRInitiativeId}
          completionStep={8}
          formStep={10}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRToTAddEditPopup;
