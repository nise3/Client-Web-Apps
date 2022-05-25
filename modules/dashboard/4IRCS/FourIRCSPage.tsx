import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import FourIRCSAddEditPopup from './FourIRCSAddEditPopup';
import FourIRCSDetailsPopup from './FourIRCSDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_CS} from '../../../@softbd/common/apiRoutes';
import {IPageHeader} from '../4IRSteppers';

interface IFourIRCSPageProps {
  fourIRInitiativeId: number;
  pageHeader: IPageHeader;
}

const FourIRCSPage = ({fourIRInitiativeId, pageHeader}: IFourIRCSPageProps) => {
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
        Header: messages['initiative.name'],
        accessor: 'initiative_name',
        disableFilters: true,
      },
      {
        Header: messages['common.sector'],
        accessor: 'sector_title',
        disableFilters: true,
      },
      {
        Header: messages['4ir_cs.approved_by'],
        accessor: 'approved_by',
        disableFilters: true,
      },
      {
        Header: messages['common.developed_organization_name'],
        accessor: 'developed_organization_name',
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
      urlPath: API_4IR_CS,
      paramsValueModifier: (params) => {
        params['four_ir_initiative_id'] = fourIRInitiativeId;
        return params;
      },
    });
  let modifiedData = data?.map((fourIrCs: any) => {
    let approved_by: string;
    if (parseInt(fourIrCs?.approved_by) === 1) {
      approved_by = 'NSDA';
    } else if (parseInt(fourIrCs?.approved_by) === 2) {
      approved_by = 'BTEB';
    } else {
      approved_by = '';
    }

    return {
      ...fourIrCs,
      approved_by,
    };
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir_cs.label' />{' '}
            {`(${pageHeader?.tagline_name} > ${pageHeader?.initative_name})`}
          </>
        }
        extra={[
          !(data?.length > 0) && (
            <AddButton
              key={1}
              onClick={() => openAddEditModal(null)}
              isLoading={loading}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject: messages['4ir_cs.label'],
                  }}
                />
              }
            />
          ),
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
          <FourIRCSAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            fourIRInitiativeId={fourIRInitiativeId}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRCSDetailsPopup
            key={1}
            isToggleTable={isToggleTable}
            fourIRInitiativeId={fourIRInitiativeId}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRCSPage;
