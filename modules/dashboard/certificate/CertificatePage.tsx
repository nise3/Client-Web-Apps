import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { FiUserCheck } from 'react-icons/fi';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { API_CERTIFICATES } from '../../../@softbd/common/apiRoutes';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
// import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
// import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import IconDistrict from '../../../@softbd/icons/IconDistrict';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import { isResponseSuccess } from '../../../@softbd/utilities/helpers';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import { deleteCertificate } from '../../../services/CertificateAuthorityManagement/CertificateService';
import { getAllBatches } from '../../../services/instituteManagement/BatchService';

const CertificateTemplatePage = () => {
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const { messages } = useIntl();
  const { successStack, errorStack } = useNotiStack();
  const router = useRouter();

  // const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  // const [isOpenCertificateViewModal, setIsopenCertificateViewModal] =
  //   useState(false);
  // const [cerificateFilter] = useState<any>({});

  // const {
  //   data: certificates,
  //   mutate: mutateCertificates,
  //   isLoading,
  // } = useFetchCertificates();
  const { onFetchData, data, loading, pageCount, totalCount } =
    useReactTableFetchData({
      urlPath: API_CERTIFICATES,
    });

  // const openCertificateDetailsModal = useCallback((itemId: number) => {
  //   setIsopenCertificateViewModal(true);
  //   setSelectedItemId(itemId);
  // }, []);

  // const closeCertificateDetailsModal = useCallback(() => {
  //   setIsopenCertificateViewModal(false);
  // }, []);

  const openCertificateAddUpdateView = useCallback((certificateId?: any) => {
    const path = '/certificate/editor';
    const params = certificateId
      ? { pathname: path, certificateId }
      : { pathname: path };
    router.push(params).then(() => { });
  }, []);

  const deleteCertificateTemplate = async (certificateId: number) => {

    // 
    const { data: batch } = await getAllBatches({ certificate_id: certificateId })
        // const { data: batch } = res;
        if (batch.length == 0) {
          let response = await deleteCertificate(certificateId);
          if (isResponseSuccess(response)) {
            successStack(
              <IntlMessages
                id='common.subject_deleted_successfully'
                values={{ subject: <IntlMessages id='certificate.label' /> }}
              />,
            );
            refreshDataTable();
          }
        } else {
          errorStack("Already added to batch!")
        }
    
    // console.log(batch)
    
   


  };

  const refreshDataTable = useCallback(() => {
    setIsToggleTable((previousToggle) => !previousToggle);
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return props.row.index + 1;
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title'],
        accessor: 'title',
      },
      {
        Header: messages['common.result_type'],
        accessor: 'result_type',
      },
      {
        Header: messages['common.purpose_name'],
        accessor: 'purpose_name',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          console.log(data);
          return (
            <DatatableButtonGroup>
              {/* <ReadButton
                onClick={() => openCertificateDetailsModal(data.id)}
              /> */}
              {/* <EditButton
                onClick={() => openCertificateAddUpdateView(data.id)}
              /> */}
              {!data.issued_at && (
                <Link
                  href={`/certificate/editor?certificateId=${data.id}`}
                  passHref={true}>
                  <CommonButton
                    btnText='common.edit_btn'
                    startIcon={<FiUserCheck style={{ marginLeft: '5px' }} />}
                    style={{ marginLeft: '10px' }}
                    variant='outlined'
                    color='primary'
                  />
                </Link>
              )}
              {!data.issued_at && (
                <DeleteButton
                  deleteAction={() => deleteCertificateTemplate(data.id)}
                  deleteTitle='Are you sure?'
                />
              )}
              <Link
                href={`/certificate/editor?certificateId=${data.id}&new=true`}
                passHref={true}>
                <CommonButton
                  btnText='common.duplicate'
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
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconDistrict /> <IntlMessages id='certificate.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => openCertificateAddUpdateView()}
            isLoading={false}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['certificate.label'],
                }}
              />
            }
          />,
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
      </PageBlock>
    </>
  );
};

export default CertificateTemplatePage;
