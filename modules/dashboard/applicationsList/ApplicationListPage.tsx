import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import RejectButton from '../applicationManagement/RejectButton';
import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import ApproveButton from '../../../@softbd/elements/button/ApproveButton/ApproveButton';
import IconList from '../../../@softbd/icons/IconList';
import ApplicationsListDetailsPopup from './ApplicationsListDetailsPopup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {
  API_APPLICATIONS_LIST, API_APPLICATIONS_LISTS,
  API_COURSE_ENROLLMENTS,
} from '../../../@softbd/common/apiRoutes';

const ApplicationListPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);
  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, [isToggleTable]);
  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);
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
        Header: messages['common.memberId'],
        accessor: 'memberId',
      },
      {
        Header: messages['applicationManagement.status'],
        Cell: (props: any) => {
          let data = props.row.original;
          if (data.row_status === 0) {
            return <p>Inactive</p>;
          } else if (data.row_status === 1) {
            return <p>Approved</p>;
          } else if (data.row_status === 2) {
            return <p>Pending</p>;
          } else {
            return <p>Rejected</p>;
          }
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <ApproveButton />
              {data.row_status !== 3 ? (
                <RejectButton
                  rejectAction={() => {}}
                  rejectTitle={messages['common.delete_confirm'] as string}
                />
              ) : (
                ''
              )}
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [messages],
  );
  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_APPLICATIONS_LISTS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconList /> <IntlMessages id='application_list.label' />
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
          <ApplicationsListDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default ApplicationListPage;
