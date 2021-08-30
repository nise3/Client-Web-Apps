import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import CustomChipRowStatus from '../../../@softbd/elements/CustomChipRowStatus';
import DatatableButtonGroup from '../../../@softbd/elements/Button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {RoomOutlined} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AddButton from '../../../@softbd/elements/Button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  deleteUpazila,
  getAllUpazilas,
} from '../../../services/locationManagement/UpazilaService';
import UpazilaAddEditPopup from './UpazilaAddEditPopup';
import UpazilaDetailsPopup from './UpazilaDetailsPopup';

const UpazilasPage = () => {
  const {messages} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [upazilas, setUpazilas] = useState<Array<Upazila>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let upazilas = await getAllUpazilas();
      setUpazilas(upazilas);
      setIsLoading(false);
    })();
  }, []);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  };

  const openAddEditModal = (itemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  };

  const openDetailsModal = (itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteUpazilaItem = async (itemId: number) => {
    let data = await deleteUpazila(itemId);
    if (data) {
      refreshDataTable();
    }
  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable(!isToggleTable);
  }, [isToggleTable]);

  const columns = useRef([
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
      Header: messages['districts.label'],
      accessor: 'district_title_en',
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
              deleteAction={() => deleteUpazilaItem(data.id)}
              deleteTitle='Are you sure?'
            />
          </DatatableButtonGroup>
        );
      },
      sortable: false,
    },
  ]);

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <PageBlock
          title={
            <>
              <RoomOutlined /> <IntlMessages id='upazilas.label' />
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
                    subject: messages['upazilas.label'],
                  }}
                />
              }
            />,
          ]}>
          <ReactTable
            columns={columns.current}
            data={upazilas}
            loading={isLoading}
            skipDefaultFilter={true}
            skipPageResetRef={false}
            toggleResetTable={isToggleTable}
          />
          {isOpenAddEditModal && (
            <UpazilaAddEditPopup
              key={1}
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={selectedItemId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <UpazilaDetailsPopup
              key={1}
              itemId={selectedItemId}
              open={isOpenDetailsModal}
              onClose={closeDetailsModal}
              openEditModal={openAddEditModal}
            />
          )}
        </PageBlock>
      </AppAnimate>
    </>
  );
};

export default UpazilasPage;
