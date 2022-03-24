import React, {useCallback, useMemo, useState} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import {Link} from '../../../@softbd/elements/common';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CombinedProgressReportDetailsPopup from './CombinedProgressReportDetailsPopup';
import {API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS} from '../../../@softbd/common/apiRoutes';

const CombinedProgressReportPage = () => {
  const {messages} = useIntl();
  const [itemId, setItemId] = useState<number | null>(null);
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);

  const openDetailsModal = useCallback(
    (itemId: number) => {
      setIsOpenDetailsModal(true);
      setItemId(itemId);
    },
    [itemId],
  );

  const closeDetailsModal = useCallback(() => {
    setIsOpenDetailsModal(false);
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: '#',
        accessor: 'id',
        disableFilters: true,
        disableSortBy: true,
      },

      {
        Header: messages['training_center_progress_report.total_members'],
        accessor: 'total_number_of_members',
      },

      {
        Header:
          messages[
            'training_center_progress_report.subscriptions_collected_so_far'
          ],
        accessor: 'subscriptions_collected_so_far',
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

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_TRAINING_CENTERS_REPORTING_COMBINED_PROGRESS,
    });
  return (
    <>
      <PageBlock
        title={
          <>
            <AssignmentTurnedInIcon />{' '}
            <IntlMessages id='training_center_progress_report_combined.label' />
          </>
        }
        extra={[
          <Link key={1} href={'/create'}>
            <AddButton
              onClick={() => {}}
              key={1}
              // isLoading={loading}
              tooltip={
                <IntlMessages
                  id={'common.add_new'}
                  values={{
                    subject:
                      messages[
                        'training_center_progress_report_combined.label'
                      ],
                  }}
                />
              }
            />
          </Link>,
        ]}>
        <ReactTable
          columns={columns}
          data={data}
          fetchData={onFetchData}
          loading={loading}
          pageCount={pageCount}
          totalCount={totalCount}
        />

        {isOpenDetailsModal && (
          <CombinedProgressReportDetailsPopup
            key={1}
            itemId={itemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default CombinedProgressReportPage;
