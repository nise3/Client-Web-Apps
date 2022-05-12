import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_ORGANIZATIONS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import OrganizationAddEditPopup from './OrganizationAddEditPopup';
import {deleteOrganization} from '../../../services/organaizationManagement/OrganizationService';
import OrganizationDetailsPopup from './OrganizationDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconOrganization from '../../../@softbd/icons/IconOrganization';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import {useFetchOrganizationTypes} from '../../../services/organaizationManagement/hooks';

const OrganizationPage = () => {
  const {successStack} = useNotiStack();
  const {messages, locale} = useIntl();

  const [organizationId, setOrganizationId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [organizationTypeFilters] = useState({
    row_status: RowStatus.ACTIVE,
  });
  const [organizationTypeFilterItems, setOrganizationTypeFilterItems] =
    useState([]);
  const {data: organizationTypes} = useFetchOrganizationTypes(
    organizationTypeFilters,
  );

  useEffect(() => {
    if (organizationTypes) {
      setOrganizationTypeFilterItems(
        organizationTypes.map((type: any) => {
          return {
            id: type?.id,
            title: type?.title,
          };
        }),
      );
    }
  }, [organizationTypes]);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setOrganizationId(null);
  };

  const openAddEditModal = (organizationId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setOrganizationId(organizationId);
  };

  const openDetailsModal = (organizationId: number) => {
    setIsOpenDetailsModal(true);
    setOrganizationId(organizationId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };
  /*const rejectAction = async (itemId: number) => {
    let response = await rejectOrganization(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_rejected'
          values={{subject: <IntlMessages id='common.organization' />}}
        />,
      );
    }
  };
  const approveAction = async (itemId: number) => {
    let response = await ApproveOrganization(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_approved'
          values={{subject: <IntlMessages id='common.organization' />}}
        />,
      );
    }
  };*/
  const deleteOrganizationItem = async (organizationId: number) => {
    let response = await deleteOrganization(organizationId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='organization.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle) => !prevToggle);
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
        Header: messages['common.memberId'],
        accessor: 'membership_id',
      },
      {
        Header: messages['organization_type.label'],
        accessor: 'organization_type_title_en',
        disableFilters: true,
        disableSortBy: true,
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['organization_type.label'],
        accessor: 'organization_type_id',
        filter: 'selectFilter',
        selectFilterItems: organizationTypeFilterItems,
        disableSortBy: true,
        isVisible: locale == LocaleLanguage.BN,
        Cell: (props: any) => {
          let data = props.row.original;
          return <>{data?.organization_type_title}</>;
        },
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          /*   let itemId = data?.id;*/
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              {/*<ApproveButton
                itemId={itemId}
                approveTitle={messages['common.organization'] as string}
                approveAction={approveAction}>
                {messages['common.approve']}
              </ApproveButton>
              <RejectButton
                itemId={itemId}
                rejectTitle={messages['common.organization'] as string}
                rejectAction={rejectAction}>
                {messages['common.reject']}
              </RejectButton>*/}
              <DeleteButton
                deleteAction={() => deleteOrganizationItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale, organizationTypeFilterItems],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_ORGANIZATIONS,
      dataAccessor: 'data',
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconOrganization /> <IntlMessages id='organization.label' />
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
                  subject: messages['organization.label'],
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
          totalCount={totalCount}
          pageCount={pageCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <OrganizationAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={organizationId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && organizationId && (
          <OrganizationDetailsPopup
            key={1}
            itemId={organizationId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default OrganizationPage;
