import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {useMemo} from 'react';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_BATCHES} from '../../../@softbd/common/apiRoutes';

interface Props {
  fourIRInitiativeId: number;
  selectedCourseId: number;
}

const FourIREnrollmentApprovalPage = ({
  fourIRInitiativeId,
  selectedCourseId,
}: Props) => {
  const {messages, locale} = useIntl();

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
        Header: messages['4ir.skill_development_traning_center'],
        accessor: 'traning_center',
      },
      {
        Header: messages['4ir.skill_development_batch_start_date'],
        accessor: 'batch_start_date',
      },
      {
        Header: messages['4ir.skill_development_batch_end_date'],
        accessor: 'batch_end_date',
      },
      {
        Header: messages['4ir.skill_development_batch_number'],
        accessor: 'batch_number',
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => console.log(data.id)} />
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
      urlPath: API_BATCHES,
      paramsValueModifier: (params) => {
        params['course_id'] = selectedCourseId;
        return params;
      },
    });

  console.log('Batch list data : ', data);

  return (
    <>
      <div>Batch page</div>
      <PageBlock
        title={
          <>
            <IconBranch /> <IntlMessages id='4ir.enrollment_approval' />
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

export default FourIREnrollmentApprovalPage;
