import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import {FC, ReactNode, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createOrganizationType,
  getOrganizationType,
  updateOrganizationType,
} from '../../../services/organaizationManagement/OrganizationTypeService';
import {useIntl} from 'react-intl';
import CustomCheckbox from '../../../@softbd/elements/Checkbox/CustomCheckbox';

interface OrganizationTypeAddEditPopupProps {
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
  is_government: false,
  row_status: '1',
};

const OrganizationTypeAddEditPopup: FC<OrganizationTypeAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkedIsGovernment, setCheckedIsGovernment] =
    useState<boolean>(false);

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
        let item = await getOrganizationType(itemId);
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          row_status: item.row_status,
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
    console.log('data', data);
    if (isEdit && itemId) {
      let response = await updateOrganizationType(itemId, data);
      if (response) {
        successStack('OrganizationType Updated Successfully');
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createOrganizationType(data);
      if (response) {
        successStack('OrganizationType Created Successfully');
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
          <Grid item xs={12}>
            <CustomCheckbox
              id='is_government'
              label={messages['organizationType.is_government']}
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
export default OrganizationTypeAddEditPopup;
