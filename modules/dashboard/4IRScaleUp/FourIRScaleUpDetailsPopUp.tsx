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
import {useFetch4IRScaleUp} from '../../../services/4IRManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {
  API_4IR_FILE_LOGS,
  FILE_SERVER_FILE_VIEW_ENDPOINT,
} from '../../../@softbd/common/apiRoutes';
import DownloadIcon from '@mui/icons-material/Download';
import {Link} from '../../../@softbd/elements/common';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {FILE_LOG_INITIATIVE_SCALE_UP_STEP} from '../4IRSteppers/fourIRFileLogConstant';

type Props = {
  itemId: number;
  onClose: () => void;
  isToggleTable: boolean;
  fourIRInitiativeId: number;
  openEditModal: (id: number) => void;
};

const FourIRScaleUpDetailsPopUp = ({
  itemId,
  openEditModal,
  isToggleTable,
  fourIRInitiativeId,
  ...props
}: Props) => {
  const {messages, locale} = useIntl();
  const {data: itemData, isLoading} = useFetch4IRScaleUp(itemId);

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
        params['file_log_step'] = FILE_LOG_INITIATIVE_SCALE_UP_STEP;
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
            <IntlMessages id='4ir.scale_up' />
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
              label={messages['project.name']}
              value={itemData?.project_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['project.name_en']}
              value={itemData?.project_name_enl}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['initiative.budget']}
              value={itemData?.budget}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.start_year']}
              value={itemData?.timeline_start_year}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.end_year']}
              value={itemData?.timeline_end_year}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.start_date']}
              value={itemData?.start_date}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.end_date']}
              value={itemData?.end_date}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.scaleup_beneficiary_target']}
              value={itemData?.beneficiary_target}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomChipRowStatus
              label={messages['4ir.scaleup_number_of_beneficiary']}
              value={itemData?.number_of_beneficiary}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['4ir.scaleup_implement_area']}
              value={itemData?.implement_area}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomChipRowStatus
              label={messages['common.approval_status']}
              value={itemData?.approval_status}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <CustomChipRowStatus
              label={messages['4ir.scaleup_document_approved_by']}
              value={itemData?.['documents_approval_status']}
              isLoading={isLoading}
            />
          </Grid>

          {itemData?.approval_status && (
            <Grid item xs={12} md={6}>
              <DetailsInputView
                label={messages['4ir_cs.approved_by']}
                value={itemData?.approve_by}
                isLoading={isLoading}
              />
            </Grid>
          )}

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
                btnText={'4ir.scale_file'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{
                fontSize: '1.2rem',
                fontWeight: '500',
              }}>
              {messages['4ir.scale_up_previous_files']}
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
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRScaleUpDetailsPopUp;
