import React, {useCallback, useMemo, useState} from 'react';
import CustomChip from '../../../@softbd/elements/display/CustomChip/CustomChip';
import PersonIcon from '@mui/icons-material/Person';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_JOB_REQUIREMENTS} from '../../../@softbd/common/apiRoutes';
import JobRequirementDetailsPopup from './JobRequirementDetailsPopup';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import JobRequirementAddPopup from './JobRequirementAddPopup';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {deleteHRDemand} from '../../../services/IndustryManagement/HrDemandService';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import JobRequirementEditPop from './JobRequirementEditPopUp';
import Link from 'next/link';
import {Button} from '@mui/material';
import {ManageAccounts} from '@mui/icons-material';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const JobRequirementPage = () => {
  const {messages, locale} = useIntl();
  const {successStack} = useNotiStack();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
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

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((isToggleTable: boolean) => !isToggleTable);
  }, []);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setIsOpenDetailsModal(false);
  }, []);

  const deleteHRDemandItem = async (HRDemandId: number) => {
    let response = await deleteHRDemand(HRDemandId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='hr_demand.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

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
        Header: messages['organization.label'],
        accessor: 'organization_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['organization.label_en'],
        accessor: 'organization_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.vacancy'],
        accessor: 'vacancy',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
              <CustomChip
                icon={<PersonIcon fontSize={'small'} />}
                color={'primary'}
                label={data.vacancy}
              />
            </>
          );
        },
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          const URL = '/../../job-requirement/__'.replace(
            '__',
            String(data.id),
          );
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} />
              <DeleteButton
                deleteAction={() => deleteHRDemandItem(data.id)}
                deleteTitle={messages['common.delete_confirm'] as string}
              />
              <Link href={URL} passHref>
                <Button startIcon={<ManageAccounts />}>
                  {messages['common.manage']}
                </Button>
              </Link>
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
      urlPath: API_JOB_REQUIREMENTS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='common.human_resource' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openAddEditModal(null)}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['job_requirement.label'],
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
        {!selectedItemId && isOpenAddEditModal && (
          <JobRequirementAddPopup
            key={1}
            onClose={closeAddEditModal}
            refreshDataTable={refreshDataTable}
          />
        )}
        {selectedItemId && isOpenAddEditModal && (
          <JobRequirementEditPop
            key={1}
            itemId={selectedItemId}
            onClose={closeAddEditModal}
            refreshDataTable={refreshDataTable}
          />
        )}
        {isOpenDetailsModal && selectedItemId && (
          <JobRequirementDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default JobRequirementPage;
