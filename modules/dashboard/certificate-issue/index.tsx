import { yupResolver } from '@hookform/resolvers/yup';
import { useEventCallback } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useAuthUser } from '../../../@crema/utility/AppHooks';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { API_COURSE_ENROLLMENTS } from '../../../@softbd/common/apiRoutes';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';
import CustomFilterableFormSelect from '../../../@softbd/elements/input/CustomFilterableFormSelect';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconCourse from '../../../@softbd/icons/IconCourse';
import yup from '../../../@softbd/libs/yup';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
  getCalculatedSerialNo, isResponseSuccess
} from '../../../@softbd/utilities/helpers';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import RowStatus from '../../../@softbd/utilities/RowStatus';
import { CommonAuthUser } from '../../../redux/types/models/CommonAuthUser';
import { createCertificateIssue } from '../../../services/CertificateAuthorityManagement/CertificateIssueService';
import { getCertificateByResultType } from '../../../services/CertificateAuthorityManagement/CertificateService';
import { useFetchResultTypes } from '../../../services/CertificateAuthorityManagement/hooks';
import { useFetchCourseEnrolment } from '../../../services/instituteManagement/hooks';
import { ICertificate, ICertificateIssue } from '../../../shared/Interface/certificates';
import ApproveButton from '../industry-associations/ApproveButton';

const CertificateIssuePage = () => {
  const { messages, locale } = useIntl();
  const { successStack } = useNotiStack();
  const authUser = useAuthUser<CommonAuthUser>();

  // console.log('AUTH USER ', authUser);
  // const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  //   const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
  //   const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const { data: certificateTypes, isLoading: isLoadingTypes } = useFetchResultTypes();
  // const { data: certificates, isLoading: isLoadingCertificates } = useFetchCertificate();

  const [certificateTypeId, setCertificateTypeId] = useState<string>();
  const [certificateId, setCertificateId] = useState<string>();
  const [certificatesList, setCertificatesList] = useState<Array<ICertificate> | []>([]);

  const validationSchema = useMemo(() => {
    return yup.object().shape({
      certificate_type: yup
        .string()
        .trim()
        .required()
        .label(messages['certificate.certificate_type'] as string)
      , certificate_Id: yup
        .string()
        .trim()
        .required()
        .label(messages['common.certificate'] as string)
    });
  }, []);

  const {
    control,
    formState: { errors, isSubmitting },
  } = useForm<any>({ resolver: yupResolver(validationSchema) });

  const changeCertificateTypeAction = useCallback(
    (typeid: string) => {
      setCertificateTypeId(typeid);
    },
    []
  );
  const changeCertificatesAction = useCallback(
    (certificateId: string) => {
      setCertificateId(certificateId);
    },
    []
  );

  useEffect(async () => {
    const { data: certificate } = await getCertificateByResultType({ result_type: certificateTypeId });
    setCertificatesList(certificate);
  }, [certificateTypeId]);

  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);

  const [certificateIssueFilter] = useState<any>({
    row_status: RowStatus.ACTIVE,
  });
  // console.log('before youthListByBatch')
  // const youthListByBatch = null;

  // getYouthList(certificateIssueFilter).then(res => youthListByBatch = res)
  const { data: youthListByBatch } = useFetchCourseEnrolment(certificateIssueFilter);
  // console.log('after youthListByBatch', youthListByBatch)
  // const response = await courseEnroll(certificateIssueFilter);
  const [issueFilterItems, setIssueFilterItems] = useState([]);

  useEffect(() => {
    if (youthListByBatch) {
      setIssueFilterItems(
        youthListByBatch.map((skill: any) => {
          return { id: skill?.id, title: skill?.title };
        }),
      );
    }
  }, [youthListByBatch]);

  const issueCerrificate1 = useEventCallback((data: any) => {
    const issueData: ICertificateIssue = {
      batch_id: data.batch_id,
      certificate_id: certificateId as string,
      youth_id: data.youth_id
    }
    createCertificateIssue(issueData)
      .then(res => {
        if (isResponseSuccess(res)) {
          successStack(
            <IntlMessages
              id='common.subject_created_successfully'
              values={{ subject: <IntlMessages id='course.label' /> }}
            />,
          );
          refreshDataTable();
        }
      })
  })

  

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
        Header: messages['common.youths'],
        accessor: 'youth_id',
      },
      {
        Header: messages['menu.batch'],
        accessor: 'batch_title'
      },
      {
        Header: messages['course.label'],
        accessor: 'course_title'
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
                onClick={() => issueCerrificate1(data)}
                buttonText={messages['certificate.certificate_issue'] as string}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages, locale, issueFilterItems],
  );

  const { onFetchData, data, loading, pageCount, totalCount } =
    useReactTableFetchData({
      urlPath: API_COURSE_ENROLLMENTS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='certificate.certificate_issue' />
          </>
        }
        extra={[
          <CustomFilterableFormSelect
            key={1}
            required
            id='certificate_type'
            label={messages['certificate.certificate_type']}
            isLoading={isLoadingTypes}
            control={control}
            options={certificateTypes}
            optionValueProp={'id'}
            optionTitleProp={['title']}
            errorInstance={errors}
            onChange={changeCertificateTypeAction}
          />,
          <CustomFilterableFormSelect
            key={2}
            required
            id='certificate_Id'
            label={messages['common.certificate']}
            isLoading={isLoadingTypes}
            control={control}
            options={certificatesList}
            optionValueProp={'id'}
            optionTitleProp={['title_en', 'title']}
            errorInstance={errors}
            onChange={changeCertificatesAction}
          />
        ]}
      >
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={isToggleTable}
        />
      </PageBlock>
    </>
  );
};

export default CertificateIssuePage;
function refreshDataTable() {
  throw new Error('Function not implemented.');
}

