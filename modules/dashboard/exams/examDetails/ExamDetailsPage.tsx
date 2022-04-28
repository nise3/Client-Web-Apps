import {Box, Button, Grid} from '@mui/material';
import React, {useCallback, useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import IconExam from '../../../../@softbd/icons/IconExam';
import {ExamTypes} from '../ExamEnums';
import {useFetchExamDetails} from '../../../../services/instituteManagement/hooks';
import {ExamPurposeNames} from '../../../../@softbd/utilities/ExamPurposeNames';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import {ArrowBack} from '@mui/icons-material';
import {useRouter} from 'next/router';
import {useForm} from 'react-hook-form';
import QuestionSkeleton from '../../../youth/examQuestionPaper/QuestionSkeleton';
import OnlineDetails from './OnlineDetails';
import OfflineDetails from './OfflineDetails';

const ExamDetailsPage = () => {
  const {messages} = useIntl();

  const [examSetUuid, setExamSetUuid] = useState<any>(null);
  const [onlineExam, setOnlineExam] = useState<any>(null);
  const [offlineExam, setOfflineExam] = useState<any>(null);

  const router = useRouter();

  const itemId = router.query.id;

  const [examParams] = useState<any>({
    purpose_name: ExamPurposeNames.BATCH,
  });
  const {data: examData, isLoading: isLoadingExam} = useFetchExamDetails(
    itemId,
    examParams,
  );

  const examType = (data: any) => {
    switch (data) {
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

  useEffect(() => {
    examData &&
      examData.exams &&
      examData.exams.map((exam: any) => {
        {
          ExamTypes.ONLINE === Number(exam?.type)
            ? setOnlineExam(exam)
            : setOfflineExam(exam);
        }
      });
  }, [examData]);

  const onChangeOfflineSet = useCallback((value: any) => {
    setExamSetUuid(value.target.value);
  }, []);

  /*const onChangeOfflineSet = useCallback((value: any) => {
    if (value.target) {
      setExamSetUuid(value.target.value);
    } else {
      setExamSetUuid(value);
    }
  }, []);*/

  const {
    register,
    control,
    setValue,
    formState: {errors},
  } = useForm<any>();

  return (
    <>
      <PageBlock
        title={
          <>
            <IconExam />
            {messages['exam.label']}
          </>
        }
        extra={[
          <Button
            key={1}
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => router.back()}>
            <ArrowBack />
            {messages['common.back']}
          </Button>,
        ]}>
        <Box sx={{padding: '25px'}}>
          <Grid container>
            {isLoadingExam ? (
              <QuestionSkeleton />
            ) : (
              <>
                {onlineExam && (
                  <OnlineDetails
                    key={onlineExam?.id}
                    exam={onlineExam}
                    examData={examData}
                    examType={examType}
                    examSetUuid={examSetUuid}
                    register={register}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                  />
                )}

                {offlineExam && (
                  <OfflineDetails
                    key={offlineExam?.id}
                    exam={offlineExam}
                    examData={examData}
                    examSetUuid={examSetUuid}
                    register={register}
                    control={control}
                    errors={errors}
                    setValue={setValue}
                    onChangeOfflineSet={onChangeOfflineSet}
                  />
                )}
              </>
            )}
          </Grid>
        </Box>
      </PageBlock>
    </>
  );
};

export default ExamDetailsPage;
