import Link from 'next/link';
import React, { useMemo } from 'react';
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


const CertificateIssuedPage = () => {
  const {messages, locale} = useIntl();
  // const [isToggleTable, setIsToggleTable] = useState<boolean>(false);


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
        Header: messages['common.title'],
        accessor: 'certificate_title',
      },
      {
        Header: messages['common.youth_2'],
        accessor: 'youth_profile.first_name',
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
        Header: messages['batches.label'],
        accessor: 'batch_title'
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Link href={`/certificate/certificate-view/${data.id}`} passHref={true}>
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
    });

    // useEffect(() => {
    //   console.log('inside effect', data);
    //   const youthid = data.map((item:any)=>item.youth_id)
    //   // getYouthProfiles(youthid).then(res=>{
    //   //   console.log('youth id', youthid, res);
    //   // })
      
    // }, [data])

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
