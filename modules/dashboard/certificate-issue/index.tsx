import { useEventCallback } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { API_COURSE_ENROLLMENTS } from '../../../@softbd/common/apiRoutes';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconCourse from '../../../@softbd/icons/IconCourse';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo,
  isResponseSuccess
} from '../../../@softbd/utilities/helpers';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import { createCertificateIssue } from '../../../services/CertificateAuthorityManagement/CertificateIssueService';
import { useFetchCertificateIssued } from '../../../services/instituteManagement/hooks';
import { ICertificateIssue, ICertificateIssueView } from '../../../shared/Interface/certificates';
import ApproveButton from '../industry-associations/ApproveButton';

const CertificateIssuePage = () => {
  const { messages, locale } = useIntl();
  const { successStack } = useNotiStack();
  const route = useRouter();
  const { batchId } = route.query;

  const [certificatesIssueList, setCertificatesIssueList] = useState<
    Array<ICertificateIssueView> | []
  >([]);
  const { data: issuedData, mutate: mutateIssuedData } = useFetchCertificateIssued();

  // const validationSchema = useMemo(() => {
  //   return yup.object().shape({
  //     certificate_type: yup
  //       .string()
  //       .trim()
  //       .required()
  //       .label(messages['certificate.certificate_type'] as string),
  //     certificate_Id: yup
  //       .string()
  //       .trim()
  //       .required()
  //       .label(messages['common.certificate'] as string),
  //   });
  // }, []);

  // const {
  //   control,
  //   formState: {errors, isSubmitting},
  // } = useForm<any>({resolver: yupResolver(validationSchema)});

  // const changeCertificateTypeAction = useCallback((typeid: string) => {
  //   setCertificateTypeId(typeid);
  // }, []);
  // const changeCertificatesAction = useCallback((certificateId: string) => {
  //   setCertificateId(certificateId);
  // }, []);

  // useEffect(async () => {
  //   const {data: certificate} = await getCertificateByResultType({
  //     result_type: certificateTypeId,
  //   });
  //   setCertificatesList(certificate);
  // }, [certificateTypeId]);

  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  // const [certificateIssueFilter] = useState<any>({
  //   row_status: RowStatus.ACTIVE,
  // });

  // const {data: youthListByBatch} = useFetchCourseEnrolment(
  //   certificateIssueFilter,
  // );


  // const {onFetchData, issuedData, loading, pageCount, totalCount} =
  //   useReactTableFetchData({
  //     urlPath: API_CERTIFICATES_ISSUE,
  //   });




  // console.log('after youthListByBatch', youthListByBatch)
  // const response = await courseEnroll(certificateIssueFilter);
  // const [issueFilterItems, setIssueFilterItems] = useState([]);

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);

  // useEffect(() => {
  //   if (youthListByBatch) {
  //     setIssueFilterItems(
  //       youthListByBatch.map((skill: any) => {
  //         return {id: skill?.id, title: skill?.title};
  //       }),
  //     );
  //   }
  // }, [youthListByBatch]);

  const issueCerrificate1 = useEventCallback((data: any) => {
    const issueData: ICertificateIssue = {
      batch_id: data.batch_id,
      certificate_id: data.certificate_id,
      youth_id: data.youth_id,
    };

    createCertificateIssue(issueData).then((res) => {
      if (isResponseSuccess(res)) {
        successStack(
          <IntlMessages
            id='common.certificatet_issued_successfully'
            values={{ subject: <IntlMessages id='certificate.certificate_issue' /> }}
          />,
        );
        mutateIssuedData();
        refreshDataTable();
      }
    });
  });

  //   const courseLevelFilterItems = [
  //     {id: LEVEL.BEGINNER, title: messages['level.beginner'] as string},
  //     {id: LEVEL.INTERMEDIATE, title: messages['level.intermediate'] as string},
  //     {id: LEVEL.EXPERT, title: messages['level.expert'] as string},
  //   ];

  //   const refreshDataTable = useCallback(() => {
  //     setIsToggleTable((prevToggle: any) => !prevToggle);
  //   }, [isToggleTable]);

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
        Header: messages['common.name'],
        accessor: 'youth_profile.first_name',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.name_en'],
        accessor: 'youth_profile.first_name_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['menu.batch'],
        accessor: 'batch_title',
      },
      {
        Header: messages['course.label'],
        accessor: 'course_title',
      },
      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              {/* <ReadButton onClick={() => openDetailsModal(data.id)} />
              <EditButton onClick={() => openAddEditModal(data.id)} /> */}
              <ApproveButton
                approveAction={() =>
                  issueCerrificate1(data)
                }
                // onClick={() => issueCerrificate1(data)}
                buttonText={messages['certificate.certificate_issue'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
      paramsValueModifier: (params: any) => {
        if (batchId) params['batch_id'] = batchId;
        return params;
      }
    });

  useEffect(() => {
    if (data) {

      const filteredData = data.map((item: any) => {
        const isIssued = issuedData.find((issue: ICertificateIssueView) => issue.certificate_id == item.certificate_id && issue.youth_id == item.youth_id) !== undefined;
        return { ...item, ...{ isIssued: isIssued } }
      })
        .filter((e: any) => !e.isIssued)

      if (filteredData && filteredData.length > 0) {
        setCertificatesIssueList(filteredData);
      }
    }
  }, [data, issuedData])

  // console.log('checking ', isLoading, data);

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='certificate.certificate_issue' />
          </>
        }>
        {/* <div>{certificatesIssueList[0]?.isIssued}</div> */}
        <ReactTable
          columns={columns}
          data={certificatesIssueList}
          // data={data}
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