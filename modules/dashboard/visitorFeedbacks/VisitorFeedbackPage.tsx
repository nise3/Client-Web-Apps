import React, {useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconVisitorFeedback from '../../../@softbd/icons/IconVisitorFeedback';
import {useFetchVisitorFeedbacks} from '../../../services/cmsManagement/hooks';

const VisitorFeedbackPage = () => {
  const {messages} = useIntl();
  const [visitorFeedbackFilters] = useState({});
  const {data: visitorFeedbacks, isLoading}: any = useFetchVisitorFeedbacks(
    visitorFeedbackFilters,
  );

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
        accessor: 'name',
        isVisible: false,
      },
      {
        Header: messages['common.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['common.email'],
        accessor: 'email',
        isVisible: false,
      },
      {
        Header: messages['common.address'],
        accessor: 'address',
        isVisible: false,
      },
      {
        Header: messages['common.comment'],
        accessor: 'comment',
      },
      {
        Header: messages['common.achieved_at'],
        accessor: 'achieved_at',
        isVisible: false,
      },
      {
        Header: messages['institute.label'],
        accessor: 'institute_title',
        isVisible: false,
      },
      {
        Header: messages['organization.label'],
        accessor: 'organization_title',
        isVisible: false,
      },
    ],
    [messages],
  );

  return (
    <>
      <PageBlock
        title={
          <>
            <IconVisitorFeedback /> <IntlMessages id='visitor_feedback.label' />
          </>
        }>
        <ReactTable
          columns={columns}
          data={visitorFeedbacks || []}
          loading={isLoading}
        />
      </PageBlock>
    </>
  );
};

export default VisitorFeedbackPage;
