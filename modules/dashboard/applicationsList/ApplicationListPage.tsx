import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import RejectButton from '../applicationManagement/RejectButton';
import {useIntl} from 'react-intl';
import ApproveButton from '../../../@softbd/elements/button/ApproveButton/ApproveButton';
import IconList from '../../../@softbd/icons/IconList';
import ApplicationsListDetailsPopup from './ApplicationsListDetailsPopup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_APPLICATIONS_LISTS} from '../../../@softbd/common/apiRoutes';
import CustomChipApplicationStatus from './CustomChipApplicationStatus';

const ApplicationListPage = () => {
  const {messages} = useIntl();

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const onClickApprove: any = useCallback((id: any) => {}, []);
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
        accessor: 'title',
      },
      {
        Header: messages['common.memberId'],
        accessor: 'memberId',
      },
      {
        Header: messages['applicationManagement.status'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipApplicationStatus value={data?.row_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              {data.row_status != 1 ? (
                <ApproveButton onClick={() => onClickApprove(data.id)} />
              ) : (
                ''
              )}
              {data.row_status != 3 && data.row_status != 0 ? (
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
        />

        {isOpenDetailsModal && selectedItemId && (
          <ApplicationsListDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            onApprove={onClickApprove}
          />
        )}
      </PageBlock>
    </>
  );
};

export default ApplicationListPage;
