import React, {FC, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {getAllDivisions} from '../../../services/locationManagement/DivisionService';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {RoomOutlined} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import Grid from '@material-ui/core/Grid';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import * as yup from 'yup';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import {
  createDistrict,
  getDistrict,
  updateDistrict,
} from '../../../services/locationManagement/DistrictService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import RowStatus from '../../../@softbd/utilities/RowStatus';

interface DistrictAddEditPopupProps {
  itemId: number | null;
  open: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [divisions, setDivisions] = useState<Array<Division>>([]);

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
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let item = await getDistrict(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          bbs_code: item.bbs_code,
          row_status: String(item.row_status),
          loc_division_id: item.loc_division_id,
        });
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let divisions = await getAllDivisions({row_status: RowStatus.ACTIVE});
      if (divisions) setDivisions(divisions);
      setIsLoading(false);
    })();
  }, []);

  const onSubmit: SubmitHandler<District> = async (data: District) => {
    if (isEdit && itemId) {
      let response = await updateDistrict(itemId, data);
      if (response) {
        successStack('District Updated Successfully');
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createDistrict(data);
      if (response) {
        successStack('District Created Successfully');
        props.onClose();
        refreshDataTable();
      }
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      title={
        <>
          <RoomOutlined />
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
            isLoading={isLoading}
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
