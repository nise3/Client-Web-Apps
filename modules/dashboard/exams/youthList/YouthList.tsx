import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {Button} from '@mui/material';
import DatatableButtonGroup from '../../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import PageBlock from '../../../../@softbd/utilities/PageBlock';
import IconExaminee from '../../../../@softbd/icons/IconExaminee';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import ReactTable from '../../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../../@softbd/hooks/useReactTableFetchData';
import {API_EXAM_YOUTH_LIST} from '../../../../@softbd/common/apiRoutes';
import {Link} from '../../../../@softbd/elements/common';
import {useRouter} from 'next/router';
import {ArrowBack} from '@mui/icons-material';

const ExamineeListPage = () => {
  const {messages} = useIntl();
  const router = useRouter();
  const {examId} = router.query;

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_EXAM_YOUTH_LIST + '/' + examId,
    });

  const columns = useMemo(
    () => [
      {
        Header: '#',
        disableFilters: true,
        disableSortBy: true,
        Cell: (props: any) => {
          return props.row.index + 1;
        },
      },
      {
        Header: messages['common.name'],
        Cell: (props: any) => {
          let data = props.row.original;
          let youthProfle = data?.youth_profile;
          return youthProfle?.first_name + ' ' + youthProfle?.last_name;
        },
      },
      {
        Header: messages['common.mobile'],
        Cell: (props: any) => {
          let data = props.row.original;
          let youthProfle = data?.youth_profile;
          return youthProfle?.mobile;
        },
      },
      {
        Header: messages['common.email'],
        Cell: (props: any) => {
          let data = props.row.original;
          let youthProfile = data?.youth_profile;
          return youthProfile?.email;
        },
      },
      {
        Header: messages['common.obtained_mark'],
        accessor: 'marks_achieved',
      },
      ,
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          let examId = data?.exam_id;
          let youthId = data?.youth_id;

          return (
            <DatatableButtonGroup>
              {!data.auto_marking && (
                <Link href={`/exams/youth-list/${examId}/marking/${youthId}`}>
                  <Button
                    variant={'outlined'}
                    color={'primary'}
                    sx={{marginRight: '10px'}}>
                    {messages['common.marks_distribution']}
                  </Button>
                </Link>
              )}
              <Link href={`/exams/youth-list/${examId}/sheet/${youthId}`}>
                <Button variant={'outlined'} color={'primary'}>
                  {messages['common.answer_sheet']}
                </Button>
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
            <IconExaminee /> <IntlMessages id='examinee.label' />
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

export default ExamineeListPage;
