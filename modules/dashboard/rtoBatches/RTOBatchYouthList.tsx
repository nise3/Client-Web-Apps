import React, {useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_RPL_APPLICATION} from '../../../@softbd/common/apiRoutes';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconUser from '../../../@softbd/icons/IconUser';
import Genders from '../../../@softbd/utilities/Genders';
import {useRouter} from 'next/router';
import Link from 'next/link';
import CommonButton from '../../../@softbd/elements/button/CommonButton/CommonButton';
import {FiUser} from 'react-icons/fi';
import {Button} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';

const RTOBatchYouthPage = () => {
  const {messages} = useIntl();

  const router = useRouter();
  const path = router.asPath;
  const {rtobatchId} = router.query;

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
        Header: messages['youth.fullName'],
        accessor: 'first_name',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          if (data?.youth_details) {
            return (
              data?.youth_details?.first_name +
              ' ' +
              data?.youth_details?.last_name
            );
          } else {
            return '';
          }
        },
      },

      {
        Header: messages['common.country'],
        accessor: 'target_country_title',
        disableFilters: true,
      },
      {
        Header: messages['common.score'],
        accessor: 'score',
        disableFilters: true,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <Link href={`${path}/youth-cv/${data?.youth_id}`} passHref={true}>
              <CommonButton
                btnText='applicationManagement.viewCV'
                startIcon={<FiUser style={{marginLeft: '5px'}} />}
                style={{marginTop: '10px'}}
              />
            </Link>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  // TODO:: Change the api route whenever its ready
  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_RPL_APPLICATION,
      paramsValueModifier: (params: any) => {
        if (rtobatchId) params['rto_batch_id'] = rtobatchId;
        return params;
      },
    });

  const filteredData = data.map((youth: any) => {
    let gender_label: string;
    if (youth?.gender === parseInt(Genders.MALE)) {
      gender_label = 'Male';
    } else if (youth?.gender === parseInt(Genders.FEMALE)) {
      gender_label = 'Female';
    } else {
      gender_label = 'Others';
    }
    return {
      ...youth,
      gender_label,
      full_name:
        youth?.youth_details?.first_name +
        ' ' +
        youth?.youth_details?.last_name,
      mobile: youth?.youth_details?.mobile,
    };
  });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconUser /> <IntlMessages id='youth.label' />
          </>
        }
        extra={[
          <Button
            key={1}
            variant={'contained'}
            color={'primary'}
            size={'small'}
            onClick={() => router.back()}>
            <ArrowBack />
            {messages['common.back']}
          </Button>,
        ]}>
        <ReactTable
          columns={columns}
          data={filteredData}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />
      </PageBlock>
    </>
  );
};

export default RTOBatchYouthPage;
