import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  deleteDistrict,
  getAllDistricts,
} from '../../../services/locationManagement/DistrictService';
import DistrictAddEditPopup from './DistrictAddEditPopup';
import DistrictDetailsPopup from './DistrictDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {RoomOutlined} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';

const DistrictsPage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [districts, setDistricts] = useState<Array<District>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await loadDistrictData();
    })();
  }, []);

  const loadDistrictData = async () => {
    setIsLoading(true);
    let districts = await getAllDistricts();
    if (districts) setDistricts(districts);
    setIsLoading(false);
  };

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

  const deleteDistrictItem = async (districtId: number) => {
    let response = await deleteDistrict(districtId);
    if (response) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='districts.label' />}}
        />,
      );

      await refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(async () => {
    await loadDistrictData();
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: messages['common.id'],
        accessor: 'id',
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'title_en',
      },
      {
        Header: messages['common.title_bn'],
        accessor: 'title_bn',
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
            <RoomOutlined /> <IntlMessages id='districts.label' />
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
            open={isOpenAddEditModal}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && (
          <DistrictDetailsPopup
            key={1}
            itemId={selectedItemId}
            open={isOpenDetailsModal}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default DistrictsPage;
