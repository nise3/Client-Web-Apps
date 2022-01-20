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
import {useFetchInstitutes} from '../../../services/instituteManagement/hooks';
import {
  useFetchOrganizations,
  useFetchSkills,
} from '../../../services/organaizationManagement/hooks';
import HrDemandFields from './HrDemandFields';
import {Box} from '@mui/system';
import IconHumanResourceDemand from '../../../@softbd/icons/HumanResourceDeman';
import {
  createHumanResourceDemand,
  updateHumanResourceDemand,
} from '../../../services/IndustryManagement/HrDemandService';

interface HumanResourceDemandAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  organization_id: '',
};

const HumanResourceDemandAddEditPopup: FC<HumanResourceDemandAddEditPopupProps> =
  ({itemId, refreshDataTable, ...props}) => {
    const {messages} = useIntl();
    const {errorStack} = useNotiStack();
    const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
    const [hrDemandFields, setHrDemandFields] = useState<Array<number>>([1]);
    console.log('hrDemandFields', hrDemandFields);
    const isEdit = itemId != null;
    const {
      data: itemData,
      isLoading,
      mutate: mutateHumanResourceDemand,
    } = useFetchHumanResourceDemand(itemId);

    const [organizationFilter] = useState({});
    const {data: organizations, isLoading: isLoadingOrganizations} =
      useFetchOrganizations(organizationFilter);

    const [instituteFilter] = useState({});
    const {data: institutes, isLoading: isLoadingInstitute} =
      useFetchInstitutes(instituteFilter);

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
        hr_demands: yup.array().of(
          yup.object().shape({
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
          }),
        ),
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
    console.log('errors', errors);
    useEffect(() => {
      if (itemData) {
        let data = {
          organization_id: itemData?.organization_id,
          hr_demands: itemData?.hr_demands,
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
    const onSubmit: SubmitHandler<any> = async (data: any) => {
      console.log('data--', data);

      try {
        data.industry_association_id = 30;
        if (itemId) {
          await updateHumanResourceDemand(itemId, data);
          updateSuccessMessage('job_requirement.label');
          mutateHumanResourceDemand();
        } else {
          await createHumanResourceDemand(data);
          createSuccessMessage('job_requirement.label');
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
            <CustomFilterableFormSelect
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
                <HrDemandFields
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
        </Grid>
      </HookFormMuiModal>
    );
  };
export default HumanResourceDemandAddEditPopup;