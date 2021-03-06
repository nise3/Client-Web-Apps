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
  getMomentDateFormat,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import FourIRShowcasingAddEditPopup from './FourIRShowcasingAddEditPopup';
import FourIRShowcasingDetailsPopup from './FourIRShowcasingDetailsPopup';

import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_SHOWCASE} from '../../../@softbd/common/apiRoutes';
import {deleteShowcasing} from '../../../services/4IRManagement/ShowcasingServices';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';

interface IFourShowcasingPageProps {
  fourIRInitiativeId: number;
}

const FourIRShowcasingPage = ({
  fourIRInitiativeId,
}: IFourShowcasingPageProps) => {
  const {messages, locale} = useIntl();
  const {successStack, errorStack} = useNotiStack();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [itemInitiativeId, setItemInitiativeId] = useState<number>(0);

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
    (itemId: number, initiativeId: number) => {
      setIsOpenDetailsModal(true);
      setSelectedItemId(itemId);
      setItemInitiativeId(initiativeId);
    },
    [selectedItemId],
  );

  const deleteShowcasingHandler = async (memberId: number) => {
    try {
      let response = await deleteShowcasing(memberId);
      if (isResponseSuccess(response)) {
        successStack(
          <IntlMessages
            id='common.subject_deleted_successfully'
            values={{subject: <IntlMessages id='4ir.team_member' />}}
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

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
    setItemInitiativeId(0);
  }, []);

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
        Header: messages['showcasing.initiative_name'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <div>{data?.initiative_name}</div>;
        },
      },
      {
        Header: messages['showcasing.organization_name'],
        accessor: 'organization_name',
      },
      {
        Header: messages['showcasing.organization_name_en'],
        accessor: 'organization_name_en',
      },
      {
        Header: messages['common.start_time'],
        accessor: 'start_time',
        filter: 'dateTimeFilter',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.start_time, 'DD MMM, YYYY')}</span>
          );
        },
      },
      {
        Header: messages['common.end_time'],
        accessor: 'end_time',
        filter: 'dateTimeFilter',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.end_time, 'DD MMM, YYYY')}</span>
          );
        },
      },
      {
        Header: messages['common.venue'],
        accessor: 'venue',
      },
      // {
      //   Header: messages['common.event_description'],
      //   accessor: 'event_description',
      // },
      //
      // {
      //   Header: messages['showcasing.invite_other_organization'],
      //   accessor: 'invite_other_organization',
      // },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() =>
                  openDetailsModal(data.id, data?.four_ir_initiative_id)
                }
              />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteShowcasingHandler(data.id)}
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
      urlPath: API_4IR_SHOWCASE,
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
            <IconBranch /> <IntlMessages id='4ir_showcasing.label' />
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
                  subject: messages['4ir_showcasing.label'],
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
          <FourIRShowcasingAddEditPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeAddEditModal}
            fourIRInitiativeId={fourIRInitiativeId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRShowcasingDetailsPopup
            key={1}
            isToggleTable={isToggleTable}
            setIsToggleTable={setIsToggleTable}
            fourIRInitiativeId={itemInitiativeId}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRShowcasingPage;
