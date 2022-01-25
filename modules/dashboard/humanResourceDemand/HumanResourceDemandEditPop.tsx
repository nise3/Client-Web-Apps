import {Button, Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetchHumanResourceDemand} from '../../../services/IndustryManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import {useFetchAllInstitutes} from '../../../services/instituteManagement/hooks';
import {
  useFetchOrganizations,
  useFetchSkills,
} from '../../../services/organaizationManagement/hooks';
import {Box} from '@mui/system';
import IconHumanResourceDemand from '../../../@softbd/icons/HumanResourceDeman';
import {updateHumanResourceDemand} from '../../../services/IndustryManagement/HrDemandService';
import {useFetchIndustryAssociations} from '../../../services/IndustryAssociationManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import CustomSelectAutoComplete from '../../youth/registration/CustomSelectAutoComplete';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';

interface HumanResourceDemandEditPopupProps {
  itemId: number;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  organization_id: '',
};

const HumanResourceDemandEditPopup: FC<HumanResourceDemandEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const authUser = useAuthUser<CommonAuthUser>();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {updateSuccessMessage} = useSuccessMessage();
  const [hrDemandFields, setHrDemandFields] = useState<Array<number>>([1]);
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateHumanResourceDemand,
  } = useFetchHumanResourceDemand(itemId);

  const [organizationFilter] = useState({});
  const {data: organizations, isLoading: isLoadingOrganizations} =
    useFetchOrganizations(organizationFilter);

  const [industryAssociationFilter] = useState<any>({});
  const {data: industryAssociations, isLoading: isLoadingIndustryAssociation} =
    useFetchIndustryAssociations(industryAssociationFilter);

  const [instituteFilter] = useState({});
  const {data: institutes, isLoading: isLoadingInstitute} =
    useFetchAllInstitutes(instituteFilter);

  const [skillFilter] = useState({});
  const {data: skills, isLoading: isLoadingSkills} =
    useFetchSkills(skillFilter);

  const onAddHrDemand = useCallback(() => {
    setHrDemandFields((prev: any) => {
      return [...prev, prev.length + 1];
    });
  }, []);

  const onRemoveHrDemand = () => {
    let array = [...hrDemandFields];
    if (hrDemandFields.length > 1) {
      array.splice(hrDemandFields.length - 1, 1);
      setHrDemandFields(array);
    }
  };

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      organization_id: yup
        .string()
        .trim()
        .required()
        .label(messages['organization.label'] as string),
      industry_association_id:
        authUser && authUser.isIndustryAssociationUser
          ? yup.string().trim().nullable()
          : yup
              .string()
              .trim()
              .required(function () {
                return authUser && !authUser.isIndustryAssociationUser;
              })
              .label(messages['industry_association.label'] as string),

      institute_id: yup
        .array()
        .of(yup.object())
        .min(1)
        .label(messages['common.institute'] as string),
      skill_id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.skills'] as string),
      vacancy: yup
        .string()
        .trim()
        .required()
        .label(messages['common.vacancy'] as string),
      requirement: yup
        .string()
        .trim()
        .required()
        .label(messages['common.requirements'] as string),
      end_date: yup
        .string()
        .trim()
        .required()
        .label(messages['common.end_date'] as string),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      let institutes = [itemData?.all_institutes];

      let data = {
        organization_id: itemData?.organization_id,
        industry_association_id: itemData?.industry_association_id,
        institute_ids: institutes,
        skill_id: itemData?.skill_id,
        end_date: itemData?.end_date,
        vacancy: itemData?.vacancy,
        requirement: itemData?.remaining_vacancy,
      };

      if (itemData?.hr_demands) {
        let array = [];
        for (let i = 1; i < itemData?.hr_demands.length; i++) {
          array.push(i);
        }
        setHrDemandFields(array);
      }

      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  console.log('errors:', errors);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (itemId) {
        await updateHumanResourceDemand(itemId, data);
        updateSuccessMessage('job_requirement.label');
        mutateHumanResourceDemand();
      }

      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({
        error,
        setError,
        validationSchema,
        errorStack,
      });
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      title={
        <>
          <IconHumanResourceDemand />
          {isEdit && (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='job_requirement.label' />}}
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
        <Grid item xs={12}>
          {authUser && !authUser.isIndustryAssociationUser && (
            <CustomFilterableFormSelect
              required
              id='industry_association_id'
              label={messages['common.industry_association']}
              isLoading={isLoadingIndustryAssociation}
              options={industryAssociations}
              optionValueProp={'id'}
              optionTitleProp={['title', 'title_en']}
              control={control}
              errorInstance={errors}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <CustomFilterableFormSelect
            required
            id='organization_id'
            label={messages['organization.label']}
            isLoading={isLoadingOrganizations}
            options={organizations}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomSelectAutoComplete
            id={'institute_ids'}
            label={messages['common.institute']}
            isLoading={isLoadingInstitute}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            control={control}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            required
            id={'end_date'}
            label={messages['common.end_date']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id={'skill_id'}
            label={messages['common.skills']}
            isLoading={isLoadingSkills}
            options={skills}
            optionValueProp={'id'}
            optionTitleProp={['title', 'title_en']}
            control={control}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'vacancy'}
            label={messages['common.vacancy']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'requirement'}
            label={messages['common.requirements']}
            register={register}
            errorInstance={errors}
          />
        </Grid>

        {!itemId && (
          <Grid item xs={12}>
            <Box display={'flex'} justifyContent={'flex-end'}>
              <Button
                variant={'contained'}
                color={'primary'}
                sx={{marginRight: '10px'}}
                onClick={onAddHrDemand}>
                Add
              </Button>
              <Button
                variant={'contained'}
                color={'primary'}
                onClick={onRemoveHrDemand}>
                Remove
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </HookFormMuiModal>
  );
};

export default HumanResourceDemandEditPopup;
