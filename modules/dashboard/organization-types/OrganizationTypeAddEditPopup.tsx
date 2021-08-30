import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createOrganizationType,
  getOrganizationType,
  updateOrganizationType,
} from '../../../services/organaizationManagement/OrganizationTypeService';
import {useIntl} from 'react-intl';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationType from '../../../@softbd/icons/IconOrganizationType';

interface OrganizationTypeAddEditPopupProps {
  itemId: number | null;
  open: boolean;
  onClose: () => void;
  refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
  title_en: yup.string().trim().required().label('Title(En)'),
  title_bn: yup
    .string()
    .trim()
    .required()
    .label('Title(Bn)')
    .matches(TEXT_REGEX_BANGLA, 'Enter valid text'),
});

const initialValues = {
  title_en: '',
  title_bn: '',
  is_government: false,
  row_status: '1',
};

const OrganizationTypeAddEditPopup: FC<OrganizationTypeAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedIsGovernment, setCheckedIsGovernment] =
    useState<boolean>(false);

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
      if (itemId) {
        let item = await getOrganizationType(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          row_status: String(item.row_status),
        });
        setCheckedIsGovernment(item.is_government);
      } else {
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  const onSubmit: SubmitHandler<OrganizationType> = async (
    data: OrganizationType,
  ) => {
    if (itemId) {
      let response = await updateOrganizationType(itemId, data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='organization_type.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createOrganizationType(data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='organization.label' />}}
          />,
        );
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
          <IconOrganizationType />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='organization_type.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='organization_type.label' />}}
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
          <CustomCheckbox
            id='is_government'
            label={messages['organization_type.is_government']}
            register={register}
            errorInstance={errors}
            checked={checkedIsGovernment}
            onChange={() => {
              setCheckedIsGovernment((prevState) => !prevState);
            }}
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
export default OrganizationTypeAddEditPopup;
