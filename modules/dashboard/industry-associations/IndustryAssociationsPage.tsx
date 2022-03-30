import React, {useCallback, useEffect, useMemo, useState} from 'react';
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
import IconList from '../../../@softbd/icons/IconList';
import IndustryAssociationDetailsPopup from './IndustryAssociationDetails';
import IndustryAssociationAddEditPopup from './IndustryAssociationAddEdit';
import {deleteIndustryAssoc} from '../../../services/IndustryManagement/IndustryAssociationService';
import RejectButton from '../applicationManagement/RejectButton';
import {
  reapproveIndustryAssociationRegistration,
  rejectIndustryAssociationRegistration,
} from '../../../services/IndustryAssociationManagement/IndustryAssociationRegistrationService';
import {FiUserCheck} from 'react-icons/fi';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import AssignPermissionSubGroupPopup from './AssignPermissionSubGroupPopup';
import ApproveButton from './ApproveButton';
import CustomChipStatus from '../memberList/CustomChipStatus';
import {ApprovalStatus} from '../Institutes/ApprovalStatusEnums';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {useFetchIndustryAssociationTrades} from '../../../services/IndustryAssociationManagement/hooks';
import {ISelectFilterItem} from '../../../shared/Interface/common.interface';

const IndustryAssociationsPage = () => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const [associationTradeFilter] = useState({});

  const {data: associationTrades} = useFetchIndustryAssociationTrades(
    associationTradeFilter,
  );
  const [tradeFilterItems, setTradeFilterItems] = useState<
    Array<ISelectFilterItem>
  >([]);

  useEffect(() => {
    if (associationTrades) {
      setTradeFilterItems(
        associationTrades.map((trade: any) => {
          return {
            id: trade.id,
            title: trade.title,
          };
        }),
      );
    }
  }, [associationTrades]);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const [isOpenPermissionSubGroupModal, setIsOpenPermissionSubGroupModal] =
    useState(false);

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

  const openAssignPermissionModal = useCallback(
    (itemId: number | null = null) => {
      setIsOpenDetailsModal(false);
      setIsOpenPermissionSubGroupModal(true);
      setSelectedItemId(itemId);
    },
    [],
  );

  const closeAssignPermissionModal = useCallback(() => {
    setIsOpenPermissionSubGroupModal(false);
    setSelectedItemId(null);
  }, []);

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
        }
        refreshDataTable();
      }
    } catch (error: any) {
      errorStack(<IntlMessages id='message.somethingWentWrong' />);
      console.log('error', error);
    }
  };

  const reapproveIndustryAssocRegistration = async (
    industryAssocId: number,
  ) => {
    try {
      let response = await reapproveIndustryAssociationRegistration(
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
        isVisible: locale == LocaleLanguage.BN,
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
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      // {
      //   Header: messages['common.domain'],
      //   accessor: 'domain',
      //   isVisible: false,
      // },
      {
        Header: messages['association.association_trades'],
        accessor: 'trade_id',
        filter: 'selectFilter',
        selectFilterItems: tradeFilterItems,
        Cell: (props: any) => {
          let data = props.row.original;
          return <>{data?.trade_title}</>;
        },
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipStatus value={data?.row_status} />;
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
                deleteTitle={messages['common.delete_confirm'] as string}
              />

              {data.row_status === ApprovalStatus.PENDING && (
                <CommonButton
                  onClick={() => openAssignPermissionModal(data.id)}
                  btnText='common.approve'
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  color='secondary'
                />
              )}

              {data.row_status != ApprovalStatus.REJECTED &&
                data.row_status != 0 && (
                  <RejectButton
                    rejectAction={() =>
                      rejectIndustryAssocRegistration(data.id)
                    }
                    rejectTitle={messages['common.delete_confirm'] as string}
                  />
                )}

              {data.row_status === 3 && (
                <ApproveButton
                  approveAction={() =>
                    reapproveIndustryAssocRegistration(data.id)
                  }
                  buttonText={messages['common.approve'] as string}
                />
              )}
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, tradeFilterItems],
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
            <IconList /> <IntlMessages id='menu.industry_associations' />
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
        {isOpenPermissionSubGroupModal && (
          <AssignPermissionSubGroupPopup
            key={1}
            onClose={closeAssignPermissionModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}
      </PageBlock>
    </>
  );
};

export default IndustryAssociationsPage;
