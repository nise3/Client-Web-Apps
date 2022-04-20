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
import ExamDetailsPopup from './examDetails/ExamDetailsPopup';
import IconExam from '../../../@softbd/icons/IconExam';
import {Link} from '../../../@softbd/elements/common';
import {API_EXAMS} from '../../../@softbd/common/apiRoutes';
import {Button} from '@mui/material';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {ExamTypes} from './ExamEnums';
import {useRouter} from 'next/router';

const ExamPage = () => {
  const {messages} = useIntl();
  const router = useRouter();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable] = useState<boolean>(false);

  const openAddEditPage = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    router.push(`/exams/update/${itemId}`);
  }, []);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteExamItem = async (examId: number) => {
    // let response = await deleteExam(examId);
    /*if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='exam.label' />}}
        />,
      );
      refreshDataTable();
    }*/
  };

  /*  const refreshDataTable = useCallback(() => {
      setIsToggleTable((previousToggle) => !previousToggle);
    }, []);*/

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_EXAMS,
    });

  const examType = (type: any) => {
    switch (String(type)) {
      case ExamTypes.ONLINE:
        return messages['common.online'];
      case ExamTypes.OFFLINE:
        return messages['common.offline'];
      case ExamTypes.MIXED:
        return messages['common.mixed'];
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
        accessor: 'row_status',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          console.log('data->', data);
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton
                onClick={() => {
                  router.push(`/exams/update/${data.id}`);
                }}
              />
              <DeleteButton
                deleteAction={() => deleteExamItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
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
          <Link key={1} href={'/exams/create'}>
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
          <Link key={2} href={'/exams/question-paper'}>
            <Button>Questions</Button>{' '}
          </Link>,
          <Link key={3} href={'/exams/youth-list/1'}>
            <Button>Examinees</Button>{' '}
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
        {isOpenDetailsModal && selectedItemId && (
          <ExamDetailsPopup
            key={selectedItemId}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditPage={openAddEditPage}
          />
        )}
      </PageBlock>
    </>
  );
};

export default ExamPage;
