import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import PreviewIcon from '@mui/icons-material/Preview';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { API_CERTIFICATES_ISSUE } from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import GradeIcon from '@mui/icons-material/Grade';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo, getMomentDateFormat
} from '../../../@softbd/utilities/helpers';
import IdentityNumberTypes from '../../../@softbd/utilities/IdentityNumberTypes';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import { getAllBatches } from '../../../services/instituteManagement/BatchService';


const CertificateIssuedPage = () => {
  const {messages, locale} = useIntl();
  
  const [batchFilterItems, setBatchFilterItems] = useState([]);

  useEffect(() => {
    getAllBatches().then(res=>{
      setBatchFilterItems(
        res.data.map((batch: any) => {
          return {id: batch?.id, title: batch?.title};
        }),
      );
    })
  }, [])
  
  const getNumberTypeValue = (numberType: any) => {
    let val = "";
    numberType = numberType + "";
    switch (numberType) {
      case IdentityNumberTypes.NID:
        val = 'NID: ';
        break;
      case IdentityNumberTypes.BIRTH_CERT:
          val = 'Birth Cert.: ';
          break;
      case IdentityNumberTypes.PASSPORT:
          val = 'Passport: ';
          break;
      default:
        val;
        break;
    }
    return val;
  }

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
        Header: messages['certificate.issued_date'],
        accessor: 'issued_at',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.issued_at)}</span>
          );
        },
      },
      {
        Header: messages['certificate.name_bn'],
        accessor: 'certificate_title',
      },
      {
        Header: messages['common.youth_2'],
        accessor: 'youth_profile.first_name',
      },
      {
        Header: messages['common.batch_name'],
        accessor: 'batch_title',
      },
      {
        Header: messages['batches.start_date'],
        accessor: 'batch_start_date',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.batch_start_date)}</span>
          );
        },
      },
      {
        Header: messages['batches.end_date'],
        accessor: 'batch_end_date',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.batch_end_date)}</span>
          );
        },
      },
      {
        Header: messages['applicationManagement.courseTitle'],
        accessor: 'course_title',
      },
      {
        Header: messages['batches.label'],
        accessor: 'batch_title_en',
        filter: 'selectFilter',
        selectFilterItems: batchFilterItems,
        isVisible: false,
      },
      {
        Header: messages['common.identity_number'],
        accessor: 'youth_profile.identity_number',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <>
            <span>{getNumberTypeValue(data?.youth_profile.identity_number_type)}</span>
            <span>{data?.youth_profile.identity_number}</span>
            </>
          );
        },
      },
      {
        Header: messages['youth.email'],
        accessor: 'youth_profile.email',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Link href={`/certificate/certificate-view/${data.id}`} passHref={true}>
                  <CommonButton
                    btnText='common.certificate_view'
                    startIcon={<PreviewIcon style={{ marginLeft: '5px' }} />}
                    style={{ marginLeft: '10px' }}
                    variant='outlined'
                    color='primary'
                  />
                </Link>
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale]
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_CERTIFICATES_ISSUE,
      // paramsValueModifier: (params: any) => {
      //   if (batchId) params['batch_id'] = batchId;
      //   return params;
      // },
    });

    

  return (
    <>
      <PageBlock
        title={
          <>
            <GradeIcon /> <IntlMessages id='certificate.certificate_issued' />
          </>
        }
        
        >
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          // toggleResetTable={isToggleTable}
        />
        
      </PageBlock>
    </>
  );
};

export default CertificateIssuedPage;
