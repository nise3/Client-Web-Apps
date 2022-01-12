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
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomTimePicker from '../../../@softbd/elements/input/TimePicker';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {
  ICalendar,
  ICalendarDto,
} from '../../../shared/Interface/common.interface';

interface CalendarAddEditPopupProps {
  itemId: number | null | undefined;
  startDate: string | null | undefined;
  endDate: string | null | undefined;
  onClose: () => void;
  refreshDataTable: (events: string, item?: any) => void;
}

let initialValues = {
  title: '',
  batch_id: '',
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

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateCalenderEvent,
  } = useFetchCalendarEvent(itemId);

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
  } = useForm<ICalendar>({
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
      (initialValues.start_date = moment(startDate).format('yyyy-MM-DD')),
        (initialValues.end_date = moment(endDate).format('yyyy-MM-DD')),
        reset(initialValues);
    }
  }, [itemData]);
  const hasSecond = (time: any) => {
    if (time) {
      const timearray = time.split(':');
      return timearray.length === 3;
    } else {
      return false;
    }
  };
  const onSubmit: SubmitHandler<ICalendarDto> = async (data: ICalendarDto) => {
    data.start = data.start_date;
    data.end = data.end_date;
    if (data.start_time) {
      data.start_time = hasSecond(data.start_time)
        ? data.start_time
        : `${data.start_time}:00`;
    }
    if (data.end_time) {
      data.end_time = hasSecond(data.end_time)
        ? data.end_time
        : `${data.end_time}:00`;
    }

    try {
      if (itemId) {
        await updateCalendar(itemId, data);
        updateSuccessMessage('menu.events');
        mutateCalenderEvent();
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
