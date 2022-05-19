import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_PROJECT_CONTRIBUTIONS} from '../../../@softbd/common/apiRoutes';
import FourIRContributionAddEditPopup from './FourIRContributionAddEditPopup';
import FourIRContributionDetailsPopup from './FourIRContributionDetailsPopup';

const FourIRIndividualContributionPage = () => {
  const {messages, locale} = useIntl();
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

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

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
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },
      {
        Header: messages['common.initiative'],
        accessor: 'four_ir_tagline_name',
      },
      {
        Header: messages['common.tagline'],
        accessor: 'four_ir_initiative_name',
      },
      {
        Header: messages['4ir.role_or_responsibility'],
        accessor: 'role_responsibility',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() => openDetailsModal(data.four_ir_initiative_id)}
              />
              <EditButton
                onClick={() => openAddEditModal(data.four_ir_initiative_id)}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  // send intiative_id_contribution and intiative_id
  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_4IR_PROJECT_CONTRIBUTIONS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4IR.contribution' />
          </>
        }>
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
          <FourIRContributionAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            initiativeId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRContributionDetailsPopup
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

export default FourIRIndividualContributionPage;
