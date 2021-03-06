import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useIntl } from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import { API_CERTIFICATES } from '../../../@softbd/common/apiRoutes';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import EditIcon from '@mui/icons-material/Edit';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import { getMomentDateFormat, isResponseSuccess } from '../../../@softbd/utilities/helpers';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import { deleteCertificate } from '../../../services/CertificateAuthorityManagement/CertificateService';
import { getAllBatches } from '../../../services/instituteManagement/BatchService';
import { ICertificateView } from '../../../shared/Interface/certificates';
import { CERTIFICATE_TYPE_LABEL, RESULT_TYPE } from './Constants';

const CertificateTemplatePage = () => {
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);
  const { messages } = useIntl();
  const { successStack, errorStack } = useNotiStack();
  const router = useRouter();

  const { onFetchData, data, loading, pageCount, totalCount } =
    useReactTableFetchData({
      urlPath: API_CERTIFICATES,
    });

  if (data) {
    data.map((e:ICertificateView) => {
      switch (e.result_type) {
        case RESULT_TYPE.COMPETENT:
          e.result_type_name = CERTIFICATE_TYPE_LABEL.COMPETENT;
          break;
        case RESULT_TYPE.NOT_COMPETENT:
          e.result_type_name = CERTIFICATE_TYPE_LABEL.NOT_COMPETENT;
          break;
        case RESULT_TYPE.GRADING:
          e.result_type_name = CERTIFICATE_TYPE_LABEL.GRADING;
          break;
        case RESULT_TYPE.MARKS:
          e.result_type_name = CERTIFICATE_TYPE_LABEL.MARKS;
          break;
        case RESULT_TYPE.PARTICIPATION:
          e.result_type_name = CERTIFICATE_TYPE_LABEL.PARTICIPATION;
          break;
        default:
          break;
      }
    })
  }

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
      errorStack(messages['certificate.certificate_added_alreadt_batch'])
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
        Header: messages['certificate.certificate_title'],
        accessor: 'title',
      },
      {
        Header: messages['common.result_type'],
        accessor: 'result_type_name',
      },
      {
        Header: messages['common.issue_date'],
        accessor: 'issued_at',
        Cell: (props: any) => {
          let data = props.row.original;
        return (
            <span>
              {getMomentDateFormat(
                data?.issued_at,
                'DD MMMM, YYYY',
              )}
            </span>
          );
        },
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
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
                    startIcon={<EditIcon style={{ marginLeft: '5px' }} />}
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
                  startIcon={<ContentCopyIcon style={{ marginLeft: '5px' }} />}
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
            <BookmarkAddedIcon /> <IntlMessages id='certificate_template.name_en' />
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
                  subject: messages['certificate_template.name_en'],
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
