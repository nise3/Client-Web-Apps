import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetchCalendarEvent} from '../../../services/cmsManagement/hooks';
import moment from 'moment';
import {
  createCalendar,
  updateCalendar,
} from '../../../services/cmsManagement/EventService';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomTimePicker from '../../../@softbd/elements/input/TimePicker';
import IconBranch from '../../../@softbd/icons/IconBranch';

interface CalendarAddEditPopupProps {
  itemId: number | null;
  startDate: string | null;
  endDate: string | null;
  onClose: () => void;
  refreshDataTable: (events: string, item?: any) => void;
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

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {data: itemData, isLoading} = useFetchCalendarEvent(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title()
        .required()
        .label(messages['common.title'] as string),
      start_date: yup.string().trim().required(),
      end_date: yup.string().trim().required(),
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
        start_date: itemData?.start_date,
        end_date: itemData?.end_date,
      });
    } else {
      (initialValues.organization_id = authUser?.organization_id as string),
        (initialValues.institute_id = authUser?.institute_id as string),
        (initialValues.start_date = moment(startDate).format('yyyy-MM-DD')),
        (initialValues.end_date = moment(endDate).format('yyyy-MM-DD')),
        reset(initialValues);
    }
  }, [itemData]);
  const hasSecond = (time) => {
    const timearray = time.split(":");
    console.log(timearray.length);
    return timearray.length === 3;
  }
  const onSubmit: SubmitHandler<Calendar> = async (data: ICalendarEvent) => {
    data.start = data.start_date;
    data.end = data.end_date;
    data.start_time = hasSecond(data.start_time) ? data.start_time : `${data.start_time}:00`;
    data.end_time = hasSecond(data.end_time) ? data.end_time : `${data.end_time}:00`;;
    data.institute_id = authUser?.institute_id;
    try {
      if (itemId) {
        await updateCalendar(itemId, data);
        updateSuccessMessage('menu.events');
        // mutateCalendar();
        refreshDataTable('update', data);
      } else {
        const create = await createCalendar(data);
        data.id = create.data.id;
        createSuccessMessage('menu.events');
        refreshDataTable('create', data);
      }
      props.onClose();
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
      <Grid container spacing={5}>
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
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='start_date'
            label={messages['common.event_start_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id='end_date'
            label={messages['common.event_end_date']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTimePicker
            id='start_time'
            label={messages['common.start_time']}
            register={register}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTimePicker
            id='end_time'
            label={messages['common.end_time']}
            register={register}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default CalendarAddEditPopup;
