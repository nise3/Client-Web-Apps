import React, {useMemo} from 'react';
import {Grid, Typography} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetch4IRInitiativeAnalysis} from '../../../services/4IRManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {
  API_4IR_FILE_LOGS,
  FILE_SERVER_FILE_VIEW_ENDPOINT,
} from '../../../@softbd/common/apiRoutes';
import DownloadIcon from '@mui/icons-material/Download';
import {Link} from '../../../@softbd/elements/common';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {FILE_LOG_INITIATIVE_ANALYSIS_STEP} from '../4IRSteppers/fourIRFileLogConstant';
import ReactTable from '../../../@softbd/table/Table/ReactTable';

type Props = {
  itemId: number;
  fourIRInitiativeId: number;
  isToggleTable: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const InitiativeAnalysisDetailsPopUp = ({
  itemId,
  openEditModal,
  isToggleTable,
  fourIRInitiativeId,
  ...props
}: Props) => {
  const {messages, locale} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRInitiativeAnalysis(itemId);

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

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_4IR_FILE_LOGS,
      paramsValueModifier: (params) => {
        params['four_ir_initiative_id'] = fourIRInitiativeId;
        params['file_log_step'] = FILE_LOG_INITIATIVE_ANALYSIS_STEP;
        return params;
      },
    });

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_initiative_analysis.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
            {itemData && (
              <EditButton
                variant='contained'
                onClick={() => openEditModal(itemData.id)}
                isLoading={isLoading}
              />
            )}
          </>
        }>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.researcher_name']}
              value={itemData?.researcher_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.organization_name']}
              value={itemData?.organization_name}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.research_method']}
              value={itemData?.research_method}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Link
              underline='none'
              href={`${FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.file_path}`}
              download
              target={'_blank'}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                marginTop: '2rem',
              }}>
              <CommonButton
                startIcon={<DownloadIcon />}
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'common.download_file'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Typography variant={'h5'}>
              {messages['common.previous_files']}
            </Typography>
            <ReactTable
              columns={columns}
              data={data}
              fetchData={onFetchData}
              loading={loading}
              pageCount={pageCount}
              totalCount={totalCount}
              toggleResetTable={isToggleTable}
            />
          </Grid>

          {/* // todo: file path should be added */}
          {/*<Grid item xs={12} md={6}>*/}
          {/*  <Link*/}
          {/*    underline='none'*/}
          {/*    href={`${FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.file_path}`}*/}
          {/*    download*/}
          {/*    target={'_blank'}*/}
          {/*    style={{*/}
          {/*      display: 'flex',*/}
          {/*      justifyContent: 'flex-start',*/}
          {/*      marginTop: '2rem',*/}
          {/*    }}>*/}
          {/*    <CommonButton*/}
          {/*      startIcon={<DownloadIcon />}*/}
          {/*      key={1}*/}
          {/*      onClick={() => console.log('file downloading')}*/}
          {/*      btnText={'common.download_file'}*/}
          {/*      variant={'outlined'}*/}
          {/*      color={'primary'}*/}
          {/*    />*/}
          {/*  </Link>*/}

          {/*<Link href={`/`}>*/}
          {/*  <CommonButton*/}
          {/*    btnText='common.download'*/}
          {/*    startIcon={<FiUser style={{marginLeft: '5px'}} />}*/}
          {/*    variant={'text'}*/}
          {/*  />*/}
          {/*</Link>*/}
          {/*</Grid>*/}

          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.active_status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
          </Grid>
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default InitiativeAnalysisDetailsPopUp;
