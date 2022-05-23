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
import FourIRScaleUpAddEditPopUp from './FourIRScaleUpAddEditPopUp';
import FourIRScaleUpDetailsPopUp from './FourIRScaleUpDetailsPopUp';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_SCALE_UP} from '../../../@softbd/common/apiRoutes';
import {deleteScaleUp} from '../../../services/4IRManagement/ScaleUpService';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import {useRouter} from 'next/router';
import {
  useFetch4IRInitiative,
  useFetchFourIRTagline,
} from '../../../services/4IRManagement/hooks';

interface Props {
  fourIRInitiativeId: number;
}

const FourIRImplemntingTeamPage = ({fourIRInitiativeId}: Props) => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const router = useRouter();
  const taglineId = Number(router.query.taglineId);
  const initativeId = Number(router.query.initiativeId);
  const {data: tagline} = useFetchFourIRTagline(Number(taglineId));
  const {data: initaitive} = useFetch4IRInitiative(initativeId);

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

  const deleteScaleUpItem = async (projectId: number) => {
    try {
      let response = await deleteScaleUp(projectId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{
              subject: <IntlMessages id='4ir_initiative_analysis.label' />,
            }}
          />,
        );
        refreshDataTable();
      }
    } catch (error: any) {
      processServerSideErrors({
        error,
        errorStack,
      });
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
        Header: messages['project.name'],
        accessor: 'project_name',
      },
      {
        Header: messages['initiative.budget'],
        accessor: 'budget',
      },
      {
        Header: messages['common.start_year'],
        accessor: 'timeline_start_year',
      },
      {
        Header: messages['common.end_year'],
        accessor: 'timeline_end_year',
      },
      {
        Header: messages['common.start_date'],
        accessor: 'start_date',
      },
      {
        Header: messages['common.end_date'],
        accessor: 'end_date',
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
                deleteAction={() => deleteScaleUpItem(data.id)}
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
      urlPath: API_4IR_SCALE_UP,
      paramsValueModifier: (params) => {
        params['four_ir_initiative_id'] = fourIRInitiativeId;
        return params;
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.scale_up' />{' '}
            {`(${tagline?.name} > ${initaitive?.name})`}
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
                  subject: messages['4ir.scale_up'],
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
          <FourIRScaleUpAddEditPopUp
            key={1}
            fourIRInitiativeId={fourIRInitiativeId}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRScaleUpDetailsPopUp
            key={1}
            itemId={selectedItemId}
            fourIRInitiativeId={fourIRInitiativeId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRImplemntingTeamPage;
