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
import JobRequirementFields from './JobRequirementFields';
import {Box} from '@mui/system';
import IconHumanResourceDemand from '../../../@softbd/icons/HumanResourceDemand';
import {createHumanResourceDemand} from '../../../services/IndustryManagement/HrDemandService';
import {useFetchIndustryAssociations} from '../../../services/IndustryAssociationManagement/hooks';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

interface HumanResourceDemandAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  organization_id: '',
  hr_demands: [{mandatory_skill_ids: [], optional_skill_ids: []}],
};

const HumanResourceDemandAddEditPopup: FC<
  HumanResourceDemandAddEditPopupProps
> = ({itemId, refreshDataTable, ...props}) => {
  const authUser = useAuthUser<CommonAuthUser>();
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage} = useSuccessMessage();
  const [hrDemandFields, setHrDemandFields] = useState<Array<number>>([1]);
  const isEdit = itemId != null;
  const {data: itemData, isLoading} = useFetchHumanResourceDemand(itemId);

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
      hr_demands: yup.array().of(
        yup.object().shape({
          institute_id: yup
            .array()
            .of(yup.object())
            .min(1)
            .label(messages['common.institute'] as string),
          mandatory_skill_ids: yup
            .array()
            .of(yup.object())
            .min(1)
            .required()
            .label(messages['common.mandatory_skills'] as string),
          optional_skill_ids: yup
            .array()
            .of(yup.object())
            .nullable()
            .label(messages['common.optional_skills'] as string),
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
        }),
      ),
    });
  }, [messages]);

  const {
    register,
    control,
    reset,
    setError,
    getValues,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      let institutes = [itemData?.all_institutes];

      let hrDemands = {
        institute_id: institutes,
        skill_id: itemData?.skill_id,
        end_date: itemData?.end_date,
        vacancy: itemData?.vacancy,
        requirement: itemData?.remaining_vacancy,
      };
      let hrDemandsArr = [];
      hrDemandsArr[0] = hrDemands;

      let data = {
        organization_id: itemData?.organization_id,
        industry_association_id: itemData?.industry_association_id,
        hr_demands: hrDemandsArr,
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

  console.log('errors', errors);
  console.log('values', getValues());

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    console.log('data', JSON.parse(JSON.stringify(data)));

    const formData = {...data};

    formData.hr_demands = formData.hr_demands.map((hrDemand: any) => {
      hrDemand.institute_ids =
        hrDemand?.institute_id?.length >= 1
          ? hrDemand.institute_id.map((institute: any) => institute.id)
          : null;

      hrDemand.mandatory_skill_ids = hrDemand.mandatory_skill_ids.map(
        (skill: any) => skill.id,
      );
      hrDemand.optional_skill_ids =
        hrDemand?.optional_skill_ids?.length >= 1
          ? hrDemand.optional_skill_ids.map((skill: any) => skill.id)
          : null;

      return hrDemand;
    });

    try {
      await createHumanResourceDemand(formData);
      createSuccessMessage('job_requirement.label');
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
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='job_requirement.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
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
        {hrDemandFields.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <JobRequirementFields
                index={index}
                control={control}
                instituteOptions={institutes}
                skillOptions={skills}
                isLoadingInstitute={isLoadingInstitute}
                isLoadingSkill={isLoadingSkills}
                register={register}
                errorInstance={errors}
              />
            </React.Fragment>
          );
        })}
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
export default HumanResourceDemandAddEditPopup;
