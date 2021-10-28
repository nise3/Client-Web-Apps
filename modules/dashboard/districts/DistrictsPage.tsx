import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {deleteDistrict} from '../../../services/locationManagement/DistrictService';
import DistrictAddEditPopup from './DistrictAddEditPopup';
import DistrictDetailsPopup from './DistrictDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconDistrict from '../../../@softbd/icons/IconDistrict';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {useFetchDistricts} from '../../../services/locationManagement/hooks';

const DistrictsPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [districtsFilter] = useState<any>({});
  const {
    data: districts,
    mutate: mutateDistricts,
    isLoading,
  } = useFetchDistricts(districtsFilter);

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

  const deleteDistrictItem = async (districtId: number) => {
    let response = await deleteDistrict(districtId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='districts.label' />}}
        />,
      );

      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => mutateDistricts(), []);

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
        Header: messages['common.title_en'],
        accessor: 'title_en',
        isVisible: false,
      },
      {
        Header: messages['common.bbs_code'],
        accessor: 'bbs_code',
      },
      {
        Header: messages['divisions.label'],
        accessor: 'division_title_en',
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
                deleteAction={() => deleteDistrictItem(data.id)}
                deleteTitle='Are you sure?'
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconDistrict /> <IntlMessages id='districts.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            isLoading={isLoading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['districts.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={districts || []}
          loading={isLoading}
          skipDefaultFilter={true}
        />
        {isOpenAddEditModal && (
          <DistrictAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <DistrictDetailsPopup
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

export default DistrictsPage;
