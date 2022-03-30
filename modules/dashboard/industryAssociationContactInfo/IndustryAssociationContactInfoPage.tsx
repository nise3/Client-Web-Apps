import {useIntl} from 'react-intl';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import React, {useCallback, useMemo, useState} from 'react';
import {deleteContactInfoItem} from '../../../services/IndustryAssociationManagement/ContactInfoService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_INDUSTRY_ASSOCIATION_CONTACT_INFO} from '../../../@softbd/common/apiRoutes';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IndustryAssociationContactInfoAddEditPopup from './IndustryAssociationContactInfoAddEditPopup';
import IndustryAssociationContactInfoDetailsPopup from './IndustryAssociationContactInfoDetailsPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import IconOrganization from "../../../@softbd/icons/IconOrganization";

const IndustryAssociationContactInfoPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetails] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState(false);

  const [contactInfoId, setContactInfoId] = useState<number | null>(null);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setContactInfoId(null);
  }, []);

  const openAddEditModal = useCallback((contactInfoId: number | null) => {
    setIsOpenAddEditModal(true);
    setIsOpenDetails(false);
    setContactInfoId(contactInfoId);
  }, []);

  const openDetailsModal = useCallback((contactInfoId: number) => {
    setIsOpenDetails(true);
    setIsOpenAddEditModal(false);
    setContactInfoId(contactInfoId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetails(false);
  }, []);

  const deleteContactInfo = async (itemId: number) => {
    let response = await deleteContactInfoItem(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='common.contact_office' />}}
        />,
      );
      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevState) => !prevState);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
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
        Header: messages['common.phone'],
        accessor: 'phone',
        isVisible: false,
        disableFilters: true,
      },
      {
        Header: messages['common.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['common.email'],
        accessor: 'email',
        isVisible: false,
        disableFilters: true,
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
                deleteAction={() => deleteContactInfo(data.id)}
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
    useReactTableFetchData({urlPath: API_INDUSTRY_ASSOCIATION_CONTACT_INFO});

  return (
    <>
      <PageBlock
        title={
          <>
            <IconOrganization /> <IntlMessages id='common.contact_office' />
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
                  subject: messages['common.contact_office'],
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
          <IndustryAssociationContactInfoAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            contactInfoId={contactInfoId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && contactInfoId && (
          <IndustryAssociationContactInfoDetailsPopup
            key={1}
            contactInfoId={contactInfoId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};
export default IndustryAssociationContactInfoPage;
