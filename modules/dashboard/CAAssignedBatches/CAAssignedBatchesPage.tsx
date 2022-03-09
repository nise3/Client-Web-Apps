import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_RTO_BATCH} from '../../../@softbd/common/apiRoutes';
import IconBatch from '../../../@softbd/icons/IconBatch';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUserCheck} from 'react-icons/fi';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';

const CAAssignedBatchesPage = () => {
  const {messages, locale} = useIntl();
  const router = useRouter();
  const path = router.pathname;
  const authUser = useAuthUser<CommonAuthUser>();
  console.log('authUser now : ', authUser);

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
      /*{
        Header: messages['rto.name'],
        accessor: 'rto_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.number_of_youth'],
        accessor: 'number_of_youths',
      },*/
      {
        Header: messages['rpl_sector.label'],
        accessor: 'rpl_sector_title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['rpl_occupation.label'],
        accessor: 'rpl_occupation_title',
        isVisible: locale == LocaleLanguage.BN,
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <Link href={`${path}/${data?.id}/youths`} passHref={true}>
                <CommonButton
                  btnText='youth.label'
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
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_RTO_BATCH,
      paramsValueModifier: (params: any) => {
        if (authUser?.institute_id)
          params['institute_id'] = authUser?.institute_id;
        return params;
      },
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBatch /> <IntlMessages id='batches.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />
      </PageBlock>
    </>
  );
};

export default CAAssignedBatchesPage;
