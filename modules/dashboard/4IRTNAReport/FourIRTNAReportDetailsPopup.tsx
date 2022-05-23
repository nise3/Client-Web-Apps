import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import DownloadIcon from '@mui/icons-material/Download';
import {Link, Typography} from '@mui/material';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import IconBatch from '../../../@softbd/icons/IconBatch';
import {isBreakPointUp} from '../../../@crema/utility/Utils';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import CustomDetailsViewMuiModal from '../../../@softbd/modals/CustomDetailsViewMuiModal/CustomDetailsViewMuiModal';

interface Props {
  fourIRInitiativeId: number;
  onFetchData: any;
  data: any;
  loading: any;
  pageCount: any;
  totalCount: any;
  isToggleTable: any;
  isLoading: any;
  onClose: () => void;
}

const method_names: any = {
  1: '4ir.tna_report_workshop_method_workshop',
  2: '4ir.tna_report_fgd_workshop',
  3: '4ir.tna_report_industry_visit_workshop',
  4: '4ir.tna_report_desktop_research_workshop',
  5: '4ir.tna_report_existing_report_review_workshop',
  6: '4ir.tna_report_others_workshop',
};

// todo: data will come from tnaReport Page ; data.methods
const FourIRTNAReportDetailsPopup = ({
  fourIRInitiativeId,
  onFetchData,
  data,
  loading,
  pageCount,
  totalCount,
  isToggleTable,
  isLoading,
  ...props
}: Props) => {
  const {messages, locale} = useIntl();

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
        Header: messages['4ir.tna_report_method_name'],
        // accessor: 'method_type',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Typography>{messages[method_names[data?.method_type]]}</Typography>
          );
        },
      },
      {
        Header: messages['4ir.tna_report_number_of_workshop'],
        accessor: 'workshop_numbers',
      },
      {
        Header: messages['4ir.tna_report_attachment'],
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
                startIcon={<DownloadIcon />}
              />
            </Link>
          );
        },
      },
    ],
    [messages, locale],
  );

  return (
    <>
      <CustomDetailsViewMuiModal
        {...props}
        open={true}
        title={
          <>
            <IconBatch />
            <IntlMessages id='batches.label' />
          </>
        }
        maxWidth={isBreakPointUp('xl') ? 'lg' : 'md'}
        actions={
          <>
            <CancelButton onClick={props.onClose} isLoading={isLoading} />
          </>
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
      </CustomDetailsViewMuiModal>
    </>
  );
};

export default FourIRTNAReportDetailsPopup;
