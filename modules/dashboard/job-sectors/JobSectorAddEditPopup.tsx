import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import {
  createJobSector,
  getJobSector,
  updateJobSector,
} from '../../../services/organaizationManagement/JobSectorService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FC, ReactNode, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {
  DOMAIN_REGEX,
  MOBILE_NUMBER_REGEX,
  TEXT_REGEX_BANGLA,
} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

interface JobSectorAddEditPopupProps {
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
  row_status: '1',
};

const JobSectorAddEditPopup: FC<JobSectorAddEditPopupProps> = ({
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
  } = useForm<JobSector>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let item = await getJobSector(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          row_status: item.row_status,
        });
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const onSubmit: SubmitHandler<JobSector> = async (data: JobSector) => {
    if (isEdit && itemId) {
      let response = await updateJobSector(itemId, data);
      if (response) {
        successStack('JobSector Updated Successfully');
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createJobSector(data);
      if (response) {
        successStack('JobSector Created Successfully');
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
            <FormRowStatus
              id='row_status'
              register={register}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </Box>
    </HookFormMuiModal>
  );
};
export default JobSectorAddEditPopup;
