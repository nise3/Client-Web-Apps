import React, {useMemo} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconBranch from '../../../@softbd/icons/IconBranch';
import {API_COURSE_ENROLLMENTS} from '../../../@softbd/common/apiRoutes';

interface Props {
  fourIRInitiativeId: number;
  setSelectedCourseId: any;
}

const FourIREnrollmentApprovalPage = ({
  fourIRInitiativeId,
  setSelectedCourseId,
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
        Header: messages['applicationManagement.courseTitle'],
        accessor: 'course_title',
      },

      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let item = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton
                onClick={() => setSelectedCourseId(item.id as number)}
              />
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
      urlPath: API_COURSE_ENROLLMENTS,
    });

  return (
    <>
      <div>Course list</div>
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
