import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@mui/material/Grid';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {
  createUpazila,
  updateUpazila,
} from '../../../services/locationManagement/UpazilaService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import IconUpazila from '../../../@softbd/icons/IconUpazila';
import {
  useFetchDistricts,
  useFetchDivisions,
  useFetchUpazila,
} from '../../../services/locationManagement/hooks';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {Upazila} from '../../../shared/Interface/location.interface';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

const initialValues = {
  title_en: '',
  title: '',
  bbs_code: '',
  row_status: '1',
  loc_division_id: '',
  loc_district_id: '',
};

interface UpazilaAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const UpazilaAddEditPopup: FC<UpazilaAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const isEdit = itemId != null;
  const [divisionsFilter] = useState<any>({row_status: RowStatus.ACTIVE});
  const [districtsFilter, setDistrictsFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {
    data: itemData,
    isLoading,
    mutate: mutateUpazila,
  } = useFetchUpazila(itemId);
  const {data: divisions, isLoading: isLoadingDivisions} =
    useFetchDivisions(divisionsFilter);
  const {data: districts, isLoading: isLoadingDistricts} =
    useFetchDistricts(districtsFilter);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.title'] as string),
      title_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),

      bbs_code: yup
        .string()
        .trim()
        .required()
        .label(messages['common.bbs_code'] as string),
      loc_division_id: yup
        .string()
        .trim()
        .required()
        .label(messages['divisions.label'] as string),
      loc_district_id: yup
        .string()
        .trim()
        .required()
        .label(messages['districts.label'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    console.log('itemData', itemData);
    console.log('divisions', divisions);
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title: itemData?.title,
        bbs_code: itemData?.bbs_code,
        row_status: String(itemData?.row_status),
        loc_division_id: itemData?.loc_division_id,
        loc_district_id: itemData?.loc_district_id,
      });
      setDistrictsFilter({
        division_id: itemData?.loc_division_id,
        row_status: RowStatus.ACTIVE,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const changeDivisionAction = (value: number) => {
    setDistrictsFilter({
      division_id: value,
      row_status: RowStatus.ACTIVE,
    });
  };

  const onSubmit: SubmitHandler<Upazila> = async (data: Upazila) => {
    try {
      if (itemId) {
        await updateUpazila(itemId, data);
        updateSuccessMessage('upazilas.label');
        mutateUpazila();
      } else {
        await createUpazila(data);
        createSuccessMessage('upazilas.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconUpazila />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='upazilas.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='upazilas.label' />}}
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
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CustomFormSelect
            required
            id='loc_division_id'
            label={messages['divisions.label']}
            isLoading={isLoadingDivisions}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeDivisionAction}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomFormSelect
            required
            id='loc_district_id'
            label={messages['districts.label']}
            isLoading={isLoadingDistricts}
            control={control}
            options={districts}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            required
            id='bbs_code'
            label={messages['common.bbs_code']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
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

export default UpazilaAddEditPopup;
