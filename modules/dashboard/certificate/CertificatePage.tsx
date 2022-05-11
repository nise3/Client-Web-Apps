import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
// import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
// import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconDistrict from '../../../@softbd/icons/IconDistrict';
import {useRouter} from 'next/router';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_CERTIFICATES} from '../../../@softbd/common/apiRoutes';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUserCheck} from 'react-icons/fi';
import {deleteCertificate} from '../../../services/CertificateAuthorityManagement/CertificateService';

const CertificateTemplatePage = () => {
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
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
  const {onFetchData, data, loading, pageCount, totalCount} =
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
    const path = 'certificate/editor';
    const params = certificateId
      ? {pathname: path, certificateId}
      : {pathname: path};
    router.push(params).then(() => {});
  }, []);

  const deleteCertificateTemplate = async (certificateId: number) => {
    let response = await deleteCertificate(certificateId);
    if (isResponseSuccess(response)) {
      successStack(
        <IntlMessages
          id='common.subject_deleted_successfully'
          values={{subject: <IntlMessages id='certificate.label' />}}
        />,
      );

      refreshDataTable();
    }
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
                    startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                    style={{marginLeft: '10px'}}
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
                  startIcon={<FiUserCheck style={{marginLeft: '5px'}} />}
                  style={{marginLeft: '10px'}}
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
