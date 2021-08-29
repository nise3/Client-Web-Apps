import * as yup from 'yup';
import Box from '@material-ui/core/Box';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/Input/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import CancelButton from '../../../@softbd/elements/Button/CancelButton';
import SubmitButton from '../../../@softbd/elements/Button/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  createRankType, getAllRankTypes, getAllRankTypesBasedOnOrganization,
  updateRankType,
} from '../../../services/instituteManagement/RankTypeService';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import CustomFormSelect from '../../../@softbd/elements/Select/CustomFormSelect';
import {useIntl} from 'react-intl';
import FormRowStatus from '../../../@softbd/elements/FormRowStatus';
import {WorkOutline} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getRank} from '../../../services/organaizationManagement/RankService';

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
  organization_id: yup.string(),
  description: yup.string(),
  row_status: yup.string(),
});

const initialValues = {
  id: 0,
  title_en: '',
  title_bn: '',
  organization_id: 0,
  rank_type_id: 0,
  display_order: 0,
  grade: '',
  row_status: '1',
};

const RankAddEditPopup: FC<RankAddEditPopupProps> = ({
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const isEdit = itemId != null;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<Array<Organization>|[]>([]);
  const [rankTypes, setRankTypes] = useState<Array<RankType>|[]>([]);
  const [organizationId, setOrganizationId] = useState<number|null>(null);

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
        reset(initialValues);
      }
      setIsLoading(false);
    })();
  }, [itemId]);

  useEffect(() => {
    setOrganizationState();
    setRankTypeState();
  }, [])

const setRankTypeState = async () => {
    if (organizationId) {
      setRankTypes(await getAllRankTypesBasedOnOrganization(organizationId));
    }else {
      setRankTypes(await getAllRankTypes());
    }
}

  const setOrganizationState = async () => {
    setOrganizations(await getAllOrganizations());
  }

  const loadRankTypes = (organizationId: number) => {
    loadRankTypesDataByOrganization(organizationId);
  }

  const loadRankTypesDataByOrganization = async (organizationId: number) => {
    let rankTypes = await getAllRankTypesBasedOnOrganization(organizationId);
    if (rankTypes) {
      setRankTypes(rankTypes);
    }
  }

  const onSubmit: SubmitHandler<RankType> = async (data: RankType) => {
    if (isEdit && itemId) {
      let response = await updateRankType(itemId, data);
      if (response) {
        successStack(<IntlMessages
          id='common.subject_updated_successfully'
          values={{subject: <IntlMessages id='ranks.label' />}}
        />);
        props.onClose();
        props.refreshDataTable();
      }
    } else {
      let response = await createRankType(data);
      if (response) {
        successStack(<IntlMessages
          id='common.subject_created_successfully'
          values={{subject: <IntlMessages id='ranks.label' />}}
        />);
        props.onClose();
        props.refreshDataTable();
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
      <Box py={5} px={{xs: 5, lg: 8, xl: 10}}>
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
              onChange={loadRankTypes}
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
      </Box>
    </HookFormMuiModal>
  );
};
export default RankAddEditPopup;
