import React, {FC, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@material-ui/core/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import * as yup from 'yup';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import {
  createDistrict,
  updateDistrict,
} from '../../../services/locationManagement/DistrictService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IconDistrict from '../../../@softbd/icons/IconDistrict';
import {isResponseSuccess} from '../../../@softbd/common/helpers';
import {
  useFetchDistrict,
  useFetchDivisions,
} from '../../../services/locationManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';

interface DistrictAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title (En)'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text')
    .label('Title (Bn)'),
  bbs_code: yup.string().trim().required().label('BBS code'),
  loc_division_id: yup.string().trim().required().label('Division'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  bbs_code: '',
  row_status: '1',
  loc_division_id: '',
};

const DistrictAddEditPopup: FC<DistrictAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateDistrict,
  } = useFetchDistrict(itemId);
  const [divisionFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: divisions, isLoading: isDivisionsLoading} =
    useFetchDivisions(divisionFilters);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title_bn: itemData?.title_bn,
        bbs_code: itemData?.bbs_code,
        row_status: String(itemData?.row_status),
        loc_division_id: itemData?.loc_division_id,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);
  const onSubmit: SubmitHandler<District> = async (data: District) => {
    if (isEdit && itemId) {
      let response = await updateDistrict(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='districts.label' />}}
          />,
        );
        mutateDistrict();
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createDistrict(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='districts.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconDistrict />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='districts.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='districts.label' />}}
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
        <Grid item xs={12}>
          <CustomFormSelect
            id='loc_division_id'
            label={messages['divisions.label']}
            isLoading={isDivisionsLoading}
            control={control}
            options={divisions}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
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

export default DistrictAddEditPopup;
