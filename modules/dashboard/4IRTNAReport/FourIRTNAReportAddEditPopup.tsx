import React, {FC, useEffect, useMemo, useState} from 'react';
import yup from '../../../@softbd/libs/yup';
import {Grid, Link} from '@mui/material';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import {useIntl} from 'react-intl';
import {ITNAReport} from '../../../shared/Interface/4IR.interface';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';

import FileUploadComponent from '../../filepond/FileUploadComponent';
import {
  createTNAReport,
  updateTNAReport,
} from '../../../services/4IRManagement/TNAReportServices';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useFetchTNAReport} from '../../../services/instituteManagement/hooks';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {createExcelImport} from '../../../services/IndustryManagement/FileExportImportService';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';

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
  row_status: 1,
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

  const [isWorkshopMethodWorkshop, setIsWorkshopMethodWorkshop] =
    useState<boolean>(false);
  const [isFGDWorkshop, setIsFGDWorkshop] = useState<boolean>(false);
  const [isIndustryVisit, setIsIndustryVisit] = useState<boolean>(false);
  const [isDesktopResearchFile, setIsDesktopResearchFile] =
    useState<boolean>(false);
  const [isExistingReportReviewFile, setIsExistingReportReviewFile] =
    useState<boolean>(false);
  const [isOthersFile, setIsOthersFile] = useState<boolean>(false);

  const {
    data: itemData,
    isLoading,
    mutate: mutateTNAReport,
  } = useFetchTNAReport(itemId);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      workshop_method_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report_workshop_method_workshop'] as string),
      workshop_method_file: yup
        .string()
        .label(messages['4ir.tna_report_workshop_method_workshop'] as string),
      fgd_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report.fgd_workshop'] as string),
      fgd_workshop_file: yup
        .string()
        .label(messages['4ir.tna_report_fgd_workshop'] as string),
      industry_visit_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report_industry_visit_workshop'] as string),
      industry_visit_file: yup
        .string()
        .label(messages['4ir.tna_report_industry_visit_workshop'] as string),
      desktop_research_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report_desktop_research_workshop'] as string),
      desktop_research_file: yup
        .string()
        .label(messages['4ir.tna_report_desktop_research_workshop'] as string),
      existing_report_review_workshop_numbers: yup
        .number()
        .label(
          messages['4ir.tna_report_existing_report_review_workshop'] as string,
        ),
      existing_report_review_file: yup
        .string()
        .label(
          messages['4ir.tna_report_existing_report_review_workshop'] as string,
        ),
      others_workshop_numbers: yup
        .number()
        .label(messages['4ir.tna_report_others_workshop'] as string),
      others_file: yup
        .string()
        .label(messages['4ir.tna_report.others_workshop'] as string),
      file_path: yup.string().label(messages['common.file_path'] as string),
      row_status: yup.number().label(),
    });
  }, [messages]);

  const {
    control,
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

      // file should be upload by this function
      // await createExcelImport(data.file[0]);
      console.log(data);

      // if (itemId !== null) {
      //   await updateTNAReport(payload, itemId);
      //   updateSuccessMessage('4ir.TNA_report');
      //   mutateTNAReport();
      // } else {
      //   await createTNAReport(payload);
      //   createSuccessMessage('4ir.TNA_report');
      // }
      // props.onClose();
      // refreshDataTable();
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const fileUploadHandler = (files: any, fileId: any) => {
    if (
      files == null ||
      files[0].type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      errorStack(messages['common.only_xlsx_file']);
      setValue(fileId, '');
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item sm={3} xs={4}>
              <CustomCheckbox
                id='workshop_method_workshop'
                label={messages['4ir.tna_report_workshop_method_workshop']}
                register={register}
                errorInstance={errors}
                checked={isWorkshopMethodWorkshop}
                onChange={(event: any) => {
                  setIsWorkshopMethodWorkshop((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isWorkshopMethodWorkshop && (
              <Grid item sm={2} xs={4}>
                <CustomTextInput
                  required
                  disabled={!isWorkshopMethodWorkshop}
                  id='workshop_method_workshop_numbers'
                  label={''}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isWorkshopMethodWorkshop && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CustomTextInput
                  required
                  id='workshop_method_file'
                  name='workshop_method_file'
                  label={''}
                  register={register}
                  type={'file'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(files: any) =>
                    fileUploadHandler(files, 'workshop_method_file')
                  }
                  errorInstance={errors}
                />
              </Grid>

              <Grid item md={2} xs={4}>
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
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => console.log('delete file')}
                  btnText={'common.remove'}
                  variant={'outlined'}
                  color={'secondary'}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item sm={3} xs={4}>
              <CustomCheckbox
                id='fgd_workshop'
                label={messages['4ir.tna_report_fgd_workshop']}
                register={register}
                errorInstance={errors}
                checked={isFGDWorkshop}
                onChange={(event: any) => {
                  setIsFGDWorkshop((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isFGDWorkshop && (
              <Grid item sm={2} xs={4}>
                <CustomTextInput
                  required={isFGDWorkshop}
                  disabled={!isFGDWorkshop}
                  id='fgd_workshop_numbers'
                  label={''}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isFGDWorkshop && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CustomTextInput
                  required
                  id='fgd_workshop_file'
                  name='fgd_workshop_file'
                  label={''}
                  register={register}
                  type={'file'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(files: any) =>
                    fileUploadHandler(files, 'fgd_workshop_file')
                  }
                  errorInstance={errors}
                />
              </Grid>

              <Grid item md={2} xs={4}>
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
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => console.log('delete file')}
                  btnText={'common.remove'}
                  variant={'outlined'}
                  color={'secondary'}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item sm={3} xs={4}>
              <CustomCheckbox
                id='industry_visit_workshop'
                label={messages['4ir.tna_report_industry_visit_workshop']}
                register={register}
                errorInstance={errors}
                checked={isIndustryVisit}
                onChange={(event: any) => {
                  setIsIndustryVisit((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isIndustryVisit && (
              <Grid item sm={2} xs={4}>
                <CustomTextInput
                  required={isIndustryVisit}
                  disabled={!isIndustryVisit}
                  id='industry_visit_workshop_numbers'
                  label={''}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isIndustryVisit && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CustomTextInput
                  required={isIndustryVisit}
                  id='industry_visit_file'
                  name='industry_visit_file'
                  label={''}
                  register={register}
                  type={'file'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(files: any) =>
                    fileUploadHandler(files, 'industry_visit_file')
                  }
                  errorInstance={errors}
                />
              </Grid>

              <Grid item md={2} xs={4}>
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
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => console.log('delete file')}
                  btnText={'common.remove'}
                  variant={'outlined'}
                  color={'secondary'}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item sm={3} xs={4}>
              <CustomCheckbox
                id='desktop_research_workshop'
                label={messages['4ir.tna_report_desktop_research_workshop']}
                register={register}
                errorInstance={errors}
                checked={isDesktopResearchFile}
                onChange={(event: any) => {
                  setIsDesktopResearchFile((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isDesktopResearchFile && (
              <Grid item sm={2} xs={4}>
                <CustomTextInput
                  required={isDesktopResearchFile}
                  disabled={!isDesktopResearchFile}
                  id='desktop_research_workshop_numbers'
                  label={''}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isDesktopResearchFile && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CustomTextInput
                  required={isDesktopResearchFile}
                  id='desktop_research_file'
                  name='desktop_research_file'
                  label={''}
                  register={register}
                  type={'file'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(files: any) =>
                    fileUploadHandler(files, 'desktop_research_file')
                  }
                  errorInstance={errors}
                />
              </Grid>

              <Grid item md={2} xs={4}>
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
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => console.log('delete file')}
                  btnText={'common.remove'}
                  variant={'outlined'}
                  color={'secondary'}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item sm={3} xs={4}>
              <CustomCheckbox
                id='existing_report_review_workshop'
                label={
                  messages['4ir.tna_report_existing_report_review_workshop']
                }
                register={register}
                errorInstance={errors}
                checked={isExistingReportReviewFile}
                onChange={(event: any) => {
                  setIsExistingReportReviewFile((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isExistingReportReviewFile && (
              <Grid item sm={2} xs={4}>
                <CustomTextInput
                  required={isExistingReportReviewFile}
                  disabled={!isExistingReportReviewFile}
                  id='existing_report_review_workshop_numbers'
                  label={''}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isExistingReportReviewFile && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CustomTextInput
                  required={isExistingReportReviewFile}
                  id='existing_report_review_file'
                  name='existing_report_review_file'
                  label={''}
                  register={register}
                  type={'file'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(files: any) =>
                    fileUploadHandler(files, 'existing_report_review_file')
                  }
                  errorInstance={errors}
                />
              </Grid>

              <Grid item md={2} xs={4}>
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
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => console.log('delete file')}
                  btnText={'common.remove'}
                  variant={'outlined'}
                  color={'secondary'}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item sm={3} xs={4}>
              <CustomCheckbox
                id='others_workshop'
                label={messages['4ir.tna_report_others_workshop']}
                register={register}
                errorInstance={errors}
                checked={isOthersFile}
                onChange={(event: any) => {
                  setIsOthersFile((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isOthersFile && (
              <Grid item sm={2} xs={4}>
                <CustomTextInput
                  required={isOthersFile}
                  disabled={!isOthersFile}
                  id='others_workshop_numbers'
                  label={''}
                  register={register}
                  errorInstance={errors}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {isOthersFile && (
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <CustomTextInput
                  required={isOthersFile}
                  id='others_file'
                  name='others_file'
                  label={''}
                  register={register}
                  type={'file'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onInput={(files: any) =>
                    fileUploadHandler(files, 'others_file')
                  }
                  errorInstance={errors}
                />
              </Grid>

              <Grid item md={2} xs={4}>
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
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => console.log('delete file')}
                  btnText={'common.remove'}
                  variant={'outlined'}
                  color={'secondary'}
                />
              </Grid>
            </Grid>
          </Grid>
        )}

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

        <Grid item md={2} xs={4} sx={{display: 'flex', alignItems: 'center'}}>
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
export default FourIRTNAReportAddEditPopup;
