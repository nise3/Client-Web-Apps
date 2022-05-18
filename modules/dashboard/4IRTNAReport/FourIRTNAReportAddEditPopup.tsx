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

import FileUploadComponent from '../../filepond/FileUploadComponent';
import {createTNAReport} from '../../../services/4IRManagement/TNAReportServices';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import CustomCheckbox from '../../../@softbd/elements/input/CustomCheckbox/CustomCheckbox';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import FormRowStatus from '../../../@softbd/elements/input/FormRowStatus/FormRowStatus';
import SuccessPopup from '../../../@softbd/modals/SuccessPopUp/SuccessPopUp';
import DownloadIcon from '@mui/icons-material/Download';

interface FourIRTNAReportAddEditPopupProps {
  itemData: any;
  isEdit: boolean;
  fourIRInitiativeId: number;
  onClose: () => void;
  refreshDataTable: () => void;
}

const methodType: any = {
  1: {
    item_number: 'workshop_method_workshop_numbers',
    checkbox: 'workshop_method_workshop',
    item_file: 'workshop_method_file',
  },
  2: {
    item_number: 'fgd_workshop_numbers',
    checkbox: 'fgd_workshop',
    item_file: 'fgd_workshop_file',
  },
  3: {
    item_number: 'industry_visit_workshop_numbers',
    checkbox: 'industry_visit_workshop',
    item_file: 'industry_visit_file',
  },
  4: {
    item_number: 'desktop_research_workshop_numbers',
    checkbox: 'desktop_research_workshop',
    item_file: 'desktop_research_file',
  },
  5: {
    item_number: 'existing_report_review_workshop_numbers',
    checkbox: 'existing_report_review_workshop',
    item_file: 'existing_report_review_file',
  },
  6: {
    item_number: 'others_workshop_numbers',
    checkbox: 'others_workshop',
    item_file: 'others_file',
  },
};

const initialValues = {
  workshop_method_workshop_numbers: '',
  workshop_method_workshop: false,
  workshop_method_file: null,
  fgd_workshop_numbers: '',
  fgd_workshop: false,
  fgd_workshop_file: null,
  industry_visit_workshop_numbers: '',
  industry_visit_workshop: false,
  industry_visit_file: null,
  desktop_research_workshop_numbers: '',
  desktop_research_workshop: false,
  desktop_research_file: null,
  existing_report_review_workshop_numbers: '',
  existing_report_review_workshop: false,
  existing_report_review_file: null,
  others_workshop_numbers: '',
  others_workshop: false,
  others_file: null,
  file_path: '',
  row_status: 1,
};

