import React, { useCallback, useMemo, useState } from "react";
import PageBlock from "../../../@softbd/utilities/PageBlock";
import AddButton from "../../../@softbd/elements/button/AddButton/AddButton";
import { useIntl } from "react-intl";
import ReadButton from "../../../@softbd/elements/button/ReadButton/ReadButton";
import EditButton from "../../../@softbd/elements/button/EditButton/EditButton";
import DeleteButton from "../../../@softbd/elements/button/DeleteButton/DeleteButton";
import DatatableButtonGroup from "../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup";
import useReactTableFetchData from "../../../@softbd/hooks/useReactTableFetchData";
import { API_RTO_BATCH } from "../../../@softbd/common/apiRoutes";
import ReactTable from "../../../@softbd/table/Table/ReactTable";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import { isResponseSuccess } from "../../../@softbd/utilities/helpers";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import RTOBatchDetailsPopup from "./RTOBatchDetailsPopup";
import RTOBatchAddEditPopup from "./RTOBatchAddEditPopup";
import IconFAQ from "../../../@softbd/icons/IconFAQ";
import { deleteRTOBatch } from "../../../services/CertificateAuthorityManagement/RTOBatchService";

const RTOBatchPage = () => {
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

  const deleteRTOBatchItem = async (itemId: number) => {
    let response = await deleteRTOBatch(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='rto_batch.label' />}}
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
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },

      {
        Header: messages['institute.label'],
        accessor: 'subject_title',
      },
      {
        Header: messages['rpl_level.label'],
        accessor: 'title',
      },

      {
        Header: messages['rpl_occupation.label'],
        accessor: 'type',
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
                deleteAction={() => deleteRTOBatchItem(data.id)}
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
      urlPath: API_RTO_BATCH,
    });


  let modifiedData = data?.map((batch: any) => {
    let type: string, title: string;
    if (parseInt(batch?.type) === 1) {
      type = 'MCQ';
    } else {
      type = 'Yes/No';
    }

    title =  batch?.title.length>18 ? batch?.title.substr(0, 17) + '.....' : batch?.title;

    return {
      ...batch,
      type,
      title
    };
  });


  return (
    <>
      <PageBlock
        title={
          <>
            <IconFAQ /> <IntlMessages id='rto_batch.label' />
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
                  subject: messages['rto_batch.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={modifiedData}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />

        {isOpenAddEditModal && (
          <RTOBatchAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <RTOBatchDetailsPopup
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

export default RTOBatchPage;
