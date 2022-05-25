import React, {useMemo} from 'react';
import {Grid, Typography} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchFourIRToT} from '../../../services/4IRManagement/hooks';
import {
  API_4IR_FILE_LOGS,
  FILE_SERVER_FILE_VIEW_ENDPOINT,
} from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DownloadIcon from '@mui/icons-material/Download';
import {Link} from '../../../@softbd/elements/common';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {FILE_LOG_INITIATIVE_TOT_STEP} from '../4IRSteppers/fourIRFileLogConstant';
import ReactTable from '../../../@softbd/table/Table/ReactTable';

type Props = {
  itemId: number;
  fourIRInitiativeId: number;
  isToggleTable: boolean;
  onClose: () => void;
  openEditModal: (id: number) => void;
};

const FourIRToTDetailsPopup = ({
  itemId,
  openEditModal,
  isToggleTable,
  fourIRInitiativeId,
  ...props
}: Props) => {
  const {messages, locale} = useIntl();
  const {data: itemData, isLoading} = useFetchFourIRToT(itemId);

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
        params['file_log_step'] = FILE_LOG_INITIATIVE_TOT_STEP;
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
            <IntlMessages id='4ir_tot.label' />
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
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={12}>
                <fieldset>
                  <h3 style={{marginTop: '2px', marginBottom: '0'}}>
                    {messages['4ir_tot.master_trainer']}
                  </h3>

                  {itemData?.master_trainers?.length > 0 &&
                    itemData?.master_trainers?.map((master_trainer: any) => {
                      return (
                        <Grid
                          container
                          xs={12}
                          spacing={5}
                          key={master_trainer?.id}
                          mb={5}>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.name']}
                              value={master_trainer?.name}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.organization']}
                              value={master_trainer?.organization_name}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.organization_en']}
                              value={master_trainer?.organization_name_en}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.designation']}
                              value={master_trainer?.designation}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.mobile']}
                              value={master_trainer?.mobile}
                              isLoading={isLoading}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <DetailsInputView
                              label={messages['common.email']}
                              value={master_trainer?.email}
                              isLoading={isLoading}
                            />
                          </Grid>
                        </Grid>
                      );
                    })}
                </fieldset>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <h3 style={{marginTop: '2px', marginBottom: '0'}}>
              {messages['4ir_tot.organiser']}
            </h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.organizer_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.organizer_address}
              isLoading={isLoading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.organizer_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12}>
            <h3 style={{marginTop: '2px', marginBottom: '0'}}>
              {messages['4ir_tot.co_organiser']}
            </h3>
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.name']}
              value={itemData?.co_organizer_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.address']}
              value={itemData?.co_organizer_address}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.email']}
              value={itemData?.co_organizer_email}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6} />
          <Grid item xs={12} md={6} mt={5}>
            <DetailsInputView
              label={messages['4ir.tot_date']}
              value={itemData?.tot_date}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6} />
          <Grid item xs={12} md={6}>
            <Link
              underline='none'
              href={`${
                FILE_SERVER_FILE_VIEW_ENDPOINT + itemData?.proof_of_report_file
              }`}
              download
              target={'_blank'}
              style={{
                display: 'flex',
                justifyContent: 'start',
                marginTop: '2rem',
              }}>
              <CommonButton
                startIcon={<DownloadIcon />}
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'tot.proof_of_report_file'}
                variant={'outlined'}
                color={'primary'}
              />
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <Link
              underline='none'
              href={`${
                FILE_SERVER_FILE_VIEW_ENDPOINT +
                itemData?.participants_file_path
              }`}
              download
              target={'_blank'}
              style={{
                display: 'flex',
                justifyContent: 'end',
                marginTop: '2rem',
              }}>
              <CommonButton
                startIcon={<DownloadIcon />}
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'4ir_tot.participants'}
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

          <Grid item xs={12} md={6}>
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

export default FourIRToTDetailsPopup;
