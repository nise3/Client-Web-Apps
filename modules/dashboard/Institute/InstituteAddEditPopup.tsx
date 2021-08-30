import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import {
  createInstitute,
  getInstitute,
  updateInstitute,
} from '../../../services/instituteManagement/InstituteService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FC, ReactNode, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {
  DOMAIN_REGEX,
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/Button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

interface InstituteAddEditPopupProps {
  title: ReactNode | string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required('Enter title (En)'),
  title_bn: yup
    .string()
    .trim()
    .required('Enter title (Bn)')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
  domain: yup
    .string()
    .trim()
    .required('Enter domain')
    .matches(DOMAIN_REGEX, 'Domain is not valid'),
  code: yup.string().required('Enter code'),
  primary_phone: yup
    .string()
    .required('Enter Phone Number')
    .matches(MOBILE_NUMBER_REGEX, 'Number is not valid'),
  primary_mobile: yup
    .string()
    .required('Enter Mobile Number')
    .matches(MOBILE_NUMBER_REGEX, 'Number is not valid'),
  address: yup.string().required('Enter address'),
  google_map_src: yup.string(),
  email: yup.string().required('Enter email').email('Enter valid email'),
  row_status: yup.string(),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  domain: '',
  code: '',
  address: '',
  primary_phone: '',
  primary_mobile: '',
  google_map_src: '',
  email: '',
  config: '',
  row_status: 1,
};

const InstituteAddEditPopup: FC<InstituteAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Institute>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let item = await getInstitute(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          domain: item.domain,
          code: item.code,
          primary_phone: item.primary_phone,
          primary_mobile: item.primary_mobile,
          address: item.address,
          google_map_src: item.google_map_src,
          email: item.email,
          config: item.config,
          row_status: item.row_status,
        });
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const onSubmit: SubmitHandler<Institute> = async (data: Institute) => {
    if (isEdit && itemId) {
      let response = await updateInstitute(itemId, data);
      if (response) {
        successStack('Institute Updated Successfully');
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createInstitute(data);
      if (response) {
        successStack('Institute Created Successfully');
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
          <Grid item xs={6}>
            <CustomTextInput
              id='title_en'
              label='Title (En)'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='title_bn'
              label='Title (Bn)'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='email'
              label='Email'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='code'
              label='Code'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='domain'
              label='Domain'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='primary_phone'
              label='Primary phone'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='primary_mobile'
              label='Primary mobile'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='address'
              label='Address'
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='google_map_src'
              label={'Google map source'}
              register={register}
              errorInstance={errors}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </HookFormMuiModal>
  );
};
export default InstituteAddEditPopup;
