import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import IconDistrict from '../../../@softbd/icons/IconDistrict';
import {useRouter} from 'next/router';
import {deleteCertificate} from '../../../services/youthManagement/CertificateService';
import {isResponseSuccess} from '../../../@softbd/utilities/helpers';
import {useFetchCertificates} from '../../../services/CertificateAuthorityManagement/hooks';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_CERTIFICATES} from '../../../@softbd/common/apiRoutes';

const CertificateTemplatePage = () => {
  const {messages} = useIntl();
  const {successStack} = useNotiStack();
  const router = useRouter();

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenCertificateViewModal, setIsopenCertificateViewModal] =
    useState(false);
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
  // console.log('useFetchCertificates()', useFetchCertificates());

  // useEffect(() => {
  //   // console.log(certificates);
  // }, [certificates]);

  const openCertificateDetailsModal = useCallback((itemId: number) => {
    setIsopenCertificateViewModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeCertificateDetailsModal = useCallback(() => {
    setIsopenCertificateViewModal(false);
  }, []);

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

      // refreshDataTable();
    }
  };

  // const refreshDataTable = useCallback(() => mutateCertificates(), []);

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
          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() => openCertificateDetailsModal(data.id)}
              />
              <EditButton
                onClick={() => openCertificateAddUpdateView(data.id)}
              />
              <DeleteButton
                deleteAction={() => deleteCertificateTemplate(data.id)}
                deleteTitle='Are you sure?'
              />
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
          loading={loading}
          skipDefaultFilter={true}
        />
      </PageBlock>
    </>
  );
};

export default CertificateTemplatePage;
