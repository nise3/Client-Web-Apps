import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_INDUSTRY_ASSOCIATIONS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import IndustryAssociationDetailsPopup from './IndustryAssociationDetails';
import IndustryAssociationAddEditPopup from './IndustryAssociationAddEdit';
import {deleteIndustryAssoc} from '../../../services/IndustryManagement/IndustryAssociationService';
import CustomChipApplicationStatus from '../applicationsList/CustomChipApplicationStatus';
import ApproveButton from '../../../@softbd/elements/button/ApproveButton/ApproveButton';
import RejectButton from '../applicationManagement/RejectButton';
import {
  approveIndustryAssociationRegistration,
  rejectIndustryAssociationRegistration,
} from '../../../services/IndustryAssociationManagement/IndustryAssociationRegistrationService';

const IndustryAssociationsPage = () => {
  const {messages} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteIndustryAssocAction = async (itemId: number) => {
    try {
      let response = await deleteIndustryAssoc(itemId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{
              subject: <IntlMessages id='common.industry_association' />,
            }}
          />,
        );

        refreshDataTable();
      }
    } catch (error: any) {
      errorStack(<IntlMessages id='message.somethingWentWrong' />);
      console.log('error: ', error);
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const rejectIndustryAssocRegistration = async (industryAssocId: number) => {
    try {
      let response = await rejectIndustryAssociationRegistration(
        industryAssocId,
      );
      if (isResponseSuccess(response)) {
        {
          successStack(<IntlMessages id='industry_association_reg.rejected' />);
          successStack(<IntlMessages id='industry_association_reg.rejected' />);
        }
        refreshDataTable();
      }
    } catch (error: any) {
      errorStack(<IntlMessages id='message.somethingWentWrong' />);
      console.log('error', error);
    }
  };

  const approveIndustryAssocRegistration = async (industryAssocId: number) => {
    try {
      let response = await approveIndustryAssociationRegistration(
        industryAssocId,
      );
      if (isResponseSuccess(response)) {
        {
          successStack(<IntlMessages id='industry_association_reg.approved' />);
        }
        refreshDataTable();
      }
    } catch (error: any) {
      errorStack(<IntlMessages id='message.somethingWentWrong' />);
      console.log('error', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: false,
      },

      {
        Header: messages['common.domain'],
        accessor: 'domain',
        isVisible: false,
      },
      {
        Header: messages['association.association_trades'],
        accessor: 'industry_association_trade_title',
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipApplicationStatus value={data?.row_status} />;
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
                deleteAction={() => deleteIndustryAssocAction(data.id)}
                deleteTitle='Are you sure?'
              />
              {data.row_status != 1 ? (
                <ApproveButton
                  onClick={() => approveIndustryAssocRegistration(data.id)}
                />
              ) : (
                ''
              )}
              {data.row_status != 3 && data.row_status != 0 ? (
                <RejectButton
                  rejectAction={() => rejectIndustryAssocRegistration(data.id)}
                  rejectTitle={messages['common.delete_confirm'] as string}
                />
              ) : (
                ''
              )}
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
      urlPath: API_INDUSTRY_ASSOCIATIONS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconInstitute /> <IntlMessages id='menu.industry_associations' />
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
                  subject: messages['common.industry_association'],
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
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {isOpenAddEditModal && (
          <IndustryAssociationAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <IndustryAssociationDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default IndustryAssociationsPage;
