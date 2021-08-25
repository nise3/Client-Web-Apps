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
import OrganizationAddEditPopup from './OrganizationAddEditPopup';
import {deleteOrganization} from '../../../services/organaizationManagement/OrganizationService';
import OrganizationDetailsPopup from './OrganizationDetailsPopup';
import CustomChip from '../../../@softbd/elements/CustomChip';
import {getRowStatusText} from '../../../@softbd/common/helpers';
import {CheckCircleOutline} from '@material-ui/icons';
import CancelIcon from '@material-ui/icons/Cancel';

const OrganizationPage = () => {
  const {messages} = useIntl();

  const [organizationId, setOrganizationId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

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

  const deleteOrganizationItem = async (organizationId: number) => {
    let data = await deleteOrganization(organizationId);
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
      Header: messages['common.domain'],
      accessor: 'domain',
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
      Header: messages['common.status'],
      accessor: 'row_status',
      Cell: (props: any) => {
        let data = props.row.original;
        return (
          <CustomChip
            icon={
              data.row_status == 1 ? <CheckCircleOutline /> : <CancelIcon />
            }
            color={data.row_status == 1 ? 'primary' : 'secondary'}
            label={getRowStatusText(data.row_status)}
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
              deleteAction={() => deleteOrganizationItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </ButtonGroup>
        );
      },
      sortable: false,
    },
  ];

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: ORGANIZATION_SERVICE_PATH + '/organizations',
    dataAccessor: 'data',
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={messages['organization.organization_title']}
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
            <OrganizationAddEditPopup
              key={1}
              title={
                organizationId
                  ? [messages['organization.organization_add_title']]
                  : [messages['organization.organization_edit_title']]
              }
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={organizationId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <OrganizationDetailsPopup
              key={1}
              title={messages['organization.organization_view_title'] as string}
              itemId={organizationId}
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

export default OrganizationPage;
