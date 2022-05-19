import yup from '../../../@softbd/libs/yup';
import Grid from '@mui/material/Grid';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useIntl} from 'react-intl';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import ShowInTypes from '../../../@softbd/utilities/ShowInTypes';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {
  createSlider,
  updateSlider,
} from '../../../services/cmsManagement/SliderService';
import CustomFormSelect from '../../../@softbd/elements/input/CustomFormSelect/CustomFormSelect';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {
  useFetchLocalizedCMSGlobalConfig,
  useFetchSlider,
} from '../../../services/cmsManagement/hooks';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import IconSlider from '../../../@softbd/icons/IconSlider';
import {objectFilter} from '../../../@softbd/utilities/helpers';
import {getAllInstitutes} from '../../../services/instituteManagement/InstituteService';
import {getAllOrganizations} from '../../../services/organaizationManagement/OrganizationService';
import {getAllIndustryAssociations} from '../../../services/IndustryAssociationManagement/IndustryAssociationService';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

interface SliderAddEditPopupProps {
  itemId: number | null;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  institute_id: '',
  organization_id: '',
  industry_association_id: '',
  row_status: '1',
};

const SliderAddEditPopup: FC<SliderAddEditPopupProps> = ({
  itemId,
  refreshDataTable,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const authUser = useAuthUser();

  const isEdit = itemId != null;
  const {
    data: itemData,
    isLoading,
    mutate: mutateSlider,
  } = useFetchSlider(itemId);

  const {data: cmsGlobalConfig, isLoading: isFetching} =
    useFetchLocalizedCMSGlobalConfig();

  const [instituteList, setInstituteList] = useState([]);
  const [industryList, setIndustryList] = useState([]);
  const [industryAssociationList, setIndustryAssociationList] = useState([]);
  const [isLoadingSectionNameList, setIsLoadingSectionNameList] =
    useState<boolean>(false);
  const [showInId, setShowInId] = useState<number | null>(null);

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

      show_in:
        authUser && authUser.isSystemUser
          ? yup
              .string()
              .trim()
              .required()
              .label(messages['faq.show_in'] as string)
          : yup.string(),
      institute_id: yup
        .mixed()
        .label(messages['common.institute'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.TSP;
          },
          then: yup.string().required(),
        }),
      organization_id: yup
        .mixed()
        .label(messages['organization.label'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.INDUSTRY;
          },
          then: yup.string().required(),
        }),
      industry_association_id: yup
        .mixed()
        .label(messages['common.industry_association'] as string)
        .when('show_in', {
          is: (val: number) => {
            return val == ShowInTypes.INDUSTRY_ASSOCIATION;
          },
          then: yup.string().required(),
        }),
    });
  }, [messages, authUser]);

  const {
    reset,
    register,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      let data: any = {
        title: itemData?.title,
        show_in: itemData?.show_in,
        organization_id: itemData?.organization_id,
        institute_id: itemData?.institute_id,
        industry_association_id: itemData?.industry_association_id,
        row_status: String(itemData?.row_status),
      };

      reset(data);
      setShowInId(itemData?.show_in);
      if (authUser?.isSystemUser) {
        changeShowInAction(itemData?.show_in);
      }
    } else {
      reset(initialValues);
    }
  }, [itemData]);

  const changeShowInAction = useCallback((id: number) => {
    (async () => {
      setIsLoadingSectionNameList(true);

      if (id != ShowInTypes.TSP) {
        setValue('institute_id', '');
      }
      if (id != ShowInTypes.INDUSTRY) {
        setValue('organization_id', '');
      }

      if (id != ShowInTypes.INDUSTRY_ASSOCIATION) {
        setValue('industry_association_id', '');
      }

      try {
        if (id === ShowInTypes.TSP && instituteList.length == 0) {
          const response = await getAllInstitutes({
            row_status: RowStatus.ACTIVE,
          });
          if (response && response?.data) {
            setInstituteList(response.data);
          }
        } else if (id == ShowInTypes.INDUSTRY && industryList.length == 0) {
          const response = await getAllOrganizations({
            row_status: RowStatus.ACTIVE,
          });
          if (response && response?.data) {
            setIndustryList(response.data);
          }
        } else if (
          id == ShowInTypes.INDUSTRY_ASSOCIATION &&
          industryAssociationList.length == 0
        ) {
          const response = await getAllIndustryAssociations({
            row_status: RowStatus.ACTIVE,
          });
          if (response && response?.data) {
            setIndustryAssociationList(response.data);
          }
        }
      } catch (e) {}

      setShowInId(id);
      setIsLoadingSectionNameList(false);
    })();
  }, []);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      if (!authUser?.isSystemUser) {
        delete data.show_in;
        delete data.institute_id;
        delete data.organization_id;
        delete data.industry_association_id;
      }

      if (data.show_in != ShowInTypes.TSP) {
        data.institute_id = '';
      }
      if (data.show_in != ShowInTypes.INDUSTRY) {
        data.organization_id = '';
      }
      if (data.show_in != ShowInTypes.INDUSTRY_ASSOCIATION) {
        data.industry_association_id = '';
      }
      objectFilter(data);

      if (itemId) {
        await updateSlider(itemId, data);
        updateSuccessMessage('slider.label');
        mutateSlider();
      } else {
        await createSlider(data);
        createSuccessMessage('slider.label');
      }
      props.onClose();
      refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  return (
    <HookFormMuiModal
      open={true}
      {...props}
      title={
        <>
          <IconSlider />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='slider.label' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{subject: <IntlMessages id='slider.label' />}}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={isLoading} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading} />
        </>
      }>
      <Grid container spacing={5}>
        {authUser && authUser.isSystemUser && (
          <React.Fragment>
            <Grid item xs={12}>
              <CustomFormSelect
                required
                id={'show_in'}
                label={messages['faq.show_in']}
                isLoading={isFetching}
                control={control}
                options={cmsGlobalConfig?.show_in}
                optionValueProp={'id'}
                optionTitleProp={['title']}
                errorInstance={errors}
                onChange={changeShowInAction}
              />
            </Grid>
            {showInId == ShowInTypes.TSP && (
              <Grid item xs={12}>
                <CustomFilterableFormSelect
                  required
                  id={'institute_id'}
                  label={messages['institute.label']}
                  isLoading={isLoadingSectionNameList}
                  control={control}
                  options={instituteList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            )}
            {showInId == ShowInTypes.INDUSTRY && (
              <Grid item xs={12}>
                <CustomFilterableFormSelect
                  required
                  id={'organization_id'}
                  label={messages['organization.label']}
                  isLoading={isLoadingSectionNameList}
                  control={control}
                  options={industryList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            )}
            {showInId == ShowInTypes.INDUSTRY_ASSOCIATION && (
              <Grid item xs={12}>
                <CustomFilterableFormSelect
                  required
                  id={'industry_association_id'}
                  label={messages['common.industry_association']}
                  isLoading={isLoadingSectionNameList}
                  control={control}
                  options={industryAssociationList}
                  optionValueProp={'id'}
                  optionTitleProp={['title']}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </React.Fragment>
        )}

        <Grid item xs={12}>
          <CustomTextInput
            required
            id='title'
            label={messages['common.title']}
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

export default SliderAddEditPopup;
