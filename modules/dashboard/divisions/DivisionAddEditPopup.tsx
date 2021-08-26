import React, {FC, useEffect, useState} from 'react';
import * as yup from 'yup';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal';
import {RoomOutlined} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import Grid from '@material-ui/core/Grid';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {
  createDivision,
  getDivision,
  updateDivision,
} from '../../../services/locationManagement/DivisionService';
import {useIntl} from 'react-intl';

interface DivisionAddEditPopupProps {
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
});

const initialValues = {
  title_en: '',
  title_bn: '',
  bbs_code: '',
};

const DivisionAddEditPopup: FC<DivisionAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
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
        let item = await getDivision(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          bbs_code: item.bbs_code,
        });
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const onSubmit: SubmitHandler<Division> = async (data: Division) => {
    if (isEdit && itemId) {
      let response = await updateDivision(itemId, data);
      if (response) {
        successStack('Division Updated Successfully');
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createDivision(data);
      if (response) {
        successStack('Division Created Successfully');
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
              values={{subject: <IntlMessages id='divisions.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='divisions.label' />}}
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
      </Grid>
    </HookFormMuiModal>
  );
};

export default DivisionAddEditPopup;
