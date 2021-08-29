import React, {FC, useEffect, useState} from 'react';
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
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal';
import CustomFormSelect from '../../../@softbd/elements/Select/CustomFormSelect';
import {getAllJobSectors} from '../../../services/organaizationManagement/JobSectorService';
import {BusinessCenter} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';

interface OccupationAddEditPopupProps {
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
  job_sector_id: yup.string().trim().required().label('Job sector'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  job_sector_id: '',
  row_status: '1',
};

const OccupationAddEditPopup: FC<OccupationAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [jobSectors, setJobSectors] = useState<Array<JobSector>>([]);

  const {
    control,
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
      await loadJobSectors();

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

  const loadJobSectors = async () => {
    let jobSectors = await getAllJobSectors();
    setJobSectors(jobSectors);
  };

  return (
    <HookFormMuiModal
      {...props}
      title={
        <>
          <BusinessCenter />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='occupations.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='occupations.label' />}}
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
          <Grid item xs={12}>
            <CustomFormSelect
              id='job_sector_id'
              label={messages['job_sectors.label']}
              isLoading={isLoading}
              control={control}
              options={jobSectors}
              optionValueProp={'id'}
              optionTitleProp={['title_en', 'title_bn']}
              errorInstance={errors}
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
      </Box>
    </HookFormMuiModal>
  );
};

export default OccupationAddEditPopup;