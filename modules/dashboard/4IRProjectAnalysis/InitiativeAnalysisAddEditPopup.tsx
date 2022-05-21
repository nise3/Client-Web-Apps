import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {Grid, Link} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import {useFetch4IRInitiativeAnalysis} from '../../../services/4IRManagement/hooks';
import FileUploadComponent from '../../filepond/FileUploadComponent';
import {createInitiativeAnalysis} from '../../../services/4IRManagement/initiativeAnalysis';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';

interface FourIRTNAReportAddEditPopupProps {
  fourIRInitiativeId: number;
  onClose: () => void;
  refreshDataTable: () => void;
  itemId: number | null;
}

const initialValues = {
  researcher_name: '',
  organization_name: '',
  research_team_information: null,
  research_method: '',
  file_path: '',
  row_status: '1',
};

const InitiativeAnalysisAddEditPopup: FC<FourIRTNAReportAddEditPopupProps> = ({
  fourIRInitiativeId,
  refreshDataTable,
  itemId,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

  const isEdit = itemId != null;

  const {createSuccessMessage, updateSuccessMessage} = useSuccessMessage();
  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);

  const {data: itemData} = useFetch4IRInitiativeAnalysis(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      researcher_name: yup
        .string()
        .trim()
        .required()
        .label(messages['4ir.researcher_name'] as string),
      organization_name: yup
        .string()
        .trim()
        .required()
        .label(messages['common.organization_name'] as string),
      research_team_information: yup
        .mixed()
        .required()
        .test(
          'rrrrr',
          messages['4ir.research_team_information'] as string,
          (value: any) => {
            if (!value) return false;
            if (value === '') return false;
            if (value.length === 0) return false;
            return true;
          },
        )
        .label(messages['4ir.research_team_information'] as string),
      row_status: yup.string(),
    });
  }, [isEdit, messages]);

  const {
    control,
    register,
    reset,
    setError,
    setValue,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<any>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (itemData) {
      reset({
        researcher_name: itemData?.researcher_name,
        organization_name: itemData?.organization_name,
        research_team_information: itemData?.research_team_information,
        research_method: itemData?.research_method,
        file_path: itemData?.file_path,
        row_status: itemData?.row_status,
      });
    } else reset(initialValues);
  }, [itemData]);

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const payload = new FormData();
      payload.append('four_ir_initiative_id', String(fourIRInitiativeId));

      Object.keys(data).map((field) => {
        if (field) {
          if (field === 'research_team_information') {
            payload.append(field, data?.[field]?.[0]);
          } else payload.append(field, data?.[field]);
        }
      });
      // payload.append('researcher_name', String(data?.researcher_name));
      // payload.append('organization_name', String(data?.organization_name));
      // payload.append('research_method', String(data?.research_method));
      // payload.append(
      //   'research_team_information',
      //   String(data?.research_team_information),
      // );
      // payload.append('report_file', String(data?.report_file));
      // payload.append('row_status', String(data?.row_status));

      if (data?.research_team_information) {
        if (!isEdit || (isEdit && data?.research_team_information?.[0]))
          payload.append(
            'research_team_information',
            data?.research_team_information?.[0],
          );
      }

      if (isEdit) {
        payload.append('operation_type', 'UPDATE');
        payload.append('four_ir_initiative_id', String(itemId));
        await createInitiativeAnalysis(payload);
        updateSuccessMessage('4ir_initiative_analysis.label');
        await closeAction();
      } else {
        await createInitiativeAnalysis(payload);
        createSuccessMessage('4ir_initiative_analysis.label');
        setShowSuccessPopUp(true);
      }
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const emptyFile = (fileId: any) => {
    setValue(fileId, '');
  };

  const fileUploadHandler = (files: any, fileId: any, type = 'execl') => {
    if (files.length < 1) {
      emptyFile(fileId);
      return;
    }

    if (type == 'execl') {
      if (
        files[0].type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        emptyFile(fileId);
        errorStack(messages['common.only_xlsx_file']);
        return;
      }
    } else if (type === 'word/pdf') {
      if (
        !(
          files[0].type == 'application/pdf' ||
          files[0].type === 'application/pdf'
        )
      ) {
        {
          emptyFile(fileId);
          errorStack(messages['common.only_word_pdf']);
          return;
        }
      }
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
              values={{
                subject: <IntlMessages id='4ir_initiative_analysis.label' />,
              }}
            />
          ) : (
            <IntlMessages
              id='common.add_new'
              values={{
                subject: <IntlMessages id='4ir_initiative_analysis.label' />,
              }}
            />
          )}
        </>
      }
      maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
      handleSubmit={handleSubmit(onSubmit)}
      actions={
        <>
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
        </>
      }>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='researcher_name'
            label={messages['4ir.researcher_name']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextInput
            required
            id='organization_name'
            label={messages['common.organization_name']}
            register={register}
            errorInstance={errors}
            isLoading={false}
          />
        </Grid>

        <Grid item xs={6}>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              <CustomTextInput
                required
                id='research_team_information'
                name='research_team_information'
                label={messages['4ir.initiative-alalysis_recharge_upload']}
                register={register}
                type={'file'}
                InputLabelProps={{
                  shrink: true,
                }}
                onInput={(files: any) =>
                  fileUploadHandler(files, 'research_team_information')
                }
                errorInstance={errors}
              />
            </Grid>

            <Grid item xs={4}>
              <Link href='/template/organization-list.xlsx' download>
                <CommonButton
                  key={1}
                  onClick={() => console.log('file downloading')}
                  btnText={'4ir.tna_report_demo_file'}
                  variant={'outlined'}
                  color={'primary'}
                />
              </Link>
            </Grid>

            <Grid item xs={8}>
              <FileUploadComponent
                id='file_path'
                defaultFileUrl={itemData?.file_path}
                sizeLimitText='3MB'
                errorInstance={errors}
                setValue={setValue}
                register={register}
                label={messages['4ir.initiative-alalysis_report_upload']}
                required={false}
                acceptedFileTypes={[
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'application/pdf',
                ]}
              />
            </Grid>

            <Grid item xs={4}>
              <Link href='/template/organization-list.xlsx' download>
                <CommonButton
                  key={1}
                  onClick={() => console.log('file downloading')}
                  btnText={'4ir.tna_report_demo_file'}
                  variant={'outlined'}
                  color={'primary'}
                />
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <CustomTextInput
            id='research_method'
            label={messages['4ir.research_method']}
            register={register}
            errorInstance={errors}
            isLoading={false}
            multiline={true}
            rows={3}
          />
        </Grid>

        <Grid item xs={12}>
          <FormRowStatus
            id='row_status'
            control={control}
            defaultValue={initialValues.row_status}
            isLoading={false}
          />
        </Grid>
      </Grid>

      {showSuccessPopUp && fourIRInitiativeId && (
        <SuccessPopup
          closeAction={closeAction}
          stepNo={16}
          initiativeId={fourIRInitiativeId}
          completionStep={16}
          formStep={18}
        />
      )}
    </HookFormMuiModal>
  );
};
export default InitiativeAnalysisAddEditPopup;
