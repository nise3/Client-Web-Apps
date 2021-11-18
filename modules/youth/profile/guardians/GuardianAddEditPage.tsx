import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {getMomentDateFormat} from '../../../../@softbd/utilities/helpers';
import SubmitButton from '../../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {processServerSideErrors} from '../../../../@softbd/utilities/validationErrorHandler';
import yup from '../../../../@softbd/libs/yup';
import useNotiStack from '../../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import {Box, Grid, Zoom} from '@mui/material';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import {useFetchGuardian} from '../../../../services/youthManagement/hooks';
import {Guardian} from '../../../../services/youthManagement/typing';
import {
  createGuardian,
  updateGuardian,
} from '../../../../services/youthManagement/GuardianService';
import CustomHookForm from '../component/CustomHookForm';
import CustomTextInput from '../../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import CustomDateTimeField from '../../../../@softbd/elements/input/CustomDateTimeField';
import {
  MOBILE_NUMBER_REGEX,
  NID_REGEX,
} from '../../../../@softbd/common/patternRegex';
import useSuccessMessage from '../../../../@softbd/hooks/useSuccessMessage';
import CustomFilterableFormSelect from '../../../../@softbd/elements/input/CustomFilterableFormSelect';

interface GuardianAddEditPageProps {
  itemId: number | null;
  onClose: () => void;
}

const initialValues = {
  name: '',
  name_en: '',
  nid: '',
  mobile: '',
  date_of_birth: '',
  relationship_type: '',
  relationship_title: '',
  relationship_title_en: '',
};

const GuardianAddEditPage: FC<GuardianAddEditPageProps> = ({
  itemId,
  onClose: onGuardianAddEditFormClose,
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [showOther, setShowOther] = useState(1);

  const relationshipTypes = useMemo(() => {
    let relationShips = [];
    for (let i = 1; i <= 7; i++) {
      relationShips.push({
        id: i,
        title: messages['common.guardian_types'][i - 1],
      });
    }
    return relationShips;
  }, [messages]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      name: yup
        .string()
        .required()
        .label(messages['guardian.name'] as string),
      relationship_type: yup
        .string()
        .required()
        .label(messages['guardian.relationship_type'] as string),
      relationship_title:
        showOther == 7
          ? yup
              .string()
              .required()
              .label(messages['guardian.relationship_title'] as string)
          : yup.string().nullable(),
      mobile: yup
        .string()
        .nullable()
        .matches(MOBILE_NUMBER_REGEX)
        .label(messages['common.mobile'] as string),
      nid: yup
        .string()
        .nullable()
        .matches(NID_REGEX)
        .label(messages['common.nid'] as string),
    });
  }, [messages, showOther]);

  const {
    control,
    register,
    reset,
    handleSubmit,
    setError,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    data: itemData,
    isLoading,
    mutate: mutateGuardian,
  } = useFetchGuardian(itemId);

  useEffect(() => {
    if (itemData) {
      reset({
        name: itemData?.name,
        name_en: itemData?.name_en,
        nid: itemData?.nid,
        mobile: itemData?.mobile,
        date_of_birth: itemData?.date_of_birth
          ? getMomentDateFormat(itemData.date_of_birth, 'YYYY-MM-DD')
          : '',
        relationship_type:
          itemData?.relationship_type === 7
            ? (setShowOther(7), itemData?.relationship_type)
            : (setShowOther(itemData?.relationship_type),
              itemData?.relationship_type),
        relationship_title: itemData?.relationship_title,
        relationship_title_en: itemData?.relationship_title_en,
      });
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const onSubmit: SubmitHandler<Guardian> = async (data: Guardian) => {
    try {
      if (itemId) {
        await updateGuardian(itemId, data);
        updateSuccessMessage('guardian.info');
      } else {
        await createGuardian(data);
        createSuccessMessage('guardian.info');
      }
      mutateGuardian();
      onGuardianAddEditFormClose();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <Zoom in={true}>
      <Box>
        <CustomHookForm
          title={messages['guardian.title']}
          handleSubmit={handleSubmit(onSubmit)}
          actions={
            <React.Fragment>
              <CancelButton
                onClick={onGuardianAddEditFormClose}
                isLoading={isLoading}
              />
              <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
            </React.Fragment>
          }
          onClose={onGuardianAddEditFormClose}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='name'
                label={messages['guardian.name']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='name_en'
                label={messages['guardian.name_en']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                id='nid'
                label={messages['guardian.nid']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomTextInput
                required
                id='mobile'
                label={messages['guardian.mobile']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
                placeholder='017xxxxxxxx'
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomDateTimeField
                id='date_of_birth'
                label={messages['guardian.date_of_birth']}
                register={register}
                errorInstance={errors}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFilterableFormSelect
                required
                id='relationship_type'
                label={messages['guardian.relationship_type']}
                isLoading={isLoading}
                control={control}
                options={relationshipTypes}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={(value: number) => setShowOther(value)}
              />
            </Grid>
            {showOther === 7 && (
              <React.Fragment>
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    required
                    id='relationship_title'
                    label={messages['guardian.relationship_title']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomTextInput
                    id='relationship_title_en'
                    label={messages['guardian.relationship_title_en']}
                    register={register}
                    errorInstance={errors}
                    isLoading={isLoading}
                  />
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </CustomHookForm>
      </Box>
    </Zoom>
  );
};

export default GuardianAddEditPage;
