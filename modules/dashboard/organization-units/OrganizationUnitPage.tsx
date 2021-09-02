import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import OrganizationUnitAddEditPopup from './OrganizationUnitAddEditPopup';
import {deleteOrganizationUnit} from '../../../services/organaizationManagement/OrganizationUnitService';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconOrganizationUnit from '../../../@softbd/icons/IconOrganizationUnit';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import OrganizationUnitDetailsPopup from './OrganizationUnitDetailsPopup';
import {isResponseSuccess} from '../../../@softbd/common/helpers';

const OrganizationUnitPage = () => {
  const {successStack} = useNotiStack();
  const {messages} = useIntl();

  const [organizationUnitId, setOrganizationUnitId] = useState<number | null>(
    null,
  );
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setOrganizationUnitId(null);
  };

  const openAddEditModal = (organizationUnitId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setOrganizationUnitId(organizationUnitId);
  };

  const openDetailsModal = (organizationUnitId: number) => {
    setIsOpenDetailsModal(true);
    setOrganizationUnitId(organizationUnitId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteOrganizationUnitItem = async (organizationUnitId: number) => {
    let response = await deleteOrganizationUnit(organizationUnitId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='organization_unit.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle) => !prevToggle);
  }, [isToggleTable]);

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
        Header: messages['common.title_en'],
        accessor: 'title_en',
      },
      {
        Header: messages['common.title_bn'],
        accessor: 'title_bn',
      },
      {
        Header: messages['common.email'],
        accessor: 'email',
      },
      {
        Header: messages['common.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['organization.label'],
        accessor: 'organization_title_en',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['organization_unit_type.label'],
        accessor: 'organization_unit_type_title_en',
        disableFilters: true,
        disableSortBy: true,
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
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteOrganizationUnitItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: ORGANIZATION_SERVICE_PATH + '/organization-units',
      dataAccessor: 'data',
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconOrganizationUnit />{' '}
            <IntlMessages id='organization_unit.label' />
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
                  subject: messages['organization_unit.label'],
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
          skipDefaultFilter={true}
          skipPageResetRef={false}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <OrganizationUnitAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={organizationUnitId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && (
          <OrganizationUnitDetailsPopup
            key={1}
            itemId={organizationUnitId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default OrganizationUnitPage;
