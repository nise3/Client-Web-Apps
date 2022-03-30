import React, { useCallback, useMemo, useState } from "react";
import PageBlock from "../../../@softbd/utilities/PageBlock";
import AddButton from "../../../@softbd/elements/button/AddButton/AddButton";
import { useIntl } from "react-intl";
import ReadButton from "../../../@softbd/elements/button/ReadButton/ReadButton";
import EditButton from "../../../@softbd/elements/button/EditButton/EditButton";
import DeleteButton from "../../../@softbd/elements/button/DeleteButton/DeleteButton";
import DatatableButtonGroup from "../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup";
import useReactTableFetchData from "../../../@softbd/hooks/useReactTableFetchData";
import { API_RPL_SECTORS } from "../../../@softbd/common/apiRoutes";
import ReactTable from "../../../@softbd/table/Table/ReactTable";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import { isResponseSuccess } from "../../../@softbd/utilities/helpers";
import IntlMessages from "../../../@crema/utility/IntlMessages";
import RPLSectorsDetailsPopup from "./RPLSectorsDetailsPopup";
import RPLSectorsAddEditPopup from "./RPLSectorsAddEditPopup";
import { deleteRPLSector } from "../../../services/CertificateAuthorityManagement/RPLSectorService";
import IconInstitute from "../../../@softbd/icons/IconInstitute";

const RPLSectorsPage = () => {
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

  const deleteRPLSectorItem = async (itemId: number) => {
    let response = await deleteRPLSector(itemId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='rpl_sector.label' />}}
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
        Header: messages['common.title'],
        accessor: 'title',
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
                deleteAction={() => deleteRPLSectorItem(data.id)}
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
      urlPath: API_RPL_SECTORS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconInstitute /> <IntlMessages id='rpl_sectors.label' />
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
                  subject: messages['rpl_sectors.label'],
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
          <RPLSectorsAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <RPLSectorsDetailsPopup
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

export default RPLSectorsPage;
