import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { FiUserCheck } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { API_CERTIFICATES_ISSUE } from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconBranch from '../../../@softbd/icons/IconBranch';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo
} from '../../../@softbd/utilities/helpers';
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
  
  
  // useEffect(() => {
  //   if (batches) {
  //     setBatchFilterItems(
  //       batches.map((skill: any) => {
  //         return {id: skill?.id, title: skill?.title};
  //       }),
  //     );
  //   }
  // }, [batches]);

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

      // {
      //   Header: messages['common.certificate'],
      //   accessor: 'certificate_id',
      // },
      {
        Header: messages['certificate.name_bn'],
        accessor: 'certificate_title',
      },
      {
        Header: messages['common.youth_2'],
        accessor: 'youth_profile.first_name',
      },
      {
        Header: messages['batches.label'],
        accessor: 'batch_title',
        filter: 'selectFilter',
        selectFilterItems: batchFilterItems,
        isVisible: false,
      },
      {
        Header: messages['common.identity_number'],
        accessor: 'youth_profile.identity_number',
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
              <Link href={`/certificate/certificate-view/${data.certificate_id}`} passHref={true}>
                  <CommonButton
                    btnText='common.certificate_view'
                    startIcon={<FiUserCheck style={{ marginLeft: '5px' }} />}
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
            <IconBranch /> <IntlMessages id='certificate.certificate_issued' />
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
