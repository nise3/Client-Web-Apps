import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import FourIRGuidelineAddEditPopup from './4IRGuidelineAddEditPopup';
import FourIRTNAReportDetailsPopup from './4IRGuidelineDetailsPopup';
import {API_4IR_GUIDLINE} from '../../../@softbd/common/apiRoutes';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {deleteTNAReport} from '../../../services/4IRManagement/TNAReportServices';

interface IFourIRImplemntingTeamPage {
  fourIRProjectId: number;
}

const FourGuidelinePage = ({
  fourIRProjectId = 9,
}: IFourIRImplemntingTeamPage) => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(1);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(true);
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
    setIsToggleTable((prev) => !prev);
  }, []);

  // TODO -> refectoring
  const deleteTNAReportItem = async (itemId: number) => {
    let response = await deleteTNAReport(itemId);

    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='4ir.label' />}}
        />,
      );

      refreshDataTable();
    }
  };

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
        Header: messages['common.workshop_name'],
        accessor: 'workshop_name',
      },
      {
        Header: messages['common.required_skill'],
        accessor: 'skill_required',
      },
      {
        Header: messages['common.start_date'],
        accessor: 'start_date',
      },
      {
        Header: messages['common.end_date'],
        accessor: 'end_date',
        isVisible: false,
      },
      {
        Header: messages['common.venue'],
        accessor: 'venue',
        isVisible: false,
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
                deleteAction={() => deleteTNAReportItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
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
      urlPath: API_4IR_GUIDLINE,
      paramsValueModifier: (params: any) => {
        params['fourIrGuidelinesId'] = 9;
        return params;
      },
    });

  console.log(data);

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.guideline' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={false}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['4ir.TNA_report'],
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
          <FourIRGuidelineAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            fourIRProjectId={fourIRProjectId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRTNAReportDetailsPopup
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

export default FourGuidelinePage;