const FourIRTNAReportAddEditPopup: FC<FourIRTNAReportAddEditPopupProps> = ({
  fourIRInitiativeId,
  refreshDataTable,
  itemData,
  isEdit,
  ...props
}) => {
  const {messages} = useIntl();
  const {errorStack} = useNotiStack();

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

  const [showSuccessPopUp, setShowSuccessPopUp] = useState<boolean>(false);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      workshop_method_workshop_numbers: isWorkshopMethodWorkshop
        ? yup
            .string()
            .required()
            .label(
              messages['4ir.tna_report_workshop_method_workshop'] as string,
            )
        : yup
            .string()
            .nullable()
            .label(
              messages['4ir.tna_report_workshop_method_workshop'] as string,
            ),
      workshop_method_file:
        isWorkshopMethodWorkshop && !isEdit
          ? yup
              .mixed()
              .required()
              .test(
                'rrrrr',
                messages['4ir.tna_report_workshop_method_workshop'] as string,
                (value: any) => {
                  if (!value) return false;
                  if (value === '') return false;
                  if (value.length === 0) return false;
                  return true;
                },
              )
              .label(
                messages['4ir.tna_report_workshop_method_workshop'] as string,
              )
          : yup.mixed().nullable(),
      fgd_workshop_numbers: isFGDWorkshop
        ? yup
            .string()
            .required()
            .label(messages['4ir.tna_report_fgd_workshop'] as string)
        : yup.string().nullable(),

      fgd_workshop_file:
        isFGDWorkshop && !isEdit
          ? yup
              .mixed()
              .required()
              .test(
                'rrrrr',
                messages['4ir.tna_report_fgd_workshop'] as string,
                (value: any) => {
                  if (!value) return false;
                  if (value === '') return false;
                  if (value.length === 0) return false;
                  return true;
                },
              )
              .label(messages['4ir.tna_report_fgd_workshop'] as string)
          : yup.mixed().nullable(),

      industry_visit_workshop_numbers: isIndustryVisit
        ? yup
            .string()
            .required()
            .label(messages['4ir.tna_report_industry_visit_workshop'] as string)
        : yup.string().nullable(),
      industry_visit_file:
        isIndustryVisit && !isEdit
          ? yup
              .mixed()
              .required()
              .test(
                'rrrrr',
                messages['4ir.tna_report_industry_visit_workshop'] as string,
                (value: any) => {
                  if (!value) return false;
                  if (value === '') return false;
                  if (value.length === 0) return false;
                  return true;
                },
              )
              .label(
                messages['4ir.tna_report_industry_visit_workshop'] as string,
              )
          : yup.mixed().nullable(),
      desktop_research_workshop_numbers: isDesktopResearchFile
        ? yup
            .string()
            .required()
            .label(
              messages['4ir.tna_report_desktop_research_workshop'] as string,
            )
        : yup.string().nullable(),
      desktop_research_file:
        isDesktopResearchFile && !isEdit
          ? yup
              .mixed()
              .required()
              .test(
                'rrrrr',
                messages['4ir.tna_report_desktop_research_workshop'] as string,
                (value: any) => {
                  if (!value) return false;
                  if (value === '') return false;
                  if (value.length === 0) return false;
                  return true;
                },
              )
              .label(
                messages['4ir.tna_report_desktop_research_workshop'] as string,
              )
          : yup.string().nullable(),
      existing_report_review_workshop_numbers: isExistingReportReviewFile
        ? yup
            .string()
            .required()
            .label(
              messages[
                '4ir.tna_report_existing_report_review_workshop'
              ] as string,
            )
        : yup.string().nullable(),
      existing_report_review_file:
        isExistingReportReviewFile && !isEdit
          ? yup
              .mixed()
              .required()
              .test(
                'rrrrr',
                messages[
                  '4ir.tna_report_existing_report_review_workshop'
                ] as string,
                (value: any) => {
                  if (!value) return false;
                  if (value === '') return false;
                  if (value.length === 0) return false;
                  return true;
                },
              )
              .label(
                messages[
                  '4ir.tna_report_existing_report_review_workshop'
                ] as string,
              )
          : yup.mixed().nullable(),
      others_workshop_numbers: isOthersFile
        ? yup
            .string()
            .required()
            .label(messages['4ir.tna_report_others_workshop'] as string)
        : yup.string().nullable(),
      others_file:
        isOthersFile && !isEdit
          ? yup
              .mixed()
              .required()
              .test(
                'rrrrr',
                messages['4ir.tna_report.others_workshop'] as string,
                (value: any) => {
                  if (!value) return false;
                  if (value === '') return false;
                  if (value.length === 0) return false;
                  return true;
                },
              )
              .label(messages['4ir.tna_report.others_workshop'] as string)
          : yup.string().nullable(),
      file_path: yup.string().label(messages['common.file_path'] as string),
      row_status: yup.number(),
    });
  }, [
    isEdit,
    messages,
    isWorkshopMethodWorkshop,
    isFGDWorkshop,
    isIndustryVisit,
    isDesktopResearchFile,
    isExistingReportReviewFile,
    isOthersFile,
  ]);

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
    const setter: any = {};

    itemData?.forEach((item: any) => {
      const itemType = methodType[item?.method_type];
      if (itemType) {
        setter[itemType.item_number] = item?.workshop_numbers;
        setter[itemType.checkbox] = item?.workshop_numbers ? true : false;
      }
    });

    if (
      setter['workshop_method_workshop_numbers'] &&
      setter['workshop_method_workshop_numbers'] != 0
    ) {
      setIsWorkshopMethodWorkshop(true);
    }

    if (setter['fgd_workshop_numbers'] && setter['fgd_workshop_numbers'] != 0) {
      setIsFGDWorkshop(true);
    }

    if (
      setter['industry_visit_workshop_numbers'] &&
      setter['industry_visit_workshop_numbers'] != 0
    ) {
      setIsIndustryVisit(true);
    }

    if (
      setter['desktop_research_workshop_numbers'] &&
      setter['desktop_research_workshop_numbers'] != 0
    ) {
      setIsDesktopResearchFile(true);
    }

    if (
      setter['existing_report_review_workshop_numbers'] &&
      setter['existing_report_review_workshop_numbers'] != 0
    ) {
      setIsExistingReportReviewFile(true);
    }

    if (
      setter['others_workshop_numbers'] &&
      setter['others_workshop_numbers'] != 0
    ) {
      setIsOthersFile(true);
    }

    if (itemData) {
      reset({...initialValues, ...setter});
    } else reset(initialValues);
  }, [itemData, reset]);

  const closeAction = async () => {
    props.onClose();
    refreshDataTable();
  };

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    try {
      const payload = new FormData();

      payload.append('four_ir_initiative_id', String(fourIRInitiativeId));

      // const fieldArray = [
      //   'desktop_research',
      //   'workshop_method_workshop',
      //   'existing_report_review',
      //   'fgd',
      //   'industry_visit',
      //   'others',
      // ];

      // fieldArray.forEach((field: string, index: number) => {
      //   if (data?.[`${field}_workshop`]) {
      //     payload.append(
      //       `${field}_workshop_numbers`,
      //       String(data?.[`${field}_workshop_numbers`]),
      //     );
      //     payload.append(
      //       `${field}_workshop_file`,
      //       data?.[`${field}_file`]?.[0],
      //     );
      //   }
      // });

      payload.append('row_status', String(data?.row_status));

      if (data?.file_path) payload.append('file_path', data?.file_path);

      if (data?.workshop_method_workshop) {
        payload.append(
          'workshop_method_workshop_numbers',
          String(data?.workshop_method_workshop_numbers),
        );

        if (!isEdit || (isEdit && data?.workshop_method_file?.[0]))
          payload.append(
            'workshop_method_file',
            data?.workshop_method_file?.[0],
          );
      }

      if (data?.fgd_workshop) {
        payload.append(
          'fgd_workshop_numbers',
          String(data?.fgd_workshop_numbers),
        );

        if (!isEdit || (isEdit && data?.fgd_workshop_file?.[0]))
          payload.append('fgd_workshop_file', data?.fgd_workshop_file?.[0]);
      }

      if (data?.industry_visit_workshop) {
        payload.append(
          'industry_visit_workshop_numbers',
          String(data?.industry_visit_workshop_numbers),
        );

        if (!isEdit || (isEdit && data?.industry_visit_file?.[0]))
          payload.append('industry_visit_file', data?.industry_visit_file?.[0]);
      }

      if (data?.desktop_research_workshop) {
        payload.append(
          'desktop_research_workshop_numbers',
          String(data?.desktop_research_workshop_numbers),
        );

        if (!isEdit || (isEdit && data?.desktop_research_file?.[0]))
          payload.append(
            'desktop_research_file',
            data?.desktop_research_file?.[0],
          );
      }

      if (data?.existing_report_review_workshop) {
        payload.append(
          'existing_report_review_workshop_numbers',
          String(data?.existing_report_review_workshop_numbers),
        );

        if (!isEdit || (isEdit && data?.existing_report_review_file?.[0])) {
          payload.append(
            'existing_report_review_file',
            data?.existing_report_review_file?.[0],
          );
        }
      }

      if (data?.others_workshop) {
        payload.append(
          'others_workshop_numbers',
          String(data?.others_workshop_numbers),
        );

        if (!isEdit || (isEdit && data?.others_file?.[0]))
          payload.append('others_file', data?.others_file?.[0]);
      }

      if (isEdit) {
        payload.append('operation_type', 'UPDATE');
        await createTNAReport(payload);
        updateSuccessMessage('4ir.TNA_report');
        await closeAction();
      } else {
        await createTNAReport(payload);
        createSuccessMessage('4ir.TNA_report');
        setShowSuccessPopUp(true);
      }
    } catch (error: any) {
      processServerSideErrors({error, setError, validationSchema, errorStack});
    }
  };

  const emptyFile = (fileId: any) => {
    setValue(fileId, '');
  };

  const fileUploadHandler = (files: any, fileId: any) => {
    if (files.length < 1) {
      emptyFile(fileId);
      errorStack(messages['common.only_xlsx_file']);
      return;
    }

    if (
      files[0].type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      emptyFile(fileId);
      errorStack(messages['common.only_xlsx_file']);
      return;
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
          <CancelButton onClick={props.onClose} isLoading={false} />
          <SubmitButton isSubmitting={isSubmitting} isLoading={false} />
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
                onChange={() => {
                  setIsWorkshopMethodWorkshop((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isWorkshopMethodWorkshop && (
              <Grid item sm={4} xs={4}>
                <CustomTextInput
                  required
                  id='workshop_method_workshop_numbers'
                  label={messages['tna.number_of_workshop']}
                  type={'number'}
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
                  id='workshop_method_file'
                  name='workshop_method_file'
                  label={messages['common.upload_excel_file']}
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
                <Link
                  href='/template/tna-report.xlsx'
                  download
                  underline={'none'}
                  style={{whiteSpace: 'nowrap'}}>
                  <CommonButton
                    key={1}
                    onClick={() => console.log('file downloading')}
                    btnText={'4ir.tna_report_demo_file'}
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<DownloadIcon />}
                  />
                </Link>
              </Grid>
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => emptyFile('workshop_method_file')}
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
                onChange={() => {
                  setIsFGDWorkshop((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isFGDWorkshop && (
              <Grid item sm={4} xs={4}>
                <CustomTextInput
                  required={isFGDWorkshop}
                  disabled={!isFGDWorkshop}
                  type={'number'}
                  id='fgd_workshop_numbers'
                  label={messages['tna.number_of_workshop']}
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
                  label={messages['common.upload_excel_file']}
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
                <Link
                  href='/template/tna-report.xlsx'
                  download
                  underline={'none'}
                  style={{whiteSpace: 'nowrap'}}>
                  <CommonButton
                    key={1}
                    onClick={() => console.log('file downloading')}
                    btnText={'4ir.tna_report_demo_file'}
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<DownloadIcon />}
                  />
                </Link>
              </Grid>
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => emptyFile('fgd_workshop_file')}
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
                onChange={() => {
                  setIsIndustryVisit((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isIndustryVisit && (
              <Grid item sm={4} xs={4}>
                <CustomTextInput
                  required={isIndustryVisit}
                  disabled={!isIndustryVisit}
                  type={'number'}
                  id='industry_visit_workshop_numbers'
                  label={messages['tna.number_of_workshop']}
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
                  label={messages['common.upload_excel_file']}
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
                <Link
                  href='/template/tna-report.xlsx'
                  download
                  underline={'none'}
                  style={{whiteSpace: 'nowrap'}}>
                  <CommonButton
                    key={1}
                    onClick={() => console.log('file downloading')}
                    btnText={'4ir.tna_report_demo_file'}
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<DownloadIcon />}
                  />
                </Link>
              </Grid>
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => emptyFile('industry_visit_file')}
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
                onChange={() => {
                  setIsDesktopResearchFile((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isDesktopResearchFile && (
              <Grid item sm={4} xs={4}>
                <CustomTextInput
                  required={isDesktopResearchFile}
                  disabled={!isDesktopResearchFile}
                  type={'number'}
                  id='desktop_research_workshop_numbers'
                  label={messages['tna.number_of_workshop']}
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
                  label={messages['common.upload_excel_file']}
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
                <Link
                  href='/template/tna-report.xlsx'
                  download
                  underline={'none'}
                  style={{whiteSpace: 'nowrap'}}>
                  <CommonButton
                    key={1}
                    onClick={() => console.log('file downloading')}
                    btnText={'4ir.tna_report_demo_file'}
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<DownloadIcon />}
                  />
                </Link>
              </Grid>
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => emptyFile('desktop_research_file')}
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
                onChange={() => {
                  setIsExistingReportReviewFile((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isExistingReportReviewFile && (
              <Grid item sm={4} xs={4}>
                <CustomTextInput
                  required
                  id='existing_report_review_workshop_numbers'
                  type={'number'}
                  label={messages['tna.number_of_workshop']}
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
                  required
                  id='existing_report_review_file'
                  name='existing_report_review_file'
                  label={messages['common.upload_excel_file']}
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
                <Link
                  href='/template/tna-report.xlsx'
                  download
                  underline={'none'}
                  style={{whiteSpace: 'nowrap'}}>
                  <CommonButton
                    key={1}
                    onClick={() => console.log('file downloading')}
                    btnText={'4ir.tna_report_demo_file'}
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<DownloadIcon />}
                  />
                </Link>
              </Grid>
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => emptyFile('existing_report_review_file')}
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
                onChange={() => {
                  setIsOthersFile((prev) => !prev);
                }}
                isLoading={false}
              />
            </Grid>
            {isOthersFile && (
              <Grid item sm={4} xs={4}>
                <CustomTextInput
                  required={isOthersFile}
                  disabled={!isOthersFile}
                  id='others_workshop_numbers'
                  label={messages['tna.number_of_workshop']}
                  type={'number'}
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
                  label={messages['common.upload_excel_file']}
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
                <Link
                  href='/template/tna-report.xlsx'
                  download
                  underline={'none'}
                  style={{whiteSpace: 'nowrap'}}>
                  <CommonButton
                    key={1}
                    onClick={() => console.log('file downloading')}
                    btnText={'4ir.tna_report_demo_file'}
                    variant={'outlined'}
                    color={'primary'}
                    startIcon={<DownloadIcon />}
                  />
                </Link>
              </Grid>
              <Grid item md={2} xs={4}>
                <CommonButton
                  key={1}
                  onClick={() => emptyFile('others_file')}
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
            label={messages['tna.final_tna_report']}
            required={false}
            acceptedFileTypes={[
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ]}
          />
        </Grid>

        <Grid item md={2} xs={4} sx={{display: 'flex', alignItems: 'center'}}>
          <Link
            href='/template/TNA-Guideline.docx'
            download
            underline={'none'}
            style={{whiteSpace: 'nowrap'}}>
            <CommonButton
              key={1}
              onClick={() => console.log('file downloading')}
              btnText={'4ir.tna_report_demo_file'}
              variant={'outlined'}
              color={'primary'}
              startIcon={<DownloadIcon />}
            />
          </Link>
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
          stepNo={3}
          initiativeId={fourIRInitiativeId}
          completionStep={3}
          formStep={5}
        />
      )}
    </HookFormMuiModal>
  );
};
export default FourIRTNAReportAddEditPopup;
