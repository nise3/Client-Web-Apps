import React, {useCallback, useMemo, useState} from 'react';
import {styled} from '@mui/material/styles';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_ORGANIZATION_UNIT_TYPES} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import OrganizationUnitTypeAddEditPopup from './OrganizationUnitTypeAddEditPopup';
import {deleteOrganizationUnitType} from '../../../services/organaizationManagement/OrganizationUnitTypeService';
import OrganizationUnitTypeDetailsPopup from './OrganizationUnitTypeDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationUnitType from '../../../@softbd/icons/IconOrganizationUnitType';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import {Button} from '@mui/material';
import Link from 'next/link';
import {AccountTreeOutlined} from '@mui/icons-material';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const PrimaryLightButton = styled(Button)(({theme}) => {
  return {
    color: theme.palette.primary.light,
    border: 'none',
  };
});

const OrganizationUnitTypePage = () => {
  const {successStack} = useNotiStack();
  const {messages, locale} = useIntl();

  const [organizationUnitTypeId, setOrganizationUnitTypeId] = useState<
    number | null
  >(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [organizationUnitTypeFilters] = useState({});

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
        Header: messages['organization.label_en'],
        accessor: 'organization_title_en',
        disableFilters: locale == LocaleLanguage.BN,
        disableSortBy: true,
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['organization.label'],
        accessor: 'organization_title',
        disableFilters: locale == LocaleLanguage.EN,
        disableSortBy: true,
        isVisible: locale == LocaleLanguage.BN,
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
          const URL =
            '/../../organization-unit-types/organization-unit-types-hr-hierarchy/__'.replace(
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

              <Link href={URL} passHref>
                <PrimaryLightButton
                  variant={'outlined'}
                  startIcon={<AccountTreeOutlined />}>
                  {messages['common.hierarchy']}
                </PrimaryLightButton>
              </Link>
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
      urlPath: API_ORGANIZATION_UNIT_TYPES,
      dataAccessor: 'data',
      filters: organizationUnitTypeFilters,
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
