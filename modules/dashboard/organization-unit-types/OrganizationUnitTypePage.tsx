import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import OrganizationUnitTypeAddEditPopup from './OrganizationUnitTypeAddEditPopup';
import {deleteOrganizationUnitType} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import OrganizationUnitTypeDetailsPopup from './OrganizationUnitTypeDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationUnitType from '../../../@softbd/icons/IconOrganizationUnitType';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/common/helpers';
import {Button} from '@material-ui/core';

const OrganizationUnitTypePage = () => {
  const {successStack} = useNotiStack();
  const {messages} = useIntl();

  const [organizationUnitTypeId, setOrganizationUnitTypeId] = useState<
    number | null
  >(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setOrganizationUnitTypeId(null);
  };

  const openAddEditModal = (organizationUnitTypeId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setOrganizationUnitTypeId(organizationUnitTypeId);
  };

  const openDetailsModal = (organizationUnitTypeId: number) => {
    setIsOpenDetailsModal(true);
    setOrganizationUnitTypeId(organizationUnitTypeId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteOrganizationUnitTypeItem = async (
    organizationUnitTypeId: number,
  ) => {
    let response = await deleteOrganizationUnitType(organizationUnitTypeId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='organization_unit_type.label' />}}
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
        Header: messages['organization.label'],
        accessor: 'organization_title_en',
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
          let HREF =
            '/../../dashboard/organization-unit-types/org-chart/__'.replace(
              '__',
              String(data.id),
            );
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteOrganizationUnitTypeItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
              <Button href={HREF} variant='outlined'>
                Hierarchy
              </Button>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: ORGANIZATION_SERVICE_PATH + '/organization-unit-types',
      dataAccessor: 'data',
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconOrganizationUnitType />
            <IntlMessages id='organization_unit_type.label' />
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
                  subject: messages['organization_unit_type.label'],
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
          <OrganizationUnitTypeAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={organizationUnitTypeId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && organizationUnitTypeId && (
          <OrganizationUnitTypeDetailsPopup
            key={1}
            itemId={organizationUnitTypeId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default OrganizationUnitTypePage;
