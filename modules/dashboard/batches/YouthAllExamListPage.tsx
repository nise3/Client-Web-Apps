import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconBatch from '../../../@softbd/icons/IconBatch';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useEffect, useMemo, useState} from 'react';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import {useFetchYouthBatchExams} from '../../../services/instituteManagement/hooks';
import {ExamTypes} from '../exams/ExamEnums';
import Tooltip from '@mui/material/Tooltip';
import {InsertDriveFile, RemoveRedEye} from '@mui/icons-material';
import {Link} from '../../../@softbd/elements/common';
import {FILE_SERVER_FILE_VIEW_ENDPOINT} from '../../../@softbd/common/apiRoutes';

const YouthAllExamListPage = () => {
  const {messages, locale, formatNumber} = useIntl();

  const router = useRouter();
  const {batchId, youthId} = router.query;
  const [batchExamParams] = useState<any>({youth_id: youthId});
  const {data: batchYouthExams, isLoading} = useFetchYouthBatchExams(
    batchId,
    batchExamParams,
  );
  const [exams, setExams] = useState<Array<any>>([]);

  useEffect(() => {
    if (batchYouthExams) {
      let examsData: any = [];
      (batchYouthExams.exams || []).map((exam_type: any) => {
        (exam_type.exams || []).map((exam: any) => {
          let examObj = {
            title: exam_type.title,
            title_en: exam_type.title_en,
            exam_id: exam.id,
            type: exam.type,
            exam_type_id: exam.exam_type_id,
            exam_type: exam_type.type,
            obtained_mark: !isNaN(exam?.obtained_mark)
              ? String(Number(exam.obtained_mark))
              : '',
            file_paths: exam.file_paths,
            auto_marking: exam.auto_marking,
            total_marks: exam.total_marks,
            participated: exam.participated,
          };
          examsData.push(examObj);
        });
      });
      setExams(examsData);
    }
  }, [batchYouthExams]);

  const getTypeLabel = (type: any) => {
    switch (Number(type)) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      case ExamTypes.MIXED:
        return messages['common.mixed'];
      case ExamTypes.PRACTICAL:
        return messages['common.practical'];
      case ExamTypes.FIELDWORK:
        return messages['common.field_work'];
      case ExamTypes.PRESENTATION:
        return messages['common.presentation'];
      case ExamTypes.ASSIGNMENT:
        return messages['common.assignment'];
      case ExamTypes.ATTENDANCE:
        return messages['common.attendance'];
      default:
        return '';
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.type'],
        accessor: 'type',
        Cell: (props: any) => {
          let data = props.row.original;
          return <span>{getTypeLabel(data.type)}</span>;
        },
      },
      {
        Header: String(
          messages['common.obtained_mark'] +
            ' / ' +
            messages['common.total_marks'],
        ),
        accessor: 'obtained_mark',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>
              {!isNaN(data?.obtained_mark)
                ? String(Number(data.obtained_mark))
                : '0'}
              /{data?.total_marks}
            </span>
          );
        },
      },
      {
        Header: messages['common.status'],
        accessor: 'participated',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>
              {data.participated
                ? messages['common.participated']
                : messages['common.not_participated']}
            </span>
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          let markSheetPath = `/batches/${batchId}/youths/${youthId}/marksheet/${data.exam_id}`;
          return Number(data.type) == ExamTypes.ONLINE ? (
            <Link href={markSheetPath} passHref={true}>
              <Tooltip title={messages['common.answer_sheet'] as any} arrow>
                <RemoveRedEye sx={{color: 'blue'}} />
              </Tooltip>
            </Link>
          ) : Number(data.type) != ExamTypes.OFFLINE &&
            data.file_paths &&
            data.file_paths.length > 0 ? (
            <div>
              {data.file_paths.map((file: any, i: number) => (
                <Link
                  href={FILE_SERVER_FILE_VIEW_ENDPOINT + file}
                  passHref={true}
                  key={i}
                  target={'_blank'}>
                  <Tooltip
                    title={`${
                      messages['common.file_path'] as any
                    } ${formatNumber(i + 1)}`}
                    arrow>
                    <InsertDriveFile sx={{color: 'blue', marginLeft: '10px'}} />
                  </Tooltip>
                </Link>
              ))}
            </div>
          ) : (
            <></>
          );
        },
      },
    ],
    [messages, locale],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBatch /> <IntlMessages id='exam.label' />
          </>
        }
        extra={[]}>
        <ReactTable columns={columns} data={exams || []} loading={isLoading} />
      </PageBlock>
    </>
  );
};

export default YouthAllExamListPage;
