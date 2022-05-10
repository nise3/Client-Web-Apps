import React, {useCallback, useEffect, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_BRANCHES, API_CERTIFICATES_ISSUE} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import BranchAddEditPopup from './BranchAddEditPopup';
import BranchDetailsPopup from './BranchDetailsPopup';
import CustomChipRowStatus from '../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus';

import IntlMessages from '../../../@crema/utility/IntlMessages';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {deleteBranch} from '../../../services/instituteManagement/BranchService';
import {
  getCalculatedSerialNo,
  isResponseSuccess,
} from '../../../@softbd/utilities/helpers';
import IconBranch from '../../../@softbd/icons/IconBranch';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {useFetchAllInstitutes} from '../../../services/instituteManagement/hooks';
import { FiUserCheck } from 'react-icons/fi';
import Link from 'next/link';

const CertificateIssuedPage = () => {
  const {messages, locale} = useIntl();
  const [isToggleTable, setIsToggleTable] = useState<boolean>(false);


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
        Header: messages['common.certificate'],
        accessor: 'certificate_id',
      },
      {
        Header: messages['common.youth_2'],
        accessor: 'youth_id',
      },
      {
        Header: messages['batches.label'],
        accessor: 'batch_id'
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

    useEffect(() => {
      console.log('inside effect', data);
      const youthid = data.map((item:any)=>item.youth_id)
      console.log('youth id', youthid);
    }, [data])

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
          toggleResetTable={isToggleTable}
        />
        
      </PageBlock>
    </>
  );
};

export default CertificateIssuedPage;
