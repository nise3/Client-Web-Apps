import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import IconGallery from '../../../@softbd/icons/IconGallery';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {useIntl} from 'react-intl';
import {
  useFetchHrDemand,
  useFetchInstituteTraineeYouths,
} from '../../../services/instituteManagement/hooks';
import {
  rejectHrdemand,
  updateHrDemand,
} from '../../../services/instituteManagement/HrDemandService';
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
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {HrDemandApprovalStatusByInstitute} from './HrDemandEnums';
import {Body1} from '../../../@softbd/elements/common';

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
  const {successStack} = useNotiStack();
  const [isRejectDisable, setIsRejectDisable] = useState(false);
  const [isDisableSubmit, setIsDisableSubmit] = useState(false);
  const {updateSuccessMessage} = useSuccessMessage();
  const {data: itemData, mutate: mutateHrDemand} = useFetchHrDemand(itemId);

  const [cvLinks, setCvLinks] = useState<any>([]);
  const [validationMessage, setValidationMessage] = useState<any>('');
  const {data: youths} = useFetchInstituteTraineeYouths();

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      /*  cv_links: yup
        .array()
        .of(yup.string())
        .label(messages['common.cv_links'] as string),*/
    });
  }, [messages]);
  const {
    register,
    setError,
    setValue,
    handleSubmit,
    reset,
    control,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onRejectAction = useCallback(
    async (itemId: any) => {
      console.log('itemId: ', itemId);
      let response = await rejectHrdemand(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_rejected'
            values={{subject: <IntlMessages id='hr_demand.label' />}}
          />,
        );
        onClose();
        mutateHrDemand();
      }
    },
    [itemId],
  );
  useEffect(() => {
    if (itemData) {
      let urlPaths: any = [];
      let cvs = itemData?.hr_demand_youths_cv_links;
      /**To fetch active cv paths**/
      cvs.map((cv: any) => {
        if (cv.row_status == HrDemandApprovalStatusByInstitute.ACTIVE) {
          urlPaths.push(cv.cv_link);
        }
      });
      setCvLinks(urlPaths);

      reset({
        cv_links: cvLinks,
      });
    }
  }, [itemData]);

  useEffect(() => {
    setValidationMessage('');
    if (
      itemData?.rejected_by_industry_association ||
      itemData?.vacancy_approved_by_industry_association ||
      itemData?.rejected_by_institute
    ) {
      setIsRejectDisable(true);
    } else {
      setIsRejectDisable(false);
    }

    if (itemData?.rejected_by_industry_association) {
      setIsDisableSubmit(true);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data: ', data);
    if (
      (data?.cv_links &&
        data?.cv_links.length == 0 &&
        data?.youth_ids &&
        data?.youth_ids.length == 0) ||
      data.youth_ids == undefined
    ) {
      setValidationMessage('You must select at least one field!');
    } else {
      setValidationMessage('');
    }
    try {
      if (itemId) {
        await updateHrDemand(itemId, data);
        updateSuccessMessage('hr_demand.label');
      }
      onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };
  console.log('errors: ', errors);
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
      maxWidth={'sm'}
      onClose={onClose}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <RejectButton
            isDisable={isRejectDisable}
            onRejectAction={() => onRejectAction(itemId)}
            label={messages['common.reject'] as string}
          />
          <SubmitButton
            label={messages['common.approve'] as string}
            isSubmitting={isSubmitting || isDisableSubmit}
          />
        </>
      }>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FileUploadComponent
            id={'cv_links'}
            defaultFileUrl={cvLinks}
            setValue={setValue}
            register={register}
            label={messages['common.cv_links']}
            errorInstance={errors}
            allowMultiple={true}
            acceptedFileTypes={['application/pdf']}
            uploadedUrls={watch('cv_links')}
          />
        </Grid>
        {validationMessage && validationMessage.length ? (
          <Grid item xs={12}>
            <Body1 sx={{color: 'red'}}>{validationMessage}</Body1>
          </Grid>
        ) : (
          <></>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default HumanResourceDemandMangePopup;
