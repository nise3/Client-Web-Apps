import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import FourIRImplementingTeamAddEditPopup from './FourIRImplementingTeamAddEditPopup';
import FourIRImplementingTeamDetailsPopup from './FourIRImplementingTeamDetailsPopup';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {deleteTeamMember} from '../../../services/4IRManagement/ImplementingTeamService';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_TEAM_MEMBERS} from '../../../@softbd/common/apiRoutes';
import {FourIRTeamType} from '../../../shared/constants/AppEnums';

interface IFourIRImplementingTeamPageProps {
  fourIRInitiativeId: number;
}

const FourIRImplementingTeamPage = ({
  fourIRInitiativeId,
}: IFourIRImplementingTeamPageProps) => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
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

  const deleteImplementingTeamMember = async (memberId: number) => {
    let response = await deleteTeamMember(memberId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='4ir.team_member' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prev) => !prev);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },

      {
        Header: messages['common.name'],
        accessor: 'name',
      },
      {
        Header: messages['common.email'],
        accessor: 'email',
      },
      {
        Header: messages['common.phone_number'],
        accessor: 'phone_number',
      },
      {
        Header: messages['role.label'],
        accessor: 'role',
        isVisible: false,
      },
      {
        Header: messages['common.designation'],
        accessor: 'designation',
        isVisible: false,
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data?.id)} />
              <EditButton onClick={() => openAddEditModal(data?.id)} />
              <DeleteButton
                deleteAction={() => deleteImplementingTeamMember(data?.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_4IR_TEAM_MEMBERS,
      paramsValueModifier: (params) => {
        params['team_type'] = FourIRTeamType.IMPLEMENTING_TEAM;
        params['four_ir_initiative_id'] = fourIRInitiativeId;
        return params;
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.implementing_team' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={false}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['4ir.implementing_team'],
                }}
              />
            }
          />,
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
        {isOpenAddEditModal && (
          <FourIRImplementingTeamAddEditPopup
            key={1}
            fourIRInitiativeId={fourIRInitiativeId}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRImplementingTeamDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRImplementingTeamPage;
