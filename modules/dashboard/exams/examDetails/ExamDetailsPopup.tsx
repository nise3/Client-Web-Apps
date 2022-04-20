import CustomDetailsViewMuiModal from '../../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import {isBreakPointUp} from '../../../../@crema/utility/Utils';
import CancelButton from '../../../../@softbd/elements/button/CancelButton/CancelButton';
import EditButton from '../../../../@softbd/elements/button/EditButton/EditButton';
import {Grid} from '@mui/material';
import DetailsInputView from '../../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import React, {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import IconExam from '../../../../@softbd/icons/IconExam';
import {ExamTypes} from '../ExamEnums';
import OnlineDetails from './OnlineDetails';
import OfflineDetails from './OfflineDetails';
import {useFetchExam} from '../../../../services/instituteManagement/hooks';
import {cloneDeep} from 'lodash';
import {ExamPurposeNames} from '../../../../@softbd/utilities/ExamPurposeNames';

interface ExamDetailsPopupProps {
  itemId: number;
  onClose: () => void;
  openEditPage: (id: number) => void;
}

const ExamDetailsPopup = ({
  itemId,
  openEditPage,
  ...props
}: ExamDetailsPopupProps) => {
  const {messages} = useIntl();

  const [examParams] = useState<any>({
    purpose_name: ExamPurposeNames.BATCH,
  });
  const {data: itemData, isLoading: isLoadingExam} = useFetchExam(
    itemId,
    examParams,
  );

  const [onlineExamData, setOnlineExamData] = useState<any>();
  const [offlineExamData, setOfflineExamData] = useState<any>();

  useEffect(() => {
    let arr = cloneDeep(itemData);

    if (itemData?.type === Number(ExamTypes.ONLINE)) {
      setOnlineExamData(itemData.exams[0]);
    }

    if (itemData?.type === Number(ExamTypes.OFFLINE)) {
      setOfflineExamData(itemData.exams[0]);
    }

    if (itemData?.type === Number(ExamTypes.MIXED)) {
      let onData: any = (arr.exams || []).filter(
        (item: any) => item.type == Number(ExamTypes.ONLINE),
      );
      setOnlineExamData(onData[0]);

      let offData: any = (arr.exams || []).filter(
        (item: any) => item.type == Number(ExamTypes.OFFLINE),
      );
      setOfflineExamData(offData[0]);
    }
  }, [itemData]);

  const examType = (data: any) => {
    switch (String(data)) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      case ExamTypes.MIXED:
        return messages['common.mixed'];
      default:
        return '';
    }
  };

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconExam />
            <IntlMessages id='exam.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoadingExam} />
            <EditButton
              variant={'contained'}
              onClick={() => openEditPage(itemData.id)}
              isLoading={isLoadingExam}
            />
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.exam_type']}
              value={itemData ? examType(itemData?.type) : ''}
              isLoading={isLoadingExam}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['subject.title']}
              value={itemData?.exam_subject_title}
              isLoading={isLoadingExam}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['subject.title_en']}
              value={itemData?.exam_subject_title_en}
              isLoading={isLoadingExam}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.exam_name']}
              value={itemData?.title}
              isLoading={isLoadingExam}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.title_en']}
              value={itemData?.title_en}
              isLoading={isLoadingExam}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['batches.label']}
              value={itemData?.batch_title}
              isLoading={isLoadingExam}
            />
          </Grid>

          {itemData && itemData?.type == ExamTypes.ONLINE && (
            <OnlineDetails
              itemData={onlineExamData}
              isLoading={isLoadingExam}
            />
          )}

          {itemData && itemData?.type == ExamTypes.OFFLINE && (
            <OfflineDetails
              itemData={offlineExamData}
              isLoading={isLoadingExam}
            />
          )}

          {itemData && itemData?.type == ExamTypes.MIXED && (
            <>
              <Grid item xs={12}>
                <fieldset>
                  <legend style={{color: '#0a8fdc'}}>
                    {messages['common.online']}
                  </legend>
                  <Grid container spacing={3}>
                    <OnlineDetails
                      itemData={itemData}
                      isLoading={isLoadingExam}
                    />
                  </Grid>
                </fieldset>
              </Grid>

              <Grid item xs={12}>
                <fieldset>
                  <legend style={{color: '#0a8fdc'}}>
                    {messages['common.offline']}
                  </legend>
                  <Grid container spacing={3}>
                    <OfflineDetails
                      itemData={itemData}
                      isLoading={isLoadingExam}
                    />
                  </Grid>
                </fieldset>
              </Grid>
            </>
          )}
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default ExamDetailsPopup;
