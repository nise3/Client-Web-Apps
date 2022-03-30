import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import OrganizationTypeAddEditPopup from './OrganizationTypeAddEditPopup';
import {deleteOrganizationType} from '../../../services/organaizationManagement/OrganizationTypeService';
import OrganizationTypeDetailsPopup from './OrganizationTypeDetailsPopup';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import {CheckCircleOutline} from '@mui/icons-material';
import CancelIcon from '@mui/icons-material/Cancel';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconOrganizationType from '../../../@softbd/icons/IconOrganizationType';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {useFetchOrganizationTypes} from '../../../services/organaizationManagement/hooks';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const OrganizationTypePage = () => {
  const {successStack} = useNotiStack();
  const {messages, locale} = useIntl();

  const [organizationTypeFilters] = useState({});
  const {
    data: organizationTypes,
    isLoading,
    mutate: mutateOrganizationTypes,
  }: any = useFetchOrganizationTypes(organizationTypeFilters);
  const [organizationTypeId, setOrganizationTypeId] = useState<number | null>(
    null,
  );
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

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
    let response = await deleteOrganizationType(organizationTypeId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='organization_type.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    mutateOrganizationTypes();
  }, [mutateOrganizationTypes]);

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
        Header: messages['organization_type.is_government'],
        accessor: 'is_government',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <CustomChip
              icon={
                data.is_government == 1 ? (
                  <CheckCircleOutline />
                ) : (
                  <CancelIcon />
                )
              }
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
                deleteAction={() => deleteOrganizationTypeItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconOrganizationType />
            <IntlMessages id='organization_type.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['organization_type.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={organizationTypes || []}
          loading={isLoading}
        />
        {isOpenAddEditModal && (
          <OrganizationTypeAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={organizationTypeId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && organizationTypeId && (
          <OrganizationTypeDetailsPopup
            key={1}
            itemId={organizationTypeId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default OrganizationTypePage;
