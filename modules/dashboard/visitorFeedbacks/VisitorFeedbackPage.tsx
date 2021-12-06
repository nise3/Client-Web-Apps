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
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';

const VisitorFeedbackPage = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();

  const {
    onFetchData,
    data: visitorFeedbacks,
    loading,
    pageCount,
    totalCount,
  } = useReactTableFetchData({
    urlPath: API_VISITOR_FEEDBACKS,
    paramsValueModifier: (params: any) => {
      if (authUser?.isInstituteUser)
        params['institute_id'] = authUser?.institute_id;
      else if (authUser?.isOrganizationUser)
        params['organization_id'] = authUser?.organization_id;
      return params;
    },
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
        isVisible: true,
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
        accessor: 'short_comment',
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
    let short_comment = feedback?.comment
      ? feedback?.comment.substr(0, 25) + '.....'
      : '';

    return {
      ...feedback,
      short_comment,
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
