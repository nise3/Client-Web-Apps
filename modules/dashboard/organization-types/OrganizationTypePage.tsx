import React, {useState} from 'react';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {ORGANIZATION_SERVICE_PATH} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import OrganizationTypeAddEditPopup from './OrganizationTypeAddEditPopup';
import {deleteOrganizationType} from '../../../services/organaizationManagement/OrganizationTypeService';
import OrganizationTypeDetailsPopup from './OrganizationTypeDetailsPopup';
import {Chip} from '@material-ui/core';

const OrganizationTypePage = () => {
  const {messages} = useIntl();

  const [organizationTypeId, setOrganizationTypeId] = useState<number | null>(
    null,
  );
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setOrganizationTypeId(null);
  };

  const openAddEditModal = (organizationTypeId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setOrganizationTypeId(organizationTypeId);
  };

  const openDetailsModal = (organizationTypeId: number) => {
    setIsOpenDetailsModal(true);
    setOrganizationTypeId(organizationTypeId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteOrganizationTypeItem = async (organizationTypeId: number) => {
    let data = await deleteOrganizationType(organizationTypeId);
    if (data) {
      refreshDataTable();
    }
  };

  const refreshDataTable = () => {
    setIsToggleTable(!isToggleTable);
  };

  const columns = [
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
      Header: messages['organizationType.is_government'],
      accessor: 'is_government',
      Cell: (props: any) => {
        let data = props.row.original;
        return (
          <Chip
            variant='outlined'
            size='small'
            color={data.is_government == 1 ? 'primary' : 'secondary'}
            label={
              data.is_government == 1
                ? messages['common.yes']
                : messages['common.no']
            }
          />
        );
      },
    },
    {
      Header: messages['common.actions'],
      Cell: (props: any) => {
        let data = props.row.original;
        return (
          <ButtonGroup
            variant='text'
            color='primary'
            aria-label='text primary button group'>
            <ReadButton onClick={() => openDetailsModal(data.id)} />
            <EditButton onClick={() => openAddEditModal(data.id)} />
            <DeleteButton
              deleteAction={() => deleteOrganizationTypeItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </ButtonGroup>
        );
      },
      sortable: false,
    },
  ];

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: ORGANIZATION_SERVICE_PATH + '/organization-types',
    dataAccessor: 'data',
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={messages['organizationType.organization_type_title']}
          extra={[
            <AddButton
              key={1}
              onClick={() => openAddEditModal(null)}
              isLoading={loading}
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
            <OrganizationTypeAddEditPopup
              key={1}
              title={
                organizationTypeId
                  ? [messages['common.edit']]
                  : [messages['common.add']]
              }
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={organizationTypeId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <OrganizationTypeDetailsPopup
              key={1}
              title={messages['common.read'] as string}
              itemId={organizationTypeId}
              open={isOpenDetailsModal}
              onClose={closeDetailsModal}
              openEditModal={openAddEditModal}
            />
          )}
        </PageBlock>
      </AppAnimate>
    </>
  );
};

export default OrganizationTypePage;
