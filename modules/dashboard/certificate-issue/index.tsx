import { useEventCallback } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiUserCheck } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { API_COURSE_ENROLLMENTS } from '../../../@softbd/common/apiRoutes';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconCourse from '../../../@softbd/icons/IconCourse';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
  isResponseSuccess
} from '../../../@softbd/utilities/helpers';
import { default as LanguageCodes, default as LocaleLanguage } from '../../../@softbd/utilities/LocaleLanguage';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import { processServerSideErrors } from '../../../@softbd/utilities/validationErrorHandler';
import { createCertificateIssue } from '../../../services/CertificateAuthorityManagement/CertificateIssueService';
import { ICertificateIssue } from '../../../shared/Interface/certificates';
import ApproveButton from '../industry-associations/ApproveButton';

const CertificateIssuePage = () => {
  const { messages, locale } = useIntl();
  const { successStack, errorStack } = useNotiStack();
  const route = useRouter();
  const { batchId } = route.query;

  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const [batchTitle, setBatchTitle] = useState<string>();
  const [courseTitle, setCourstTitle] = useState<string>();

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  const issueCerrificate = useEventCallback((data: any) => {
    const issueData: ICertificateIssue = {
      batch_id: data.batch_id,
      certificate_id: data.certificate_id,
      youth_id: data.youth_id,
      course_id: data.course_id
    };

    try {
      createCertificateIssue(issueData)
        .then((res) => {
          if (isResponseSuccess(res)) {
            successStack(
              <IntlMessages
                id='common.certificatet_issued_successfully'
                values={{ subject: <IntlMessages id='certificate.certificate_issue' /> }}
              />,
            );
            // mutateIssuedData();
            refreshDataTable();
          }
        });
    } catch (error: any) {
      processServerSideErrors({ error, errorStack });
      refreshDataTable();
    }
  });

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
        Header: messages['common.training_center'],
        accessor: 'training_center_title',
      },
      {
        Header: messages['common.youth_2'],
        accessor: 'youth_profile.first_name',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.youth_2'],
        accessor: 'youth_profile.first_name_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.date_of_birth'],
        accessor: 'date_of_birth',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.date_of_birth)}</span>
          );
        },
      },
      {
        Header: messages['youth.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['certificate.result_publish_date'],
        accessor: 'result_published_at',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{getMomentDateFormat(data?.result_published_at)}</span>
          );
        },
      },
      {
        Header: messages['menu.district'],
        accessor: 'youth_profile.district_title',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              {
                !data.certificate_issued_id ?
                <ApproveButton
                approveAction={() =>
                  issueCerrificate(data)
                }
                buttonText={messages['certificate.certificate_issue_action'] as string}
              /> : 
              // <IntlMessages id={messages['certificate.certificate_issued_done'] as string} />
              <Link href={`/certificate/certificate-view/${data.certificate_issued_id}`} passHref={true}>
                  <CommonButton
                    btnText='common.certificate_view'
                    startIcon={<FiUserCheck style={{ marginLeft: '5px' }} />}
                    style={{ marginLeft: '10px' }}
                    variant='outlined'
                    color='primary'
                  />
                </Link>
              }
              
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const { onFetchData, data, loading, pageCount, totalCount } =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
      paramsValueModifier: (params: any) => {
        if (batchId) params['batch_id'] = batchId;
        // params['certificate_issued_id'] = null;
        return params;
      },
      // filters: {
      //   certificate_issued_id: null
      // }
    });

    

    useEffect(() => {
      if(data && data.length > 0){
        setBatchTitle(data[0][locale === LanguageCodes.BN ? 'batch_title': 'batch_title_en'] )
        setCourstTitle(data[0][locale === LanguageCodes.BN ? 'course_title': 'course_title_en'])
        // data[0].result_published_at = '2022-05-19T09:28:46.000000Z';
      }
      // console.log(data)
      
    }, [data])
    

  // useEffect(() => {
  //   if (data) {
  //     data.map((e:any)=> {

  //       if(!!e.certificate_issued_id > 0)
  //       {
  //         return e;
  //       }
        
  //     });
  //     console.log(data);
  //     // const filteredData = data.map((item: any) => {
  //     //   const isIssued = issuedData.find((issue: ICertificateIssueView) => issue.certificate_id == item.certificate_id && issue.youth_id == item.youth_id) !== undefined;
  //     //   return { ...item, ...{ isIssued: isIssued } }
  //     // })
  //     //   .filter((e: any) => !e.isIssued)

  //     // if (filteredData && filteredData.length > 0) {
  //     //   setCertificatesIssueList(filteredData);
  //     // }
  //   }
  // }, [data, issuedData])

  // console.log('checking ', isLoading, data);

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='certificate.certificate_issue' /> |
            <IntlMessages id='menu.batch' />: {batchTitle} | 
            <IntlMessages id='applicationManagement.courseTitle' /> : {courseTitle}
        </>
        }
        >
        {/* <div>{certificatesIssueList[0]?.isIssued}</div> */}
        <ReactTable
          columns={columns}
          data={data}
          // data={data.map(e=> {
          //   return {
          //     ...e,
          //     ...{result_published_at: "2022-05-20T09:28:46.000000Z"}
          //   }
          // })}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
        {/* <ReactTable columns={columns} data={certificatesIssueList || []} loading={isLoading} /> */}
      </PageBlock>
    </>
  );
};

export default CertificateIssuePage;
// function refreshDataTable() {
//   throw new Error('Function not implemented.');
// }
