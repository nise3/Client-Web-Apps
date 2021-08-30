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
import {
  getAllRankTypes,
  getAllRankTypesBasedOnOrganization,
} from '../../../services/instituteManagement/RankTypeService';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {
  createRank,
  getRank,
  updateRank,
} from '../../../services/organaizationManagement/RankService';
import IconRank from '../../../@softbd/icons/IconRank';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';

interface RankAddEditPopupProps {
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
  organization_id: yup.string().trim().required(),
  rank_type_id: yup.string().trim().required(),
  display_order: yup.string(),
  row_status: yup.string(),
});

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  organization_id: 0,
  rank_type_id: 0,
  display_order: '',
  grade: '',
  row_status: '1',
};

const RankAddEditPopup: FC<RankAddEditPopupProps> = ({
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
  const [rankTypes, setRankTypes] = useState<Array<RankType> | []>([]);
  const [organizationId, setOrganizationId] = useState<number | null>(null);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Rank>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (isEdit && itemId) {
        let item = await getRank(itemId);
        setOrganizationId(item.organization_id);
        organizationId &&
          setRankTypes(
            await getAllRankTypesBasedOnOrganization(organizationId),
          );
        reset({
          title_en: item.title_en,
          title_bn: item.title_bn,
          organization_id: item.organization_id,
          rank_type_id: item.rank_type_id,
          grade: item.grade,
          display_order: item.display_order,
          row_status: String(item.row_status),
        });
      } else {
        setRankTypes(await getAllRankTypes());
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    loadAllOrganizations();
  }, []);

  useEffect(() => {
    loadAllRankTypes();
  }, [organizationId]);

  const loadAllRankTypes = async () => {
    if (organizationId) {
      setRankTypes(await getAllRankTypesBasedOnOrganization(organizationId));
    } else {
      setRankTypes(await getAllRankTypes());
    }
  };

  const loadAllOrganizations = async () => {
    setOrganizations(await getAllOrganizations());
  };

  const handleOrganizationChange = (organizationId: any) => {
    setOrganizationId(organizationId);
  };

  const onSubmit: SubmitHandler<Rank> = async (data: Rank) => {
    if (isEdit && itemId) {
      let response = await updateRank(itemId, data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_updated_successfully'
            values={{subject: <IntlMessages id='ranks.label' />}}
          />,
        );
        props.onClose();
        refreshDataTable();
      }
    } else {
      let response = await createRank(data);
      if (response) {
        successStack(
          <IntlMessages
            id='common.subject_created_successfully'
            values={{subject: <IntlMessages id='ranks.label' />}}
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
          <IconRank />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='ranks.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='ranks.label' />}}
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
            onChange={handleOrganizationChange}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomFormSelect
            id='rank_type_id'
            label={messages['rank_types.label']}
            isLoading={isLoading}
            control={control}
            options={rankTypes}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title_bn']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='display_order'
            label={messages['ranks.display_order']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id='grade'
            label={messages['ranks.grade']}
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
export default RankAddEditPopup;
