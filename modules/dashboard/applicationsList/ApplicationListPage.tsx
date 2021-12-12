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
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(1)} />
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
  const data = React.useMemo(
    () => [
      {
        name: 'Hello',
        memberId: 'World',
      },
    ],
    [],
  );
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
          loading={false}
          data={data}
          pageCount={1}
          totalCount={1}
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
