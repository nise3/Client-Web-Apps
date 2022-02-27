import React, { useCallback, useMemo, useState } from "react";
import PageBlock from "../../../@softbd/utilities/PageBlock";
import AddButton from "../../../@softbd/elements/button/AddButton/AddButton";
import { useIntl } from "react-intl";
/*import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';*/
import useReactTableFetchData from "../../../@softbd/hooks/useReactTableFetchData";
import { API_RTO_COUNTRIES } from "../../../@softbd/common/apiRoutes";
import ReactTable from "../../../@softbd/table/Table/ReactTable";
import RTOCountryAddEditPopup from "./RTOCountryAddEditPopup";
import RTOCountryDetailsPopup from "./RTOCountryDetailsPopup";

import IntlMessages from "../../../@crema/utility/IntlMessages";
//import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
//import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import IconCountry from "../../../@softbd/icons/IconCountry";
import LocaleLanguage from "../../../@softbd/utilities/LocaleLanguage";

const RTOCountryPage = () => {
  const {messages, locale} = useIntl();
  //const {successStack} = useNotiStack();

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

  /*const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );*/

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);



  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle: any) => !prevToggle);
  }, [isToggleTable]);

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

    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_RTO_COUNTRIES,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCountry /> <IntlMessages id='country.label' />
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
                  subject: messages['rto-rtoCountries.label'],
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
          <RTOCountryAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <RTOCountryDetailsPopup
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

export default RTOCountryPage;
