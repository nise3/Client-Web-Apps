import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_4IR_CERTIFICATE} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import FourIRCertificateManagementDetailsPopUp from './FourIRCertificateManagementDetailsPopUp';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
//import {useRouter} from 'next/router';

interface IFourIRAssessmentPage {
  fourIRInitiativeId: number;
}

const FourIRCertificateManagementPage = ({
  fourIRInitiativeId,
}: IFourIRAssessmentPage) => {
  const {messages, locale} = useIntl();

  //const router = useRouter();
  //const path = router.pathname;

  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  /** details modal */
  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
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
        Header: messages['certificate.certificate_title'],
        accessor: 'certificate_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['certificate.certificate_title_en'],
        accessor: 'certificate_title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      {
        Header: messages['common.type'],
        accessor: 'type',
      },
      {
        Header: messages['certificate.recipient_name'],
        accessor: 'recipient_name',
      },
      {
        Header: messages['common.date'],
        accessor: 'date',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />

              <Link
                href={`/certificate/certificate-view/${data.id}`}
                passHref={true}>
                <CommonButton
                  btnText='common.certificate_view'
                  startIcon={<FiUser style={{marginLeft: '5px'}} />}
                  style={{marginLeft: '10px'}}
                  variant='outlined'
                  color='primary'
                />
              </Link>

              <Link
                  href={`/batches/${data?.batch_id}/youths/youth-cv/${data?.youth_id}`}
                 // href={`${path}/youth-cv/${data?.youth_id}`} passHref={true}>
                >
                <CommonButton
                  btnText='common.download_label'
                  startIcon={<FiUser style={{marginLeft: '5px'}} />}
                  style={{marginTop: '10px'}}
                />
              </Link>
            </DatatableButtonGroup>
          );
        },
      },
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_4IR_CERTIFICATE + `/${fourIRInitiativeId}`,
      paramsValueModifier: (params: any) => {
        params['fourIrInitiativeId'] = fourIRInitiativeId;
        return params;
      },
    });

  console.log(data);

  return (
    <>
      <PageBlock
        title={
          <>
            <IconCourse /> <IntlMessages id='certification.label' />
          </>
        }>
        <ReactTable
          data={data}
          columns={columns}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />

        {isOpenDetailsModal && selectedItemId && (
          <FourIRCertificateManagementDetailsPopUp
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default FourIRCertificateManagementPage;
