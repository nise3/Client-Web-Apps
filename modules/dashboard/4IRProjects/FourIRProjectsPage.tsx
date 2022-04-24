import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import FourIRProjectAddEditPopup from './FourIRProjectAddEditPopup';
import FourIRProjectDetailsPopup from './FourIRProjectDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import TaskIcon from '@mui/icons-material/Task';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {deleteProject} from '../../../services/4IRManagement/ProjectService';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {useRouter} from 'next/router';

const FourIRProjectsPage = () => {
  const router = useRouter();
  const {messages, locale} = useIntl();
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

  const deleteProjectItem = async (projectId: number) => {
    let response = await deleteProject(projectId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='4ir_project.label' />}}
        />,
      );
      refreshDataTable();
    }
  };

  const openIncompleteStep = useCallback(
    (projectId: any, completionStep: any, formStep: any) => {
      router.push({
        pathname: '/4ir/' + projectId,
        query: {
          completionStep: completionStep,
          formStep: formStep,
        },
      });
    },
    [],
  );

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

      {
        Header: messages['common.project'],
        accessor: 'project_name',
      },
      {
        Header: messages['common.start_date'],
        accessor: 'project_start_date',
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
              <CommonButton
                onClick={() => {
                  openIncompleteStep(
                    data?.id,
                    data?.completion_step,
                    data?.form_step,
                  );
                }}
                btnText={`4ir_showcasing.complete_step`}
                extraText={data?.completion_step}
                startIcon={<TaskIcon style={{marginLeft: '5px'}} />}
                color='secondary'
              />
              <DeleteButton
                deleteAction={() => deleteProjectItem(data.id)}
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

  /*  const {onFetchData, data, loading, pageCount, totalCount} =
              useReactTableFetchData({
                urlPath: API_4IR_PROJECTS,
              });*/

  const data = [
    {
      id: 2,
      project_name: 'rouzex project',
      project_start_date: '12-12-12',
      row_status: '1',
      completion_step: 1,
      form_step: 0,
    },
  ];
  const onFetchData = () => {
    console.log('data fetched');
  };
  const loading = false;
  const pageCount = 1;
  const totalCount = 1;

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir_project.label' />
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
                  subject: messages['4ir_project.label'],
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
          <FourIRProjectAddEditPopup
            key={1}
            onClose={closeAddEditModal}
            itemId={selectedItemId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsModal && selectedItemId && (
          <FourIRProjectDetailsPopup
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

export default FourIRProjectsPage;
