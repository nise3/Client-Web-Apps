import {Grid} from '@mui/material';
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
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetchAssessment,
  useFetchRPLLevels,
  useFetchRPLOccupations,
  useFetchRPLSectors,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {IAssessment} from '../../../shared/Interface/common.interface';
import {
  createAssessment,
  updateAssessment,
} from '../../../services/CertificateAuthorityManagement/AssessmentService';
import IconCourse from '../../../@softbd/icons/IconCourse';

interface AssessmentAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  rpl_sector_id: '',
  rpl_occupation_id: '',
  rpl_level_id: '',
  passing_score: '',
  assessment_fee: '',
};

const AssessmentAddEditPopup: FC<AssessmentAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [rplSectorFilter] = useState<any>({});
  const [occupationFilter, setOccupationFilter] = useState<any>(null);
  const [levelFilter, setLevelFilter] = useState<any>(null);
  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateAssessment,
  } = useFetchAssessment(itemId);

  const {data: rplSectors, isLoading: isLoadingRplSectors} =
    useFetchRPLSectors(rplSectorFilter);

  const {data: occupations, isLoading: isLoadingOccupations} =
    useFetchRPLOccupations(occupationFilter);

  const {data: levels, isLoading: isLoadingLevels} =
    useFetchRPLLevels(levelFilter);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .trim()
        .required()
        .label(messages['common.title'] as string),
      rpl_occupation_id: yup
        .string()
        .trim()
        .required()
        .label(messages['occupations.label'] as string),
      rpl_level_id: yup
        .string()
        .trim()
        .required()
        .label(messages['rpl_level.name'] as string),
      passing_score: yup
        .string()
        .trim()
        .required()
        .label(messages['rpl_level.passing_score'] as string),
      assessment_fee: yup
        .string()
        .trim()
        .required()
        .label(messages['common.assessment_fee'] as string),
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
      let data: any = {
        title: itemData?.title,
        title_en: itemData?.title_en,
        rpl_sector_id: itemData?.rpl_sector_id,
        rpl_occupation_id: itemData?.rpl_occupation_id,
        rpl_level_id: itemData?.rpl_level_id,
        passing_score: itemData?.passing_score,
        assessment_fee: itemData?.assessment_fee,
      };
      handleRplSectorChange(itemData?.rpl_sector_id);
      handleRplOccupationChange(itemData?.rpl_occupation_id);
      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const handleRplSectorChange = useCallback(
    (sectorId: any) => {
      setOccupationFilter({rpl_sector_id: sectorId});
      setLevelFilter(null);
    },
    [occupationFilter],
  );

  const handleRplOccupationChange = useCallback(
    (occupationId: any) => {
      setLevelFilter({rpl_occupation_id: occupationId});
    },
    [levelFilter],
  );

  const onSubmit: SubmitHandler<any> = async (data: IAssessment) => {
    try {
      if (itemId) {
        await updateAssessment(itemId, data);
        updateSuccessMessage('assessment.label');
        mutateAssessment();
      } else {
        await createAssessment(data);
        createSuccessMessage('assessment.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      {...props}
      open={true}
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      title={
        <>
          <IconCourse />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='assessment.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='assessment.label' />}}
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'title'}
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id={'title_en'}
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id={'rpl_sector_id'}
            label={messages['rpl_sector.label']}
            isLoading={isLoadingRplSectors}
            control={control}
            options={rplSectors}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={handleRplSectorChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id={'rpl_occupation_id'}
            label={messages['occupations.label']}
            isLoading={isLoadingOccupations}
            control={control}
            options={occupations}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={handleRplOccupationChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomFilterableFormSelect
            required
            id={'rpl_level_id'}
            label={messages['rpl_level.name']}
            isLoading={isLoadingLevels}
            control={control}
            options={levels}
            optionValueProp={'id'}
            optionTitleProp={['title', 'sequence_order']}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'passing_score'}
            label={messages['rpl_level.passing_score']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id={'assessment_fee'}
            label={messages['common.assessment_fee']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default AssessmentAddEditPopup;
