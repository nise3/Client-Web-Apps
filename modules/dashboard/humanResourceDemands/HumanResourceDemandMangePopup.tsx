import React, {FC, useEffect, useMemo} from 'react';
import IconGallery from '../../../@softbd/icons/IconGallery';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {useIntl} from 'react-intl';
import {
  useFetchHrDemand,
  useFetchInstituteTraineeYouths,
} from '../../../services/instituteManagement/hooks';
import {updateHrDemand} from '../../../services/instituteManagement/HrDemandService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {Grid} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import RejectButton from './RejectButton';

interface HumanResourceDemandMangePopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const HumanResourceDemandMangePopup: FC<HumanResourceDemandMangePopupProps> = ({
  itemId,
  refreshDataTable,
  onClose,
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const {updateSuccessMessage} = useSuccessMessage();
  const {data: itemData} = useFetchHrDemand(itemId);

  const {data: youths} = useFetchInstituteTraineeYouths();

  console.log('youths: ', youths);
  const validationSchema = useMemo(() => {
    return yup.object().shape({
      cv_links: yup
        .array()
        .of(yup.string())
        .label(messages['common.cv_links'] as string),
    });
  }, [messages]);
  const {
    register,
    setError,
    setValue,
    handleSubmit,
    control,
    getValues,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {}, []);
  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await updateHrDemand(itemId, data);
        updateSuccessMessage('hr_demand.label');
      }
      onClose();
      refreshDataTable();
      console.log('data: ', data);
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  console.log('errors: ', errors);
  console.log('getvalues: ', getValues('cv_links'));
  return (
    <HookFormMuiModal
      open={true}
      title={
        <>
          <IconGallery />

          <IntlMessages
            id='common.manage'
            values={{subject: <IntlMessages id='hr_demand.label' />}}
          />
        </>
      }
      onClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <RejectButton
            onClick={onClose}
            label={messages['common.reject'] as string}
          />
          <SubmitButton
            label={messages['common.approve'] as string}
            isSubmitting={isSubmitting}
          />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            id='youth_ids'
            label={messages['common.youths']}
            isLoading={false}
            control={control}
            options={youths}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id={'cv_links'}
            defaultFileUrl={itemData?.cv_links}
            setValue={setValue}
            register={register}
            label={messages['common.cv_links']}
            errorInstance={errors}
            allowMultiple={true}
            acceptedFileTypes={['application/pdf']}
            uploadedUrls={getValues('cv_links')}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};

export default HumanResourceDemandMangePopup;
