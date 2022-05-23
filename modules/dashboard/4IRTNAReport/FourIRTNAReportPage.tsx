import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import FourIRTNAReportAddEditPopup from './FourIRTNAReportAddEditPopup';
import FourIRTNAReportDetailsPopup from './FourIRTNAReportDetailsPopup';
import {API_4IR_TNA_REPORT} from '../../../@softbd/common/apiRoutes';
import IntlMessages from '../../../@crema/utility/IntlMessages';

import IconBranch from '../../../@softbd/icons/IconBranch';
import DownloadIcon from '@mui/icons-material/Download';
import {Link, Typography} from '@mui/material';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {
  useFetch4IRInitiative,
  useFetchFourIRTagline,
} from '../../../services/4IRManagement/hooks';
import {useRouter} from 'next/router';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';

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
        Header: messages['menu.occupations'],
        Cell: (props: any) => {
          return <Typography>{initaitive?.name}</Typography>;
        },
      },
      {
        Header: messages['4ir.tna_report_attachment'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Link href={data?.file_path} download>
              <CommonButton
                key={1}
                onClick={() => console.log('file downloading')}
                btnText={'4ir.tna_report_attachment'}
                variant={'outlined'}
                color={'primary'}
                startIcon={<DownloadIcon />}
              />
            </Link>
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal()} />
              <EditButton onClick={() => openAddEditModal()} />
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [messages, locale],
  );

  const {
    onFetchData,
    data: tnaReportData,
    loading,
    pageCount,
    totalCount,
  } = useReactTableFetchData({
    urlPath: API_4IR_TNA_REPORT,
    paramsValueModifier: (params: any) => {
      params['four_ir_initiative_id'] = fourIRInitiativeId;
      return params;
    },
  });

  const data = [
    {
      file_path: tnaReportData?.file_path,
    },
  ];

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
          !(data && data?.length) && (
            <AddButton
              isLoading={loading}
              key={1}
              onClick={() => openAddEditModal(null)}
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
