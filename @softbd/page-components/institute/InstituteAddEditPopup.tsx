import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {CremaTheme} from '../../../types/AppContextPropsType';
import {Fonts} from '../../../shared/constants/AppEnums';
import {Grid, TextField} from '@material-ui/core';
import {getInstitute} from '../../../services/instituteManagement/InstituteService';
import {Save, Remove} from '@material-ui/icons';
import FormikFormMuiModal from '../../FormikFormMuiModal';

const useStyles = makeStyles((theme: CremaTheme) => ({
  formRoot: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    [theme.breakpoints.up('xl')]: {},
  },
  fontBold: {
    fontWeight: Fonts.MEDIUM,
  },
  pointer: {
    cursor: 'pointer',
  },
  textareaAutosizeRoot: {
    width: '100%',
    border: '0 none',
    fontWeight: Fonts.REGULAR,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  btnRoot: {
    paddingLeft: 32,
    paddingRight: 32,
  },
  scrollRoot: {
    height: 595,
  },
}));

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
    google_map_src: '',
    email: '',
    config: '',
    row_status: '',
  };

  const isEdit = itemId != null;
  const [itemData, setItemData] = React.useState(initialValues);

  React.useEffect(() => {
    (async () => {
      if (isEdit && itemId) {
        let item = await getInstitute(itemId);
        setItemData({
          title_en: item.title_en,
          title_bn: item.title_bn,
          domain: item.domain,
          code: item.code,
          address: item.address,
          google_map_src: item.google_map_src,
          email: item.email,
          config: item.config,
          row_status: item.row_status,
        });
      } else {
        setItemData(initialValues);
      }
    })();
  }, [itemId]);

  const classes = useStyles();
  const validationSchema = yup.object({
    title_en: yup.string().required('Enter title (En)'),
    title_bn: yup.string().required('Enter title (Bn)'),
    domain: yup.string().required('Enter domain'),
    code: yup.string().required('Enter domain'),
    address: yup.string().required('Enter address'),
    google_map_src: yup.string().required('Enter Google map src'),
    email: yup.string().required('Enter email'),
    config: yup.string().required('Enter config'),
    row_status: yup.string().required('Enter Status'),
  });

  const formik = useFormik({
    initialValues: itemData,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (data, {setSubmitting, resetForm}) => {
      // onClose();
      // resetForm();
      // setSubmitting(false);

      console.log(data);
      alert(JSON.stringify(data, null, 2));
    },
  });

  return (
    <FormikFormMuiModal
      {...props}
      formik={formik}
      actions={
        <>
          <Button
            startIcon={<Remove />}
            className={classes.btnRoot}
            variant='contained'
            color='default'>
            Cancel
          </Button>
          <Button
            startIcon={<Save />}
            className={classes.btnRoot}
            variant='contained'
            color='secondary'
            type='submit'>
            Submit
          </Button>
        </>
      }>
      <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='title_en'
              name='title_en'
              label='Title (En)'
              value={formik.values.title_en}
              onChange={formik.handleChange}
              error={formik.touched.title_en && Boolean(formik.errors.title_en)}
              helperText={formik.touched.title_en && formik.errors.title_en}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='title_bn'
              name='title_bn'
              label='Title (Bn)'
              value={formik.values.title_bn}
              onChange={formik.handleChange}
              error={formik.touched.title_bn && Boolean(formik.errors.title_bn)}
              helperText={formik.touched.title_bn && formik.errors.title_bn}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='code'
              name='code'
              label='Code'
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.touched.code && Boolean(formik.errors.code)}
              helperText={formik.touched.code && formik.errors.code}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='domain'
              name='domain'
              label='Domain'
              value={formik.values.domain}
              onChange={formik.handleChange}
              error={formik.touched.domain && Boolean(formik.errors.domain)}
              helperText={formik.touched.domain && formik.errors.domain}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='address'
              name='address'
              label='Address'
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='google_map_src'
              name='google_map_src'
              label='Address'
              value={formik.values.google_map_src}
              onChange={formik.handleChange}
              error={
                formik.touched.google_map_src &&
                Boolean(formik.errors.google_map_src)
              }
              helperText={
                formik.touched.google_map_src && formik.errors.google_map_src
              }
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='email'
              name='email'
              label='Email'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='config'
              name='config'
              label='Config'
              value={formik.values.config}
              onChange={formik.handleChange}
              error={formik.touched.config && Boolean(formik.errors.config)}
              helperText={formik.touched.config && formik.errors.config}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id='row_status'
              name='row_status'
              label='Status'
              value={formik.values.row_status}
              onChange={formik.handleChange}
              error={
                formik.touched.row_status && Boolean(formik.errors.row_status)
              }
              helperText={formik.touched.row_status && formik.errors.row_status}
            />
          </Grid>
        </Grid>
      </Box>
    </FormikFormMuiModal>
  );
};

export default InstituteAddEditPopup;
