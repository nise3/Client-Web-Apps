import React, {FC, ReactNode, useEffect, useState} from 'react';
import * as yup from 'yup';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
  createOccupation,
  getOccupation,
  updateOccupation,
} from '../../../services/organaizationManagement/OccupationService';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import FormRowStatus from '../../../@softbd/elements/FormRowStatus';
import HookFormMuiModal from '../../../@softbd/HookFormMuiModal';

interface OccupationAddEditPopupProps {
  title: ReactNode | string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required(),
  title_bn: yup
    .string()
    .trim()
    .required()
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  job_sector_id: null,
  row_status: 0,
};

const OccupationAddEditPopup: FC<OccupationAddEditPopupProps> = ({
  itemId,
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
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let item = await getOccupation(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          row_status: parseInt(item.row_status),
          job_sector_id: item.job_sector_id,
        });
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const onSubmit: SubmitHandler<Occupation> = async (data: Occupation) => {
    console.log('data', data);

    if (isEdit && itemId) {
      let response = await updateOccupation(itemId, data);
      if (response) {
        successStack('Occupation Updated Successfully');
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createOccupation(data);
      if (response) {
        successStack('Occupation Created Successfully');
        props.onClose();
        props.refreshDataTable();
      }
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
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
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <FormRowStatus
              id='row_status'
              register={register}
              defaultValue={initialValues.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </HookFormMuiModal>
  );
};

export default OccupationAddEditPopup;
