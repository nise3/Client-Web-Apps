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
import MemberListDetailsPopup from './MemberListDetailsPopup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_INDUSTRY_ASSOCIATION_MEMBERS} from '../../../@softbd/common/apiRoutes';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import MemberListAddEditPopup from './MemberListAddEditPopup';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  approveOrgMemberShip,
  rejectOrgMemberShip,
} from '../../../services/organaizationManagement/OrganizationService';
import CustomChipStatus from './CustomChipStatus';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const MemberListPage = () => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_INDUSTRY_ASSOCIATION_MEMBERS,
    });

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);
  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const onClickApprove = async (memberId: number) => {
    try {
      let response = await approveOrgMemberShip(memberId);
      if (isResponseSuccess(response)) {
        {
          successStack(<IntlMessages id='organization.approved' />);
        }
        refreshDataTable();
      }
    } catch (error: any) {
      //console.log('error', error);
      errorStack(<IntlMessages id='message.somethingWentWrong' />);
    }
  };

  const rejectAssocMemberShip = async (memberId: number) => {
    let response = await rejectOrgMemberShip(memberId);
    if (isResponseSuccess(response)) {
      {
        successStack(<IntlMessages id='organization.rejected' />);
      }
      refreshDataTable();
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
        Header: messages['common.name'],
        accessor: 'title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.name_en'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.memberId'],
        accessor: 'membership_id',
      },
      {
        Header: messages['applicationManagement.status'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipStatus value={data?.row_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              {data.row_status != 1 ? (
                <ApproveButton onClick={() => onClickApprove(data.id)} />
              ) : (
                ''
              )}
              {data.row_status != 3 && data.row_status != 0 ? (
                <RejectButton
                  rejectAction={() => rejectAssocMemberShip(data.id)}
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
    [messages, locale],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconList /> <IntlMessages id='common.member_list' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['institute.label'],
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
          <MemberListAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <MemberListDetailsPopup
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

export default MemberListPage;
