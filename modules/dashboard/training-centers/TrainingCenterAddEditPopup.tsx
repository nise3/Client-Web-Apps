import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  createTrainingCenter,
  updateTrainingCenter,
} from '../../../services/instituteManagement/TrainingCenterService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconTrainingCenter from '../../../@softbd/icons/IconTrainingCenter';
import {
  useFetchBranches,
  useFetchInstitutes,
  useFetchTrainingCenter,
} from '../../../services/instituteManagement/hooks';
import RowStatus from '../../../@softbd/utilities/RowStatus';

interface ProgrammeAddEditPopupProps {
  itemId: number | null;
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
  institute_id: yup.string().trim().required(),
  branch_id: yup.string(),
  address: yup.string(),
  google_map_src: yup.string(),
  row_status: yup.string(),
});

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  institute_id: 0,
  branch_id: 0,
  address: '',
  google_map_src: '',
  row_status: '1',
};

const TrainingCenterAddEditPopup: FC<ProgrammeAddEditPopupProps> = ({
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
    mutate: mutateTrainingCenter,
  } = useFetchTrainingCenter(itemId);
  const [instituteFilters] = useState({row_status: RowStatus.ACTIVE});
  const {data: institutes, isLoading: isLoadingInstitutes} =
    useFetchInstitutes(instituteFilters);
  const [branchFilters, setBranchFilters] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  const {data: branches, isLoading: isLoadingBranches} =
    useFetchBranches(branchFilters);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<TrainingCenter>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        title_en: itemData?.title_en,
        title_bn: itemData?.title_bn,
        institute_id: itemData?.institute_id,
        branch_id: itemData?.branch_id,
        address: itemData?.address,
        google_map_src: itemData?.google_map_src,
        row_status: String(itemData?.row_status),
      });

      setBranchFilters({
        institute_id: itemData?.institute_id,
        row_status: RowStatus.ACTIVE,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const handleInstituteChange = useCallback((instituteId: number) => {
    setBranchFilters({
      institute_id: instituteId,
      row_status: RowStatus.ACTIVE,
    });
  }, []);

  const onSubmit: SubmitHandler<TrainingCenter> = async (
    data: TrainingCenter,
  ) => {
    if (isEdit && itemId) {
      let response = await updateTrainingCenter(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='training_center.label' />}}
          />,
        );
        mutateTrainingCenter();
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createTrainingCenter(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='training_center.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconTrainingCenter />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='training_center.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='training_center.label' />}}
            />
          )}
        </>
      }
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_en'
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='title_bn'
            label={messages['common.title_bn']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='institute_id'
            label={messages['institute.label']}
            isLoading={isLoadingInstitutes}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
            onChange={handleInstituteChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='branch_id'
            label={messages['branch.label']}
            isLoading={isLoadingBranches}
            control={control}
            options={branches}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='address'
            label={messages['common.address']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='google_map_src'
            label={messages['common.google_map_src']}
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
export default TrainingCenterAddEditPopup;
