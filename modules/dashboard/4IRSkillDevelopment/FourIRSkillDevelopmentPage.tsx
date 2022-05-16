import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import FourIRSkillDevelopmentDetailsPopUp from './FourIRSkillDevelopmentDetailsPopUp';

import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {BATCH_BY_4IR_INITIATIVE_ID} from '../../../@softbd/common/apiRoutes';

interface Props {
  fourIRInitiativeId: number;
}

const FourIRSkillDevelopmentPage = ({fourIRInitiativeId}: Props) => {
  const {messages, locale} = useIntl();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [itemData, setItemData] = useState({});

  const openDetailsModal = useCallback(
    (item: any) => {
      setItemData(item);
      setIsOpenDetailsModal(true);
      setSelectedItemId(item.id as number);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setItemData({});
    setIsOpenDetailsModal(false);
  }, []);

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
        Header: messages['4ir.skill_development_traning_center'],
        accessor: 'traning_center',
      },
      {
        Header: messages['4ir.skill_development_batch_start_date'],
        accessor: 'batch_start_date',
      },
      {
        Header: messages['4ir.skill_development_batch_end_date'],
        accessor: 'batch_end_date',
      },
      {
        Header: messages['4ir.skill_development_batch_number'],
        accessor: 'batch_number',
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
        isVisible: false,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: false,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data)} />
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
      urlPath: BATCH_BY_4IR_INITIATIVE_ID + `/${fourIRInitiativeId}`,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.skill_development' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />

        {isOpenDetailsModal && selectedItemId && (
          <FourIRSkillDevelopmentDetailsPopUp
            key={1}
            itemData={itemData}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRSkillDevelopmentPage;
