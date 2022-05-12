import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {deleteInstitute} from '../../../services/instituteManagement/InstituteService';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_INSTITUTES} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import CertificateAuthorityDetailsPopup from './CertificateAuthorityDetailsPopup';
import CertificateAuthorityAddEditPopup from './CertificateAuthorityAddEditPopup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconInstitute from '../../../@softbd/icons/IconInstitute';
import CustomChipStatus from '../memberList/CustomChipStatus';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {InstituteServiceTypes} from '../../../@softbd/utilities/InstituteServiceTypes';

const CertificateAuthorityPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

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

  /** if open registration is on, then these codes will be in action => IORIOTTCWBIA */
  /*  const rejectAction = async (itemId: number) => {
          let response = await rejectInstitute(itemId);
          if (isResponseSuccess(response)) {
            successStack(
              <IntlMessages
                id='common.subject_rejected'
                values={{subject: <IntlMessages id='erpl_institute.label' />}}
              />,
            );
          }
          refreshDataTable();
        };

        const ReApproveAction = async (itemId: number) => {
          let response = await ReApproveInstitute(itemId);
          if (isResponseSuccess(response)) {
            successStack(
              <IntlMessages
                id='common.subject_approved'
                values={{subject: <IntlMessages id='erpl_institute.label' />}}
              />,
            );
          }
          refreshDataTable();
        };*/

  const deleteInstituteItem = async (itemId: number) => {
    let response = await deleteInstitute(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='certificate_authority.label' />}}
        />,
      );

      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
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
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.code'],
        accessor: 'code',
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <CustomChipStatus variant={'filled'} value={data?.row_status} />
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          /*let itemId = data?.id;*/
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />

              {/** IORIOTTCWBIA */}
              {/*{data?.row_status == ApprovalStatus.PENDING && (
                <CommonButton
                  onClick={() => openAssignPermissionModal(data.id)}
                  btnText='common.approve'
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  color='secondary'
                />
              )}
                            {data?.row_status == ApprovalStatus.APPROVED && (
                <RejectButton
                  itemId={itemId}
                  rejectTitle={messages['common.organization'] as string}
                  rejectAction={rejectAction}>
                  {messages['common.reject']}
                </RejectButton>
              )}
              {data?.row_status == ApprovalStatus.REJECTED && (
                <ApproveButton
                  approveAction={() => ReApproveAction(data.id)}
                  buttonText={messages['common.approve'] as string}
                />
              )}*/}

              <DeleteButton
                deleteAction={() => deleteInstituteItem(data.id)}
                deleteTitle='Are you sure?'
              />
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
      urlPath: API_INSTITUTES,
      paramsValueModifier: (params: any) => {
        params['service_type'] = InstituteServiceTypes.CERTIFICATE;
        return params;
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconInstitute /> <IntlMessages id='certificate_authority.label' />
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
                  subject: messages['certificate_authority.label'],
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
          <CertificateAuthorityAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <CertificateAuthorityDetailsPopup
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

export default CertificateAuthorityPage;
