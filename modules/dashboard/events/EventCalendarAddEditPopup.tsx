import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState, useCallback} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  createBranch,
  updateBranch,
} from '../../../services/instituteManagement/BranchService';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {
  useFetchBranch,
  useFetchInstitutes,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazilas,
} from '../../../services/locationManagement/hooks';
import {
  filterDistrictsByDivisionId,
  filterUpazilasByDistrictId,
} from '../../../services/locationManagement/locationUtils';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import { useFetchCalendarEvent } from '../../../services/cmsManagement/hooks';
import moment from 'moment';
import { createCalendar, updateCalendar } from '../../../services/cmsManagement/EventService';
import { useAuthUser } from '../../../@crema/utility/AppHooks';

interface CalendarAddEditPopupProps {
  itemId: number | null;
  startDate: string | null;
  endDate: string | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

let initialValues = {
  title: '',
  youth_id: '',
  institute_id: '',
  organization_id: '',
  batch_id: '',
  industry_association_id: '',
  start_date: '',
  end_date: '',
  start_time: '',
  end_time: '',
  color: '',
};

const CalendarAddEditPopup: FC<CalendarAddEditPopupProps> = ({
  itemId,
  startDate,
  endDate,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;
  const authUser = useAuthUser();
  console.log('useAuthUser ', authUser);
  
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  

  const {
    data: itemData,
    isLoading,
    mutate: mutateBranch,
  } = useFetchCalendarEvent(itemId);

  // const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});
  // const {data: institutes, isLoading: isLoadingInstitutes} =
  //   useFetchInstitutes(instituteFilters);


  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
        start_date: yup.string().trim().required(),
        end_date: yup.string().trim().required()
    });
  }, [messages]);
  const {
    control,
    register,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Calendar>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        ...itemData,
        // title: itemData?.title,
        start_date: itemData?.start_date,
        end_date:  itemData?.end_date
      });

    } else {
      initialValues.organization_id = authUser.organization_id,
      initialValues.institute_id = authUser.institute_id,
      initialValues.youth_id = authUser.youth_id,
      initialValues.start_date = moment(startDate).format('yyyy-MM-DD'),
      initialValues.end_date = moment(endDate).format('yyyy-MM-DD'),
      reset(initialValues);
    }
  }, [itemData]);  

  const onSubmit: SubmitHandler<Calendar> = async (data:Calendar) => {
  // const onSubmit: any = (data:Calendar) => {
    // console.log(data);
    
    try {
      if (itemId) {
        await updateCalendar(itemId, data);
        updateSuccessMessage('menu.events');
        // mutateBranch();
      } else {
        await createCalendar(data);
        createSuccessMessage('menu.events');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
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
              values={{subject: <IntlMessages id='menu.events' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='menu.events' />}}
            />
          )}
        </>
      }
      maxWidth={'sm'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
        <Grid item xs={12} md={12}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            control={control}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
    </HookFormMuiModal>
  );
};
export default CalendarAddEditPopup;
