import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import ResourceManagementAddEditPopup from './ResourceManagementAddEditPopup';
import ResourceManagementDetailsPopup from './ResourceManagementDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconSkill from '../../../@softbd/icons/IconSkill';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {
  API_4IR_RESOURCE_MANAGEMENT,
  FILE_SERVER_FILE_VIEW_ENDPOINT,
} from '../../../@softbd/common/apiRoutes';
import {Link} from '../../../@softbd/elements/common';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DownloadIcon from '@mui/icons-material/Download';
import {useRouter} from 'next/router';
import {
  useFetch4IRInitiative,
  useFetchFourIRTagline,
} from '../../../services/4IRManagement/hooks';

interface IFourIRRMPageProps {
  fourIRInitiativeId: number;
}

const ResourceManagementPage = ({fourIRInitiativeId}: IFourIRRMPageProps) => {
  const {messages} = useIntl();

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
    setIsToggleTable((prevToggle: any) => !prevToggle);
  }, [isToggleTable]);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
        },
      },
      {
        Header: messages['4ir_cs.approved_by'],
        accessor: 'approve_by',
        disableFilters: true,
      },
      {
        Header: messages['4ir_rm.given_budget'],
        accessor: 'total_amount',
        disableFilters: true,
      },
      {
        Header: messages['4ir.tna_report_attachment'],
        accessor: 'file_path',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Link
              underline='none'
              href={`${FILE_SERVER_FILE_VIEW_ENDPOINT + data?.file_path}`}
              download
              target={'_blank'}>
              <CommonButton
                startIcon={<DownloadIcon />}
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'common.download'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          );
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
      urlPath: API_4IR_RESOURCE_MANAGEMENT,
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
            <IconSkill /> <IntlMessages id='4ir_rm.label' />{' '}
            {`(${tagline?.name} > ${initaitive?.name})`}
          </>
        }
        extra={
          !(data?.length > 0) && (
            <AddButton
              key={1}
              onClick={() => openAddEditModal(null)}
              isLoading={loading}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject: messages['4ir_rm.resource'],
                  }}
                />
              }
            />
          )
        }>
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
          <ResourceManagementAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
            fourIRInitiativeId={fourIRInitiativeId}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <ResourceManagementDetailsPopup
            key={1}
            isToggleTable={isToggleTable}
            fourIRInitiativeId={fourIRInitiativeId}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openAddEditModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default ResourceManagementPage;
