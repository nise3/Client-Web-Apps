import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_TRAINING_CENTERS} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import TrainingCenterAddEditPopup from './TrainingCenterAddEditPopup';
import TrainingCenterDetailsPopup from './TrainingCenterDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconTrainingCenter from '../../../@softbd/icons/IconTrainingCenter';
import {deleteTrainingCenter} from '../../../services/instituteManagement/TrainingCenterService';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

const TrainingCenterPage = () => {
  const {messages, locale} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
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

  const deleteTrainingCenterItem = async (trainingCenterId: number) => {
    let response = await deleteTrainingCenter(trainingCenterId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='training_center.label' />}}
        />,
      );
      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((isToggleTable: boolean) => !isToggleTable);
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
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title_en',
        isVisible: locale == LocaleLanguage.EN && authUser?.isSystemUser,
        disableFilters: !authUser?.isSystemUser || locale == LocaleLanguage.BN,
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title',
        isVisible: locale == LocaleLanguage.BN && authUser?.isSystemUser,
        disableFilters: !authUser?.isSystemUser || locale == LocaleLanguage.EN,
      },
      {
        Header: messages['branch.label'],
        accessor: 'branch_title',
      },
      {
        Header: messages['common.address'],
        accessor: 'address',
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
              <DeleteButton
                deleteAction={() => deleteTrainingCenterItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_TRAINING_CENTERS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconTrainingCenter /> <IntlMessages id='training_center.label' />
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
                  subject: messages['training_center.label'],
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
          <TrainingCenterAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <TrainingCenterDetailsPopup
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

export default TrainingCenterPage;
