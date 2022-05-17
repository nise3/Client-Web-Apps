import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import FourIRTNAReportAddEditPopup from './FourIRTNAReportAddEditPopup';

import {API_4IR_TNA_REPORT} from '../../../@softbd/common/apiRoutes';
import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import DownloadIcon from '@mui/icons-material/Download';
import {Link, Typography} from '@mui/material';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';

interface Props {
  fourIRInitiativeId: number;
}

const method_names: any = {
  1: '4ir.tna_report_workshop_method_workshop',
  2: '4ir.tna_report_fgd_workshop',
  3: '4ir.tna_report_industry_visit_workshop',
  4: '4ir.tna_report_desktop_research_workshop',
  5: '4ir.tna_report_existing_report_review_workshop',
  6: '4ir.tna_report_others_workshop',
};

const FourIRTNAReportPage = ({fourIRInitiativeId}: Props) => {
  const {messages, locale} = useIntl();
  const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const closeAddEditModal = useCallback(() => {
    setIsOpenAddEditModal(false);
  }, []);

  const openAddEditModal = useCallback((itemId: number | null = null) => {
    setIsOpenAddEditModal(true);
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

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_4IR_TNA_REPORT,
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
            <IconBranch /> <IntlMessages id='4ir.TNA_report' />
          </>
        }
        extra={[
          data && data != [] ? (
            <>
              <Link
                href='/template/TNA-Guideline.docx'
                download
                underline={'none'}>
                <CommonButton
                  key={1}
                  onClick={() => console.log('file downloading')}
                  btnText={'4ir.tna_report_attachment'}
                  variant={'outlined'}
                  color={'primary'}
                  style={{marginRight: '10px'}}
                />
              </Link>
              <EditButton
                key={1}
                onClick={() => openAddEditModal(1)}
                isLoading={false}
              />
            </>
          ) : (
            <AddButton
              key={1}
              onClick={() => openAddEditModal(null)}
              isLoading={false}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject: messages['4ir.TNA_report'],
                  }}
                />
              }
            />
          ),
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
          <FourIRTNAReportAddEditPopup
            key={1}
            // isEdit={data != null && data != []}
            isEdit={false}
            onClose={closeAddEditModal}
            itemData={data}
            fourIRInitiativeId={fourIRInitiativeId}
            refreshDataTable={refreshDataTable}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRTNAReportPage;
