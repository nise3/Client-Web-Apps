import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import yup from '../../../@softbd/libs/yup';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {
  useFetchLocalizedPublicRPLLevels,
  useFetchLocalizedPublicRPLOccupations,
  useFetchLocalizedPublicRPLSectors,
  useFetchRTOBatch,
} from '../../../services/CertificateAuthorityManagement/hooks';
import {
  createRTOBatch,
  updateRTOBatch,
} from '../../../services/CertificateAuthorityManagement/RTOBatchService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {useFetchPublicInstitutes} from '../../../services/instituteManagement/hooks';
import {InstituteServiceTypes} from '../../../@softbd/utilities/InstituteServiceTypes';
import IconBatch from '../../../@softbd/icons/IconBatch';

interface RTOBatchAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  title: '',
  title_en: '',
  institute_id: '',
  rpl_sector_id: '',
  rpl_level_id: '',
  rpl_occupation_id: '',
};

const RTOBatchAddEditPopup: FC<RTOBatchAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const [institutesFilters] = useState({
    service_type: InstituteServiceTypes.CERTIFICATE,
  });
  const [rplSectorsFilters] = useState({});
  const [rplOccupationsFilters, setOccupationsFilter] = useState({});
  const [rplLevelsFilters, setLevelsFilter] = useState({});

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateRTOBatch,
  } = useFetchRTOBatch(itemId);

  const {data: institutes, isLoading: isFetchingInstitutes} =
    useFetchPublicInstitutes(institutesFilters);
  const {data: rplLevels, isLoading: isFetchingRPLLevels} =
    useFetchLocalizedPublicRPLLevels(rplLevelsFilters);
  const {data: rplSectors, isLoading: isFetchingRPLSectors} =
    useFetchLocalizedPublicRPLSectors(rplSectorsFilters);
  const {data: rplOccupations, isLoading: isFetchingRPLOccupations} =
    useFetchLocalizedPublicRPLOccupations(rplOccupationsFilters);

  const handleRplSectorChange = useCallback(
    (sectorId: any) => {
      setOccupationsFilter({rpl_sector_id: sectorId});
    },
    [rplOccupationsFilters],
  );

  const handleRplOccupationChange = useCallback(
    (occupationId: any) => {
      setLevelsFilter({rpl_occupation_id: occupationId});
    },
    [rplLevelsFilters],
  );

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      title: yup
        .string()
        .title('bn', true, messages['common.special_character_error'] as string)
        .label(messages['common.title'] as string),
      title_en: yup
        .string()
        .title(
          'en',
          false,
          messages['common.special_character_error'] as string,
        )
        .label(messages['common.title_en'] as string),

      institute_id: yup
        .string()
        .required()
        .label(messages['institute.label'] as string),
      rpl_occupation_id: yup
        .string()
        .required()
        .label(messages['rpl_occupation.label'] as string),
      rpl_level_id: yup
        .string()
        .required()
        .label(messages['rpl_level.label'] as string),
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
        institute_id: itemData?.institute_id,
        rpl_sector_id: itemData?.rpl_sector_id,
        rpl_occupation_id: itemData?.rpl_occupation_id,
        rpl_level_id: itemData?.rpl_level_id,
      };

      reset(data);
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let rtoId = 1;
      data.rto_id = rtoId;
      if (itemId) {
        await updateRTOBatch(itemId, data);
        updateSuccessMessage('rto_batch.label');
        mutateRTOBatch();
      } else {
        await createRTOBatch(data);
        createSuccessMessage('rto_batch.label');
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
          <IconBatch />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='rto_batch.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='rto_batch.label' />}}
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
            required
            id={'title'}
            label={messages['common.title']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            id={'title_en'}
            label={messages['common.title_en']}
            register={register}
            errorInstance={errors}
            isLoading={isLoading}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            required
            id={'institute_id'}
            label={messages['certificate_authority.label']}
            isLoading={isFetchingInstitutes}
            control={control}
            options={institutes}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            required
            id={'rpl_sector_id'}
            label={messages['rpl_sector.label']}
            isLoading={isFetchingRPLSectors}
            control={control}
            options={rplSectors}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={handleRplSectorChange}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            required
            id={'rpl_occupation_id'}
            label={messages['rpl_occupation.label']}
            isLoading={isFetchingRPLOccupations}
            control={control}
            options={rplOccupations}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={handleRplOccupationChange}
          />
        </Grid>

        <Grid item xs={6}>
          <CustomFilterableFormSelect
            required
            id={'rpl_level_id'}
            label={messages['rpl_level.label']}
            isLoading={isFetchingRPLLevels}
            control={control}
            options={rplLevels}
            optionValueProp={'id'}
            optionTitleProp={['title', 'sequence_order']}
            errorInstance={errors}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default RTOBatchAddEditPopup;
