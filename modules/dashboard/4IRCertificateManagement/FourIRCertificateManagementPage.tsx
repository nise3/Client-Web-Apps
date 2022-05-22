import React, {useCallback, useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_4IR_CERTIFICATE} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {
  getCalculatedSerialNo,
  getMomentDateFormat,
} from '../../../@softbd/utilities/helpers';
import IconCourse from '../../../@softbd/icons/IconCourse';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {Typography} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';

const CERTIFICATE_TYPE_LABEL = {
  COMPETENT: 'Competent',
  NOT_COMPETENT: 'Not Competent',
  GRADING: 'Grading',
  MARKS: 'Marks',
  PARTICIPATION: 'Participation',
};

interface IFourIRAssessmentPage {
  fourIRInitiativeId: number;
}

const FourIRCertificateManagementPage = ({
  fourIRInitiativeId,
}: IFourIRAssessmentPage) => {
  const {messages, locale} = useIntl();

  const getCertificateType = useCallback((id: number): string => {
    switch (id) {
      case 1:
        return CERTIFICATE_TYPE_LABEL['COMPETENT'];
      case 2:
        return CERTIFICATE_TYPE_LABEL['NOT_COMPETENT'];
      case 3:
        return CERTIFICATE_TYPE_LABEL['GRADING'];
      case 4:
        return CERTIFICATE_TYPE_LABEL['MARKS'];
      case 5:
        return CERTIFICATE_TYPE_LABEL['PARTICIPATION'];
      default:
        return CERTIFICATE_TYPE_LABEL['COMPETENT'];
    }
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
        Header: messages['certificate.type'],
        Cell: (props: any) => {
          let data = props.row.original;

          return (
            <Typography>
              {getCertificateType(data?.certificate_result_type)}
            </Typography>
          );
        },
      },
      {
        Header: messages['certificate.recipient_name'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Typography>
              {`${data?.youth_profile?.first_name} ${data?.youth_profile?.last_name}`}
            </Typography>
          );
        },
      },
      {
        Header: messages['certificate.issued_date'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Typography>
              {getMomentDateFormat(data?.issued_at, 'DD-MM-YYYY')}
            </Typography>
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Link
                href={`/certificate/certificate-view/${data.id}`}
                passHref={true}>
                <CommonButton
                  btnText='certificate.view_and_download'
                  startIcon={<Visibility style={{marginLeft: '5px'}} />}
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
      </PageBlock>
    </>
  );
};

export default FourIRCertificateManagementPage;
