import React, {useCallback, useMemo, useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/Button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import OrganizationUnitAddEditPopup from './OrganizationUnitAddEditPopup';
import {deleteOrganizationUnit} from '../../../services/organaizationManagement/OrganizationUnitService';
//import OrganizationUnitDetailsPopup from './OrganizationUnitDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconOrganizationUnit from '../../../@softbd/icons/IconOrganizationUnit';

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
    let data = await deleteOrganizationUnit(organizationUnitId);
    if (data) {
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
    setIsToggleTable(!isToggleTable);
  }, [isToggleTable]);

  const columns = useMemo(
    () => [
      {
        Header: messages['common.id'],
        accessor: 'id',
        disableFilters: true,
        disableSortBy: true,
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
        Header: messages['common.email'],
        accessor: 'email',
      },
      {
        Header: messages['organization.label'],
        accessor: 'organization_name',
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

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: ORGANIZATION_SERVICE_PATH + '/organizationUnits',
    dataAccessor: 'data',
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
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
            pageCount={pageCount}
            skipDefaultFilter={true}
            skipPageResetRef={false}
            toggleResetTable={isToggleTable}
          />
          {isOpenAddEditModal && (
            <OrganizationUnitAddEditPopup
              key={1}
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={organizationUnitId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {/*{isOpenDetailsModal && (*/}
          {/*  <OrganizationUnitDetailsPopup*/}
          {/*    key={1}*/}
          {/*    itemId={organizationUnitId}*/}
          {/*    open={isOpenDetailsModal}*/}
          {/*    onClose={closeDetailsModal}*/}
          {/*    openEditModal={openAddEditModal}*/}
          {/*  />*/}
          {/*)}*/}
        </PageBlock>
      </AppAnimate>
    </>
  );
};

export default OrganizationUnitPage;
