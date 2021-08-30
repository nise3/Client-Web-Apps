import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import AppAnimate from '../../../@crema/core/AppAnimate';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  deleteDivision,
  getAllDivisions,
} from '../../../services/locationManagement/DivisionService';
import DivisionAddEditPopup from './DivisionAddEditPopup';
import DivisionDetailsPopup from './DivisionDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import {RoomOutlined} from '@material-ui/icons';
import IntlMessages from '../../../@crema/utility/IntlMessages';

const DivisionsPage = () => {
  const {messages} = useIntl();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [divisions, setDivisions] = useState<Array<Division>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      let divisions = await getAllDivisions();
      setDivisions(divisions);
      setIsLoading(false);
    })();
  }, []);

  const closeAddEditModal = () => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  };

  const openAddEditModal = (selectedItemId: number | null = null) => {
    setIsOpenDetailsModal(false);
    setIsOpenAddEditModal(true);
    setSelectedItemId(selectedItemId);
  };

  const openDetailsModal = (selectedItemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(selectedItemId);
  };

  const closeDetailsModal = () => {
    setIsOpenDetailsModal(false);
  };

  const deleteDivisionItem = async (selectedItemId: number) => {
    let data = await deleteDivision(selectedItemId);
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
              deleteAction={() => deleteDivisionItem(data.id)}
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
              <RoomOutlined /> <IntlMessages id='divisions.label' />
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
                    subject: messages['divisions.label'],
                  }}
                />
              }
            />,
          ]}>
          <ReactTable
            columns={columns.current}
            data={divisions}
            loading={isLoading}
            skipDefaultFilter={true}
            skipPageResetRef={false}
            toggleResetTable={isToggleTable}
          />
          {isOpenAddEditModal && (
            <DivisionAddEditPopup
              key={1}
              open={isOpenAddEditModal}
              onClose={closeAddEditModal}
              itemId={selectedItemId}
              refreshDataTable={refreshDataTable}
            />
          )}

          {isOpenDetailsModal && (
            <DivisionDetailsPopup
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

export default DivisionsPage;
