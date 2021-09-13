import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {getRankType} from '../../../services/organaizationManagement/RankTypeService';
import {
  createRankType,
  updateRankType,
} from '../../../services/organaizationManagement/RankTypeService';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconRankType from '../../../@softbd/icons/IconRankType';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
  isResponseSuccess,
  isValidationError,
} from '../../../@softbd/common/helpers';
import {setServerValidationErrors} from '../../../@softbd/common/validationErrorHandler';

interface RankTypeAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim(), //.required('Enter title (En)'),
  title_bn: yup
    .string()
    .trim()
    .required('Enter title (Bn)')
    .matches(TEXT_REGEX_BANGLA),
  organization_id: yup.string(),
  description: yup.string(),
  row_status: yup.string(),
});

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  organization_id: 0,
  description: '',
  row_status: '1',
};

const RankTypeAddEditPopup: FC<RankTypeAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Array<Organization> | []>(
    [],
  );

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm<RankType>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let response = await getRankType(itemId);
        if (response) {
          let {data: item} = response;
          reset({
            title_en: item?.title_en,
            title_bn: item?.title_bn,
            organization_id: item?.organization_id,
            description: item?.description,
            row_status: String(item?.row_status),
          });
        }
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    (async () => {
      let response = await getAllOrganizations();
      response && setOrganizations(response.data);
    })();
  }, []);

  const onSubmit: SubmitHandler<RankType> = async (data: RankType) => {
    if (isEdit && itemId) {
      let response = await updateRankType(itemId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='rank_types.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      } else {
        if (isValidationError(response)) {
          setServerValidationErrors(response.errors, setError);
        }
      }
    } else {
      let response = await createRankType(data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='rank_types.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      } else {
        if (isValidationError(response)) {
          setServerValidationErrors(response.errors, setError);
        }
      }
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconRankType />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='rank_types.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='rank_types.label' />}}
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
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isLoading}
            control={control}
            options={organizations}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='description'
            label={messages['common.description']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
            multiline={true}
            rows={3}
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

export default RankTypeAddEditPopup;
