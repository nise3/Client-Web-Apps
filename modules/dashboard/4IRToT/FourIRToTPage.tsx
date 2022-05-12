import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import FourIRToTAddEditPopup from './FourIRToTAddEditPopup';
import FourIRToTDetailsPopup from './FourIRToTDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_4IR_TOT} from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DownloadIcon from '@mui/icons-material/Download';

interface IFourIRToTPageProps {
  fourIRInitiativeId: number;
}
const FourIRToTPage = ({fourIRInitiativeId}: IFourIRToTPageProps) => {
  const {messages, locale} = useIntl();
  //const {successStack} = useNotiStack();
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

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prevToggle: any) => !prevToggle);
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

      /*{
        Header: messages['4ir_tot.master_trainer'],
        accessor: 'name',
        Cell: (props: any) => {
          let data = props.row.original;
          return data?.master_trainers.name[0];
        },
      },*/
      {
        Header: messages['common.attachment'],
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <CommonButton
              key={2}
              //onClick={() => openImportModal(data?.course_id, data?.id)}
              onClick={() => console.log(data)}
              btnText={messages['common.import'] as string}
              variant={'outlined'}
              color={'primary'}
              style={{marginLeft: '5px'}}
              startIcon={<DownloadIcon />}
            />
          );
        },
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
              {/*<DeleteButton
                deleteAction={() => deleteProjectItem(data.id)}
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
      urlPath: API_4IR_TOT,
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
            <IconBranch /> <IntlMessages id='4ir_tot.label' />
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
                  subject: messages['4ir_tot.label'],
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
          <FourIRToTAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            fourIRInitiativeId={fourIRInitiativeId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRToTDetailsPopup
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

export default FourIRToTPage;
