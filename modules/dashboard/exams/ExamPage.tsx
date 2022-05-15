import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconExam from '../../../@softbd/icons/IconExam';
import {Link} from '../../../@softbd/elements/common';
import {API_EXAMS} from '../../../@softbd/common/apiRoutes';
import {ExamTypes} from './ExamEnums';
import {useRouter} from 'next/router';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  deleteExam,
  publishExam,
} from '../../../services/instituteManagement/ExamService';
import {
  LINK_EXAM_CREATE,
  LINK_EXAM_DETAILS,
  LINK_EXAM_UPDATE,
} from '../../../@softbd/common/appLinks';
import ApproveButton from '../industry-associations/ApproveButton';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';

const ExamPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();

  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const deleteExamItem = async (examId: number) => {
    try {
      let response = await deleteExam(examId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{subject: <IntlMessages id='exam.label' />}}
          />,
        );
        refreshDataTable();
      }
    } catch (error) {}
  };

  const publishAction = async (examId: number, published_at: any) => {
    try {
      let data = {
        is_published: published_at ? 0 : 1,
      };
      let response = await publishExam(examId, data);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_publish_successfully'
            values={{subject: <IntlMessages id='exam.label' />}}
          />,
        );
        refreshDataTable();
      }
    } catch (error) {}
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_EXAMS,
    });

  const examType = (type: any) => {
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
      default:
        return '';
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
        },
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['subject.title'],
        accessor: 'exam_subject_title',
      },
      {
        Header: messages['common.exam_type'],
        accessor: 'type',
        Cell: (props: any) => {
          let data = props.row.original;
          return <div>{examType(data.type)}</div>;
        },
      },
      {
        Header: messages['common.status'],
        accessor: 'published_at',
        disableFilters: true,
        Cell: (props: any) => {
          let published_at = props.row.original?.published_at;
          return (
            <CustomChip
              icon={
                published_at ? (
                  <CheckCircleOutline fontSize={'small'} />
                ) : (
                  <CancelIcon fontSize={'small'} />
                )
              }
              color={published_at ? 'primary' : 'secondary'}
              label={
                published_at ? (
                  <IntlMessages id='common.publishing' />
                ) : (
                  <IntlMessages id='common.un_publish' />
                )
              }
            />
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() => {
                  router.push(LINK_EXAM_DETAILS + `${data.id}`);
                }}
              />
              {!data?.published_at && (
                <EditButton
                  onClick={() => {
                    router.push(LINK_EXAM_UPDATE + `${data.id}`);
                  }}
                />
              )}
              {!data?.published_at && (
                <DeleteButton
                  deleteAction={() => deleteExamItem(data.id)}
                  deleteTitle={messages['common.delete_confirm'] as string}
                />
              )}
              <ApproveButton
                approveAction={() => publishAction(data.id, data.published_at)}
                approveTitle={
                  messages[
                    data.published_at
                      ? 'common.un_publish'
                      : 'common.publishing'
                  ] as string
                }
                buttonText={
                  messages[
                    data.published_at
                      ? 'common.un_publish'
                      : 'common.publishing'
                  ] as string
                }
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconExam /> <IntlMessages id='exam.label' />
          </>
        }
        extra={[
          <Link key={1} href={LINK_EXAM_CREATE}>
            <AddButton
              onClick={() => {}}
              isLoading={loading}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject: messages['exam.label'],
                  }}
                />
              }
            />
          </Link>,
        ]}>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
      </PageBlock>
    </>
  );
};
export default ExamPage;
