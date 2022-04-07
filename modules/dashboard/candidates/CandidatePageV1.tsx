import React, {useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconJobSector from '../../../@softbd/icons/IconJobSector';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_GET_JOB_CANDIDATES} from '../../../@softbd/common/apiRoutes';
import {useRouter} from 'next/router';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';

const CandidatesPageV1 = () => {
  const {messages, locale} = useIntl();

  const router = useRouter();
  const {jobId} = router.query;

  const [isToggleTable] = useState<boolean>(false);

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_GET_JOB_CANDIDATES + `/${jobId}`,
    });

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
        Header: messages['youth.mobile'],
        accessor: 'youth_profile.mobile',
      },
      {
        Header: messages['youth.email'],
        accessor: 'youth_profile.email',
      },
      {
        Header: messages['common.expected_salary'],
        accessor: 'expected_salary',
      },
    ],
    [messages, locale],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconJobSector /> <IntlMessages id='common.candidates_list' />
          </>
        }>
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

export default CandidatesPageV1;
