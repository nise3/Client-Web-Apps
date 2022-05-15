import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import ProjectAnalysisAddEditPopup from './ProjectAnalysisAddEditPopup';

import {API_4IR_PROJECT_ANALYSIS} from '../../../@softbd/common/apiRoutes';
import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import {Link} from '@mui/material';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';

interface Props {
  fourIRInitiativeId: number;
}

const ProjectAnalysisPage = ({fourIRInitiativeId}: Props) => {
  const {messages, locale} = useIntl();
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
    setSelectedItemId(null);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenAddEditModal(true);
    setSelectedItemId(itemId);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prev) => !prev);
  }, []);

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
        Header: messages['4ir.researcher_name'],
        accessor: 'researcher_name',
      },
      {
        Header: messages['common.organization_name'],
        accessor: 'organisation_name',
      },
      {
        Header: messages['4ir.research_team_information'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Link href={`/${data?.tna_file_path}`} download>
              <CommonButton
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'common.file'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          );
        },
      },
      {
        Header: messages['4ir.report_file'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Link href={`/${data?.tna_file_path}`} download>
              <CommonButton
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'common.file'}
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
              <EditButton onClick={() => openAddEditModal(data.id)} />
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
      urlPath: API_4IR_PROJECT_ANALYSIS,
      paramsValueModifier: (params: any) => {
        params['four_ir_initiative_id'] = fourIRInitiativeId;
        return params;
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir_project_analysis.label' />
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
                  subject: messages['4ir_project_analysis.label'],
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
          <ProjectAnalysisAddEditPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeAddEditModal}
            fourIRInitiativeId={fourIRInitiativeId}
            refreshDataTable={refreshDataTable}
          />
        )}
      </PageBlock>
    </>
  );
};

export default ProjectAnalysisPage;
