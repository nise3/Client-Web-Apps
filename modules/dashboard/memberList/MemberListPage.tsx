import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import {useIntl} from 'react-intl';
import IconList from '../../../@softbd/icons/IconList';
import MemberListDetailsPopup from './MemberListDetailsPopup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_INDUSTRY_ASSOCIATION_MEMBERS} from '../../../@softbd/common/apiRoutes';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import MemberListAddEditPopup from './MemberListAddEditPopup';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  reApproveOrgMemberShip,
  rejectOrgMemberShip,
} from '../../../services/organaizationManagement/OrganizationService';
import CustomChipStatus from './CustomChipStatus';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import MemberImportPopup from './MemberListImportPopup';
import DownloadIcon from '@mui/icons-material/Download';
import MemberAssingnPermissionPopup from './MemberAssingnPermissionPopup';
import {ApprovalStatus} from '../Institutes/ApprovalStatusEnums';
import {FiUserCheck} from 'react-icons/fi';
import RejectButton from '../../../@softbd/elements/button/RejectButton/RejectButton';
import ApproveButton from '../industry-associations/ApproveButton';

const MemberListPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

  const [isOpenPermissionSubGroupModal, setIsOpenPermissionSubGroupModal] =
    useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenImportModal, setIsOpenImportModal] = useState(false);

  const openAssignPermissionModal = useCallback(
    (itemId: number | null = null) => {
      setIsOpenDetailsModal(false);
      setIsOpenPermissionSubGroupModal(true);
      setSelectedItemId(itemId);
    },
    [],
  );

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

  const closeAssignPermissionModal = useCallback(() => {
    setIsOpenPermissionSubGroupModal(false);
    setSelectedItemId(null);
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

  const openImportModal = useCallback((itemId: number | null = null) => {
    setIsOpenImportModal(true);
  }, []);
  const closeImportModal = useCallback(() => {
    setIsOpenImportModal(false);
  }, []);

  const rejectAssocMemberShip = async (memberId: number) => {
    let response = await rejectOrgMemberShip(memberId);
    if (isResponseSuccess(response)) {
      {
        successStack(<IntlMessages id='organization.rejected' />);
      }
      refreshDataTable();
    }
  };

  const ReApproveAction = async (itemId: number) => {
    let response = await reApproveOrgMemberShip(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_approved'
          values={{subject: <IntlMessages id='common.institute' />}}
        />,
      );
    }
    refreshDataTable();
  };

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
        Header: messages['common.mobile'],
        accessor: 'mobile',
        disableFilters: true,
      },
      {
        Header: messages['common.email'],
        accessor: 'email',
        disableFilters: true,
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
          let itemId = data?.id;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />

              {data?.row_status == ApprovalStatus.PENDING && (
                <CommonButton
                  onClick={() => openAssignPermissionModal(data.id)}
                  btnText='common.approve'
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  color='secondary'
                />
              )}
              {data?.row_status == ApprovalStatus.APPROVED && (
                <RejectButton
                  itemId={itemId}
                  rejectTitle={messages['common.organization'] as string}
                  rejectAction={rejectAssocMemberShip}>
                  {messages['common.reject']}
                </RejectButton>
              )}
              {data?.row_status == ApprovalStatus.REJECTED && (
                <ApproveButton
                  approveAction={() => ReApproveAction(data.id)}
                  buttonText={messages['common.approve'] as string}
                />
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
                  subject: messages['common.member_list'],
                }}
              />
            }
          />,
          <CommonButton
            key={2}
            onClick={() => openImportModal()}
            btnText={messages['common.import'] as string}
            variant={'outlined'}
            color={'primary'}
            style={{marginLeft: '5px'}}
            startIcon={<DownloadIcon />}
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
        {isOpenImportModal && (
          <MemberImportPopup
            key={2}
            onClose={closeImportModal}
            userData={null}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <MemberListDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
        {isOpenPermissionSubGroupModal && (
          <MemberAssingnPermissionPopup
            key={1}
            onClose={closeAssignPermissionModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}
      </PageBlock>
    </>
  );
};

export default MemberListPage;
