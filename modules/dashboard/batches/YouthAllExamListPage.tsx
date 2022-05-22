import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconBatch from '../../../@softbd/icons/IconBatch';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import React, {useMemo} from 'react';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import LocaleLanguage from '../../../@softbd/utilities/LocaleLanguage';
import {useIntl} from 'react-intl';
import {useRouter} from 'next/router';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {
  API_BATCHES,
  API_BATCHES_YOUTH_EXAMS,
} from '../../../@softbd/common/apiRoutes';

const YouthAllExamListPage = () => {
  const {messages, locale} = useIntl();

  const router = useRouter();
  const {batchId, youthId} = router.query;

  const columns = useMemo(
    () => [
      {
        Header: '#',
        Cell: (props: any) => {
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
        disableFilters: true,
        disableSortBy: true,
      },
      {
        Header: messages['common.title'],
        accessor: 'exam[0].title',
        isVisible: locale == LocaleLanguage.BN,
      },
      {
        Header: messages['common.title_en'],
        accessor: 'exam[0].title_en',
        isVisible: locale == LocaleLanguage.EN,
      },
      /*{
        Header: messages['common.total_marks'],
        accessor: 'exams.exams[0].total_marks',
        disableFilters: true,
      },*/
      /*{
        Header: messages['batches.total_and_available_seat'],
        accessor: 'number_of_seats',
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>{data?.available_seats + '/' + data?.number_of_seats}</span>
          );
        },
      },

      {
        Header: messages['batches.registration_start_date'],
        accessor: 'registration_start_date',
        disableFilters: true,
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>
              {getMomentDateFormat(
                data?.registration_start_date,
                'DD MMMM, YYYY',
              )}
            </span>
          );
        },
      },
      {
        Header: messages['batches.registration_end_date'],
        accessor: 'registration_end_date',
        disableFilters: true,
        filter: 'dateTimeFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <span>
              {getMomentDateFormat(
                data?.registration_end_date,
                'DD MMMM, YYYY',
              )}
            </span>
          );
        },
      },
      {
        Header: messages['batches.start_date'],
        accessor: 'batch_start_date',
        filter: 'dateTimeFilter',
        isVisible: false,
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return <span>{getMomentDateFormat(data?.batch_start_date)}</span>;
        },
      },
      {
        Header: messages['batches.end_date'],
        accessor: 'batch_end_date',
        filter: 'dateTimeFilter',
        isVisible: false,
        disableFilters: true,
        Cell: (props: any) => {
          let data = props.row.original;
          return <span>{getMomentDateFormat(data?.batch_end_date)}</span>;
        },
      },
      //download upload

      {
        Header: messages['common.status'],
        accessor: 'row_status',
        filter: 'rowStatusFilter',
        Cell: (props: any) => {
          let data = props.row.original;
          return <CustomChipRowStatus value={data?.row_status} />;
        },
      },*/
      /*{
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => console.log('read', data)} />
              <CommonButton
                key={3}
                onClick={() => console.log('common')}
                btnText={'batch.assign_exam'}
                variant={'outlined'}
                color={'primary'}
                style={{marginLeft: '5px'}}
                startIcon={<Add />}
              />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },*/
    ],
    [messages, locale],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_BATCHES + '/' + batchId + API_BATCHES_YOUTH_EXAMS,
      paramsValueModifier: (params: any) => {
        params['youth_id'] = youthId;
        return params;
      },
    });

  console.log('datas->', data.exams);

  return (
    <>
      <PageBlock
        title={
          <>
            <IconBatch /> <IntlMessages id='batches.label' />
          </>
        }
        extra={[
          <AddButton
            key={1}
            onClick={() => console.log('add->')}
            isLoading={loading}
            tooltip={
              <IntlMessages
                id={'common.add_new'}
                values={{
                  subject: messages['batches.label'],
                }}
              />
            }
          />,
        ]}>
        <ReactTable
          columns={columns}
          data={data.exams}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
          toggleResetTable={false}
        />
      </PageBlock>
    </>
  );
};

export default YouthAllExamListPage;
