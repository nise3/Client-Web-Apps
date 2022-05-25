import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import FourIRTNAReportAddEditPopup from './FourIRTNAReportAddEditPopup';
import FourIRTNAReportDetailsPopup from './FourIRTNAReportDetailsPopup';
import {
  API_4IR_FILE_LOGS,
  FILE_SERVER_FILE_VIEW_ENDPOINT,
} from '../../../@softbd/common/apiRoutes';
import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import DownloadIcon from '@mui/icons-material/Download';
import {Link, Typography} from '@mui/material';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {
  useFetch4IRInitiative,
  useFetchFourIRTagline,
  useFetchTNAReports,
} from '../../../services/4IRManagement/hooks';
import {useRouter} from 'next/router';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import AddIcon from '@mui/icons-material/Add';

import Grid from '@mui/material/Grid';
import {FILE_LOG_TNA_STEP} from '../4IRSteppers/fourIRFileLogConstant';

interface Props {
  fourIRInitiativeId: number;
}

// const method_names: any = {
//   1: '4ir.tna_report_workshop_method_workshop',
//   2: '4ir.tna_report_fgd_workshop',
//   3: '4ir.tna_report_industry_visit_workshop',
//   4: '4ir.tna_report_desktop_research_workshop',
//   5: '4ir.tna_report_existing_report_review_workshop',
//   6: '4ir.tna_report_others_workshop',
// };

const FourIRTNAReportPage = ({fourIRInitiativeId}: Props) => {
  const {messages, locale} = useIntl();
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState<boolean>(false);
  const [isOpenDetailsPopup, setIsOpenDetailsPopup] = useState<boolean>(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const router = useRouter();
  const taglineId = Number(router.query.taglineId);
  const initativeId = Number(router.query.initiativeId);
  const {data: tagline, isLoading: isTaglineLoading} = useFetchFourIRTagline(
    Number(taglineId),
  );
  const {data: initaitive, isLoading: isInitiativeLoading} =
    useFetch4IRInitiative(initativeId);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenAddEditModal(true);
  }, []);

  const openDetailsModal = useCallback(() => {
    setIsOpenDetailsPopup(true);
  }, []);
  const closeDetailsPopup = useCallback(() => {
    setIsOpenDetailsPopup(false);
  }, []);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((prev) => !prev);
  }, []);

  const {data: tnaReportData, isLoading: loading} =
    useFetchTNAReports(fourIRInitiativeId);

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
        Header: messages['common.date'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Typography>
              {getMomentDateFormat(data?.created_at, 'YYYY-MM-DD')}
            </Typography>
          );
        },
      },
      {
        Header: messages['4ir.tna_report_attachment'],
        Cell: (props: any) => {
          let data = props.row.original;
          return data?.file_path ? (
            <Link
              href={FILE_SERVER_FILE_VIEW_ENDPOINT + data?.file_path}
              download>
              <CommonButton
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'common.download'}
                variant={'outlined'}
                color={'primary'}
                startIcon={<DownloadIcon />}
              />
            </Link>
          ) : (
            <CommonButton
              disabled
              key={1}
              onClick={() => console.log('file downloading')}
              btnText={'common.download'}
              variant={'outlined'}
              color={'primary'}
              startIcon={<DownloadIcon />}
            />
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const {
    onFetchData,
    data,
    loading: isFileLogsLoading,
    pageCount,
    totalCount,
  } = useReactTableFetchData({
    urlPath: API_4IR_FILE_LOGS,
    paramsValueModifier: (params) => {
      params['four_ir_initiative_id'] = fourIRInitiativeId;
      params['file_log_step'] = FILE_LOG_TNA_STEP;
      return params;
    },
  });

  const isLoading = isInitiativeLoading || isTaglineLoading;

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.TNA_report' />{' '}
            {`(${tagline?.name} > ${initaitive?.name})`}
          </>
        }
        extra={[
          <>
            <Link
              href='/template/TNA-Guideline.docx'
              download
              underline={'none'}>
              <CommonButton
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'4ir.tna_report_demo'}
                variant={'outlined'}
                color={'primary'}
                style={{marginRight: '10px'}}
              />
            </Link>
          </>,
        ]}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Typography>{messages['menu.occupations']}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>{messages['4ir.tna_report_attachment']}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography> {messages['common.actions']}</Typography>
          </Grid>

          <Grid item xs={12}>
            <hr />
          </Grid>

          <Grid item xs={5}>
            <Typography>{initaitive?.name}</Typography>
          </Grid>
          <Grid item xs={3}>
            {tnaReportData?.file_path ? (
              <Link
                href={FILE_SERVER_FILE_VIEW_ENDPOINT + tnaReportData?.file_path}
                download>
                <CommonButton
                  key={1}
                  onClick={() => console.log('file downloading')}
                  btnText={'4ir.tna_report_attachment'}
                  variant={'outlined'}
                  color={'primary'}
                  startIcon={<DownloadIcon />}
                />
              </Link>
            ) : (
              <CommonButton
                disabled
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'4ir.tna_report_attachment'}
                variant={'outlined'}
                color={'primary'}
                startIcon={<DownloadIcon />}
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {
              <DatatableButtonGroup>
                <ReadButton onClick={() => openDetailsModal()} />
                {tnaReportData &&
                tnaReportData?.methods &&
                tnaReportData?.methods?.length ? (
                  <EditButton onClick={() => openAddEditModal()} />
                ) : (
                  <ReadButton
                    key={1}
                    onClick={() => openAddEditModal(null)}
                    // btnText={'common.create_report'}
                    startIcon={<AddIcon />}>
                    {messages['common.create_report']}
                  </ReadButton>
                )}
              </DatatableButtonGroup>
            }
          </Grid>
        </Grid>

        <hr />

        <Typography
          sx={{
            marginTop: '20px',
          }}
          variant={'h5'}>
          {messages['common.previous_files']}
        </Typography>

        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={isFileLogsLoading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />

        {isOpenAddEditModal && (
          <FourIRTNAReportAddEditPopup
            key={'tna_add_edit'}
            isEdit={
              tnaReportData &&
              tnaReportData?.methods &&
              tnaReportData?.methods?.length
            }
            onClose={closeAddEditModal}
            itemData={tnaReportData?.methods}
            fourIRInitiativeId={fourIRInitiativeId}
            refreshDataTable={refreshDataTable}
          />
        )}

        {isOpenDetailsPopup && (
          <FourIRTNAReportDetailsPopup
            onFetchData={onFetchData}
            data={tnaReportData?.methods ?? []}
            loading={loading}
            pageCount={pageCount}
            totalCount={totalCount}
            isToggleTable={isToggleTable}
            isLoading={isLoading}
            onClose={closeDetailsPopup}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRTNAReportPage;
