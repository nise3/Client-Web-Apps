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
    return yup.object().shape({});
  }, [messages]);
  const {
    register,
    setError,
    setValue,
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  const onRejectAction = useCallback(
    async (itemId: any) => {
      let response = await rejectHrdemand(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_rejected'
            values={{subject: <IntlMessages id='hr_demand.label' />}}
          />,
        );
        setCvLinks([]);
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
      let youthIds: any = [];
      (itemData?.hr_demand_youths_youth_ids || []).map((youth: any) => {
        youthIds.push(youth.youth_id);
      });

      let youthList = [];
      if (youths) {
        youthList = youths.filter((youth: any) =>
          youthIds.includes(youth.youth_id),
        );
      }

      reset({
        youth_ids: youthList,
        cv_links: urlPaths,
      });
    }
  }, [itemData, youths]);

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
    if (
      !Object.keys(getValues('cv_links')).length &&
      getValues('youth_ids') == undefined
    ) {
      setValidationMessage('You must select at least one field!');
    } else {
      setValidationMessage('');
    }

    const youthIds: any = [];
    (data.youth_ids || []).map((item: any) => {
      youthIds.push(item.youth_id);
    });

    if (data.cv_links?.length == 0) {
      delete data.cv_links;
    }

    if (data.youth_ids?.length == 0) {
      delete data.youth_ids;
    }

    const formData: any = {};
    if (youthIds.length > 0) {
      formData.youth_ids = youthIds;
    }

    if (data.cv_links?.length > 0) {
      formData.cv_links = data.cv_links;
    }

    try {
      if (itemId) {
        await updateHrDemand(itemId, formData);
        updateSuccessMessage('hr_demand.label');
      }
      setCvLinks([]);
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
            optionValueProp={'youth_id'}
            optionTitleProp={['youth_name']}
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
