import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import InitiativeAnalysisAddEditPopup from './InitiativeAnalysisAddEditPopup';
import InitiativeAnalysisDetailsPopUp from './InitiativeAnalysisDetailsPopUp';

import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_INITIATIVE_ANALYSIS} from '../../../@softbd/common/apiRoutes';
import {useRouter} from 'next/router';
import {
  useFetch4IRInitiative,
  useFetchFourIRTagline,
} from '../../../services/4IRManagement/hooks';

interface Props {
  fourIRInitiativeId: number;
}

const FourIRInitiativeAnalysisPage = ({fourIRInitiativeId}: Props) => {
  const {messages, locale} = useIntl();
  // const {successStack, errorStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const router = useRouter();
  const taglineId = Number(router.query.taglineId);
  const initativeId = Number(router.query.initiativeId);
  const {data: tagline} = useFetchFourIRTagline(Number(taglineId));
  const {data: initaitive} = useFetch4IRInitiative(initativeId);

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
      setIsOpenAddEditModal(false);
      setSelectedItemId(itemId);
    },
    [selectedItemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
    setSelectedItemId(null);
  }, []);

  /*const deleteInitiativeAnalysisItem = async (projectId: number) => {
      try {
        let response = await deleteInitiativeAnalysis(projectId);
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
    };*/

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prev) => !prev);
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
        Header: messages['4ir.researcher_name'],
        accessor: 'researcher_name',
      },
      {
        Header: messages['common.organization_name'],
        accessor: 'organization_name',
      },
      {
        Header: messages['4ir.scale_up'],
        accessor: 'scale_up',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              {/*              <DeleteButton
                deleteAction={() => deleteInitiativeAnalysisItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />*/}
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
      urlPath: API_4IR_INITIATIVE_ANALYSIS,
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
            <IconBranch /> <IntlMessages id='4ir_initiative_analysis.label' />{' '}
            {`(${tagline?.name} > ${initaitive?.name})`}
          </>
        }
        extra={[
          !(data && data?.length) && (
            <AddButton
              key={1}
              onClick={() => openAddEditModal()}
              isLoading={false}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject: messages['4ir_initiative_analysis.label'],
                  }}
                />
              }
            />
          ),
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
          <InitiativeAnalysisAddEditPopup
            key={1}
            fourIRInitiativeId={fourIRInitiativeId}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <InitiativeAnalysisDetailsPopUp
            key={1}
            itemId={selectedItemId}
            openEditModal={openAddEditModal}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRInitiativeAnalysisPage;
