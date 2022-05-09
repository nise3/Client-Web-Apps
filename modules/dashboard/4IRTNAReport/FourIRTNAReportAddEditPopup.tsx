import {useEffect} from 'react';
import yup from '../../../@softbd/libs/yup';
import {Grid} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useMemo} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import {ITNAReport} from '../../../shared/Interface/4IR.interface';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CustomDateTimeField from '../../../@softbd/elements/input/CustomDateTimeField';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {
  createTNAReport,
  updateTNAReport,
} from '../../../services/4IRManagement/TNAReportServices';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchTNAReport} from '../../../services/instituteManagement/hooks';

interface ImplementingTeamAddEditPopupProps {
  itemId: number | null;
  fourIRProjectId: number;
  onClose: () => void;
  refreshDataTable: () => void;
}

const initialValues = {
  workshop_method_workshop_numbers: 0,
  workshop_method_file: '',
  fgd_workshop_numbers: 0,
  fgd_workshop_file: '',
  industry_visit_workshop_numbers: 0,
  industry_visit_file: '',
  desktop_research_workshop_numbers: 0,
  desktop_research_file: '',
  existing_report_review_workshop_numbers: 0,
  existing_report_review_file: '',
  others_workshop_numbers: 0,
  others_file: '',
  file_path: '',
  row_status: 0,
};

const FourIRTNAReportAddEditPopup: FC<ImplementingTeamAddEditPopupProps> = ({
  itemId,
  fourIRProjectId,
  refreshDataTable,

  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();
  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();

  const {
    data: itemData,
    isLoading,
    mutate: mutateTNAReport,
  } = useFetchTNAReport(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      workshop_method_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report.workshop_method_workshop'] as string),
      workshop_method_file: yup
        .string()
        .label(messages['4ir.tna_report.workshop_method_workshop'] as string),
      fgd_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report.fgd_workshop'] as string),
      fgd_workshop_file: yup
        .string()
        .label(messages['4ir.tna_report.fgd_workshop'] as string),
      industry_visit_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report.industry_visit_workshop'] as string),
      industry_visit_file: yup
        .string()
        .label(messages['4ir.tna_report.industry_visit_workshop'] as string),
      desktop_research_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report.desktop_research_workshop'] as string),
      desktop_research_file: yup
        .string()
        .label(messages['desktop_research_file'] as string),
      existing_report_review_workshop_numbers: yup
        .number()
        .label(messages['existing_report_review_workshop'] as string),
      existing_report_review_file: yup
        .string()
        .label(messages['existing_report_review_workshop'] as string),
      others_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report.others_workshop'] as string),
      others_file: yup
        .string()
        .label(messages['4ir.tna_report.others_workshop'] as string),
      file_path: yup.string().label(messages['common.file_path'] as string),
    });
  }, [messages]);

  const {
    //    control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<ITNAReport>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        workshop_method_workshop_numbers:
          itemData?.workshop_method_workshop_numbers,
        workshop_method_file: itemData?.workshop_method_file,
        fgd_workshop_numbers: itemData?.fgd_workshop_numbers,
        fgd_workshop_file: itemData?.fgd_workshop_file,
        industry_visit_workshop_numbers:
          itemData?.industry_visit_workshop_numbers,
        industry_visit_file: itemData?.industry_visit_file,
        desktop_research_workshop_numbers:
          itemData?.desktop_research_workshop_numbers,
        desktop_research_file: itemData?.desktop_research_file,
        existing_report_review_workshop_numbers:
          itemData?.existing_report_review_workshop_numbers,
        existing_report_review_file: itemData?.existing_report_review_file,
        others_workshop_numbers: itemData?.others_workshop_numbers,
        others_file: itemData?.others_file,
        file_path: itemData?.file_path,
        row_status: itemData?.row_status,
      });
    } else reset(initialValues);
  }, [itemData]);

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      let payload = {
        four_ir_project_id: fourIRProjectId,
        ...data,
      };

      if (itemId !== null) {
        await updateTNAReport(payload, itemId);
        updateSuccessMessage('4ir.TNA_report');
        mutateTNAReport();
      } else {
        await createTNAReport(payload);
        createSuccessMessage('4ir.TNA_report');
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
          <IconBranch />
          {isEdit ? (
            <IntlMessages
              id='common.edit'
              values={{subject: <IntlMessages id='4ir.TNA_report' />}}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir.TNA_report' />,
              }}
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
        <Grid item xs={12} md={6}>
          <CustomTextInput
            required
            id='workshop_name'
            label={messages['common.workshop_name']}
            register={register}
            errorInstance={errors}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='skill_required'
            label={messages['common.required_skill']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='start_date'
            label={messages['common.start_date']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomDateTimeField
            id='end_date'
            label={messages['common.end_date']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} alignSelf='center'>
          <CustomTextInput
            required
            id='venue'
            label={messages['common.venue']}
            register={register}
            errorInstance={errors}
            isLoading={false}
            rows={3}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FileUploadComponent
            id='file_path'
            errorInstance={errors}
            setValue={setValue}
            register={register}
            sizeLimitText={'3MB'}
            label={messages['common.project_upload']}
            required={false}
          />
        </Grid>
      </Grid>
    </HookFormMuiModal>
  );
};
export default FourIRTNAReportAddEditPopup;
