import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import {useIntl} from 'react-intl';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import IconVisitorFeedback from '../../../@softbd/icons/IconVisitorFeedback';
import VisitorDetailsPopup from './VisitorDetailsPopup';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {API_VISITOR_FEEDBACKS} from '../../../@softbd/common/apiRoutes';

const VisitorFeedbackPage = () => {
  const {messages} = useIntl();

  const {
    onFetchData,
    data: visitorFeedbacks,
    loading,
    pageCount,
    totalCount,
  } = useReactTableFetchData({
    urlPath: API_VISITOR_FEEDBACKS,
  });

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const openDetailsModal = useCallback((itemId: number) => {
    setIsOpenDetailsModal(true);
    setSelectedItemId(itemId);
  }, []);

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

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
      },
      {
        Header: messages['common.comment'],
        accessor: 'comment',
      },
      {
        Header: messages['common.mobile'],
        accessor: 'mobile',
      },
      {
        Header: messages['common.email'],
        accessor: 'email',
        disableFilters: true,
      },
      {
        Header: messages['common.address'],
        accessor: 'address',
        isVisible: false,
        disableFilters: true,
      },

      {
        Header: messages['common.archived_at'],
        accessor: 'archived_at',
        filter: 'dateTimeFilter',
        isVisible: false,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return (
            <DatatableButtonGroup>
              <ReadButton onClick={() => openDetailsModal(data.id)} />
            </DatatableButtonGroup>
          );
        },
        sortable: false,
      },
    ],
    [messages],
  );

  let modifiedData = visitorFeedbacks?.map((feedback: any) => {
    let comment = feedback?.comment
      ? feedback?.comment.substr(0, 25) + '.....'
      : '';

    return {
      ...feedback,
      comment,
    };
  });

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
          data={modifiedData || []}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />
        {isOpenDetailsModal && selectedItemId && (
          <VisitorDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default VisitorFeedbackPage;
