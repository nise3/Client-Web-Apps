import React, {useEffect, useMemo} from 'react';
import {Card, Grid, Typography} from '@mui/material';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DetailsInputView from '../../../@softbd/elements/display/DetailsInputView/DetailsInputView';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import {useFetchShowcase} from '../../../services/instituteManagement/hooks';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CardMediaImageView from '../../../@softbd/elements/display/ImageView/CardMediaImageView';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import {Link} from '../../../@softbd/elements/common';
import {
  API_4IR_FILE_LOGS,
  FILE_SERVER_FILE_VIEW_ENDPOINT,
} from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DownloadIcon from '@mui/icons-material/Download';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {FILE_LOG_SHOWCASING_STEP} from '../4IRSteppers/fourIRFileLogConstant';
import ReactTable from '../../../@softbd/table/Table/ReactTable';

type Props = {
  itemId: number;
  fourIRInitiativeId: number;
  isToggleTable: boolean;
  onClose: () => void;
  setIsToggleTable: any;
  openEditModal: (id: number) => void;
};

const FourIRShowcasingDetailsPopup = ({
  itemId,
  openEditModal,
  isToggleTable,
  setIsToggleTable,
  fourIRInitiativeId,
  ...props
}: Props) => {
  const {messages, locale} = useIntl();
  const {data: itemData, isLoading} = useFetchShowcase(itemId);

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
        console.log(
          'four_ir_initiative_id is : ',
          itemData?.four_ir_initiative_id,
        );
        params['four_ir_initiative_id'] = itemData?.four_ir_initiative_id;
        params['file_log_step'] = FILE_LOG_SHOWCASING_STEP;
        return params;
      },
    });

  useEffect(() => {
    setIsToggleTable((prev: boolean) => !prev);
  }, [itemData]);

  return (
    <>
      <CustomDetailsViewMuiModal
        open={true}
        {...props}
        title={
          <>
            <IconBranch />
            <IntlMessages id='4ir_showcasing.label' />
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
              label={messages['showcasing.initiative_name']}
              value={itemData?.initiative_name}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['showcasing.initiative_name_en']}
              value={itemData?.initiative_name_en}
              isLoading={isLoading}
            />
            {/*  Empty for indentation*/}
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
              label={messages['common.organization_name_en']}
              value={itemData?.organization_name_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['showcasing.invite_other_organization']}
              value={itemData?.invite_other_organization}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['showcasing.invite_other_organization_en']}
              value={itemData?.invite_other_organization_en}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.start_time']}
              value={itemData?.start_time}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.end_time']}
              value={itemData?.end_time}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.venue']}
              value={itemData?.venue}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DetailsInputView
              label={messages['common.event_description']}
              value={itemData?.event_description}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMediaImageView
                height='194'
                image={itemData?.file_path}
                alt='Member photo'
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <CustomChipRowStatus
              label={messages['common.status']}
              value={itemData?.row_status}
              isLoading={isLoading}
            />
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
        </Grid>
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRShowcasingDetailsPopup;
