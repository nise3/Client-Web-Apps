import React, {useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import {Button} from '@mui/material';
import DatatableButtonGroup from '../../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import IconExaminee from '../../../../@softbd/icons/IconExaminee';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import ReactTable from '../../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../../@softbd/hooks/useReactTableFetchData';
import {API_EXAM_YOUTH_LIST} from '../../../../@softbd/common/apiRoutes';
import {Link} from '../../../../@softbd/elements/common';
import {useRouter} from 'next/router';

/*const examinees = [
  {
    id: 1,
    name: 'Afrar Jahin',
    marks: 70,
  },
  {
    id: 2,
    name: 'Nusrat',
    marks: 80,
  },
  {
    id: 3,
    name: 'Afrin',
    marks: 90,
  },
];*/
const ExamineeListPage = () => {
  const {messages} = useIntl();
  // const {successStack} = useNotiStack();

  const [selectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal] = useState(false);
  const [isToggleTable] = useState<boolean>(false);
  const router = useRouter();
  const {examId} = router.query;
  /*  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);*/

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_EXAM_YOUTH_LIST + '/' + examId,
    });
  console.log(data);
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
        Header: messages['common.name'],
        accessor: 'name',
      },
      {
        Header: messages['common.marks'],
        accessor: 'marks',
      },
      ,
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          // let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Link href={'/exams/examinee-list/marking'}>
                <Button
                  variant={'outlined'}
                  color={'primary'}
                  sx={{marginRight: '10px'}}>
                  {messages['common.marks_distribution']}
                </Button>
              </Link>
              <Link href={'/exams/examinee-list/marks-sheet'}>
                <Button variant={'outlined'} color={'primary'}>
                  {messages['common.answer_sheet']}
                </Button>
              </Link>
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
            <IconExaminee /> <IntlMessages id='examinee.label' />
          </>
        }>
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
          <></>
          /* <ExamDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />*/
        )}
      </PageBlock>
    </>
  );
};

export default ExamineeListPage;
