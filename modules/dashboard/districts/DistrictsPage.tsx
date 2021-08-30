import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/Button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/Button/ReadButton';
import EditButton from '../../../@softbd/elements/Button/EditButton';
import DeleteButton from '../../../@softbd/elements/Button/DeleteButton';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/Button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  deleteDistrict,
  getAllDistricts,
} from '../../../services/locationManagement/DistrictService';
import DistrictAddEditPopup from './DistrictAddEditPopup';
import DistrictDetailsPopup from './DistrictDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/CustomChipRowStatus';
import {RoomOutlined} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';

const DistrictsPage = () => {
  const {messages} = useIntl();

  const [districtId, setDistrictId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [districts, setDistricts] = useState<Array<District>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let districts = await getAllDistricts();
      setDistricts(districts);
      setIsLoading(false);
    })();
  }, []);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setDistrictId(null);
  }, []);

  const openAddEditModal = useCallback((districtId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setDistrictId(districtId);
  }, []);

  const openDetailsModal = useCallback(
    (districtId: number) => {
      setIsOpenDetailsModal(true);
      setDistrictId(districtId);
    },
    [districtId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const deleteDistrictItem = async (districtId: number) => {
    let data = await deleteDistrict(districtId);
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
      Header: messages['common.status'],
      accessor: 'row_status',
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
  ]);

  return (
    <>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
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
            columns={columns.current}
            data={districts}
            loading={isLoading}
            skipDefaultFilter={true}
            skipPageResetRef={false}
            toggleResetTable={isToggleTable}
          />
          {isOpenAddEditModal && (
            <DistrictAddEditPopup
              key={1}
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={districtId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <DistrictDetailsPopup
              key={1}
              itemId={districtId}
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

export default DistrictsPage;
