import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import {
  createJobSector,
  getJobSector,
  updateJobSector,
} from '../../../services/organaizationManagement/JobSectorService';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {WorkOutline} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';

interface JobSectorAddEditPopupProps {
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
  row_status: yup.string().trim().required(),
});

const initialValues = {
  title_en: '',
  title_bn: '',
};

const JobSectorAddEditPopup: FC<JobSectorAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentRowStatus, setCurrentRowStatus] = useState<string>('1');

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
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
        });
        setCurrentRowStatus(item.row_status);
      } else {
        reset(initialValues);
        setCurrentRowStatus('1');
      }
      setIsLoading(false);
    })();
  }, [itemId, reset]);

  const onSubmit: SubmitHandler<JobSector> = async (data: JobSector) => {
    console.table(data);
    if (isEdit && itemId) {
      let response = await updateJobSector(itemId, data);
      if (response) {
        successStack('Job Sector Updated Successfully');
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createJobSector(data);
      if (response) {
        successStack('Job Sector Created Successfully');
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
          <WorkOutline />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='job_sectors.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='job_sectors.label' />}}
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
            label='Title (En)'
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomTextInput
            id='title_bn'
            label='Title (Bn)'
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={currentRowStatus}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default JobSectorAddEditPopup;
