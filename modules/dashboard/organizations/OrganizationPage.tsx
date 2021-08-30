import React, {useCallback, useRef, useState} from 'react';
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
import OrganizationAddEditPopup from './OrganizationAddEditPopup';
import {deleteOrganization} from '../../../services/organaizationManagement/OrganizationService';
import OrganizationDetailsPopup from './OrganizationDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Business} from '@material-ui/icons';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

const OrganizationPage = () => {
  const {successStack} = useNotiStack();
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
    setIsToggleTable(!isToggleTable);
  }, [isToggleTable]);

  const columns = useRef([
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
      Header: messages['common.organization_type'],
      accessor: 'organization_types_title',
      disableFilters: true,
      disableSortBy: true,
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
              deleteAction={() => deleteOrganizationItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </DatatableButtonGroup>
        );
      },
      sortable: false,
    },
  ]);

  const {onFetchData, data, loading, pageCount} = useReactTableFetchData({
    urlPath: ORGANIZATION_SERVICE_PATH + '/organizations',
    dataAccessor: 'data',
  });

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={
            <>
              <Business /> <IntlMessages id='organization.label' />
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
            columns={columns.current}
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
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={organizationId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <OrganizationDetailsPopup
              key={1}
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
