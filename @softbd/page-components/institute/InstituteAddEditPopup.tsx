import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import {createInstitute, getInstitute, updateInstitute} from '../../../services/instituteManagement/InstituteService';
import FormikFormMuiModal from '../../FormikFormMuiModal';
import CancelButton from '../../elements/Button/CancelButton';
import SubmitButton from '../../elements/Button/SubmitButton';
import FormRowStatus from '../../elements/FormRowStatus';
import CustomTextInput from '../../elements/Input/CustomTextInput';
import {DOMAIN_REGEX, MOBILE_NUMBER_REGEX, TEXT_REGEX_BANGLA} from '../../common/patternRegex';
import {sleep} from '../../common/helpers';

interface InstituteAddEditPopupProps {
  title: React.ReactNode | string;
  itemId: number | null;
  open: boolean;
  onClose: () => void;
}

const InstituteAddEditPopup: React.FC<InstituteAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
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
    row_status: '1',
  };

  const isEdit = itemId != null;
  const [itemData, setItemData] = React.useState(initialValues);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let item = await getInstitute(itemId);
        await sleep(3000);
        setItemData({
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
        setItemData(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const validationSchema = yup.object({
    title_en: yup.string().trim().required('Enter title (En)'),
    title_bn: yup.string().trim().required('Enter title (Bn)').matches(TEXT_REGEX_BANGLA,"Enter valid text"),
    domain: yup.string().trim().required('Enter domain').matches(DOMAIN_REGEX,"Domain is not valid"),
    code: yup.string().required('Enter code'),
    primary_phone: yup.string().required('Enter Phone Number').matches(MOBILE_NUMBER_REGEX,"Number is not valid"),
    primary_mobile: yup.string().required('Enter Mobile Number').matches(MOBILE_NUMBER_REGEX,"Number is not valid"),
    address: yup.string().required('Enter address'),
    google_map_src: yup.string(),
    email: yup.string().required('Enter email').email('Enter valid email'),
    row_status: yup.string(),
  });

  const formik = useFormik({
    initialValues: itemData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (data:Institute, {setSubmitting, resetForm}) => {
      setSubmitting(true);
      if (isEdit && itemId) {
        let response = await updateInstitute(itemId, data);
        if (response) {
          //Toast.success(t('object_updated_successfully', {object: t('institute')}));
          //props.onclose();
          //loadInstituteTableData();
        }
      } else {
        let response = await createInstitute(data);
        if (response) {
          //Toast.success(t('object_created_successfully', {object: t('institute')}));
          //closeAddEditModal();
          //loadInstituteTableData();
        }
      }
    },
  });

  return (
    <FormikFormMuiModal
      {...props}
      formik={formik}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading}/>
          <SubmitButton isSubmitting={formik.isSubmitting} isLoading={isLoading}/>
        </>
      }
    >
      <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <CustomTextInput
              id='title_en'
              name='title_en'
              label='Title (En)'
              value={formik.values.title_en}
              onChange={formik.handleChange}
              error={formik.touched.title_en && Boolean(formik.errors.title_en)}
              helperText={formik.touched.title_en && formik.errors.title_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='title_bn'
              name='title_bn'
              label='Title (Bn)'
              value={formik.values.title_bn}
              onChange={formik.handleChange}
              error={formik.touched.title_bn && Boolean(formik.errors.title_bn)}
              helperText={formik.touched.title_bn && formik.errors.title_bn}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='email'
              name='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='code'
              name='code'
              label='Code'
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='domain'
              name='domain'
              label='Domain'
              value={formik.values.domain}
              onChange={formik.handleChange}
              error={formik.touched.domain && Boolean(formik.errors.domain)}
              helperText={formik.touched.domain && formik.errors.domain}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='primary_phone'
              name='primary_phone'
              label={'Primary phone'}
              value={formik.values.primary_phone}
              onChange={formik.handleChange}
              error={formik.touched.primary_phone && Boolean(formik.errors.primary_phone)}
              helperText={formik.touched.primary_phone && formik.errors.primary_phone}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='primary_mobile'
              name='primary_mobile'
              label={'Primary mobile'}
              value={formik.values.primary_mobile}
              onChange={formik.handleChange}
              error={formik.touched.primary_mobile && Boolean(formik.errors.primary_mobile)}
              helperText={formik.touched.primary_mobile && formik.errors.primary_mobile}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='address'
              name='address'
              label='Address'
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomTextInput
              id='google_map_src'
              name='google_map_src'
              label={'Google map source'}
              value={formik.values.google_map_src}
              onChange={formik.handleChange}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            <FormRowStatus
              id='row_status'
              name='row_status'
              value={formik.values.row_status}
              onChange={formik.handleChange}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </FormikFormMuiModal>
  );
};

export default InstituteAddEditPopup;
