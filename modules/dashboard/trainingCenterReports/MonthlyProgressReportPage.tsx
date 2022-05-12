import {useIntl} from 'react-intl';
import React, {useCallback, useMemo, useState} from 'react';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconUser from '../../../@softbd/icons/IconUser';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import SkillDevelopmentMonthlyProgressReportDetailsPopup from './MonthlyProgressReportDetailsPopup';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import {Link} from '../../../@softbd/elements/common';
import {API_TRAINING_CENTERS_REPORTING_PROGRESS} from '../../../@softbd/common/apiRoutes';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {hasCreateTrainingCenterReportPermission} from '../../../services/instituteManagement/policies';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';

const MonthlyProgressReportPage = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
  const hasCreatePermission = useMemo(
    () => hasCreateTrainingCenterReportPermission(authUser),
    [authUser],
  );
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
          return getCalculatedSerialNo(
            props.row.index,
            props.currentPageIndex,
            props.currentPageSize,
          );
        },
      },

      {
        Header:
          messages[
            'skills_development_training_activities_income_expenditure_information.trade_name'
          ],
        accessor: 'trade_name',
        disableFilters: true,
      },
      {
        Header: messages['dashboard.total_trainers'],
        accessor: 'number_of_trainers',
        disableFilters: true,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <ReadButton onClick={() => openDetailsModal(data.id)} />;
        },
        sortable: false,
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_TRAINING_CENTERS_REPORTING_PROGRESS,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconUser />{' '}
            <IntlMessages id='skill_development_monthly_progress_report.label' />
          </>
        }
        extra={[
          hasCreatePermission && (
            <Link
              key={selectedItemId}
              href={'/training-center-reports/monthly-progress-report/create'}>
              <AddButton
                onClick={() => {}}
                isLoading={loading}
                tooltip={
                  <IntlMessages
                    id={'common.add_new'}
                    values={{
                      subject:
                        messages[
                          'skills_development_training_activities_income_expenditure_information.label'
                        ],
                    }}
                  />
                }
              />
            </Link>
          ),
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
          <SkillDevelopmentMonthlyProgressReportDetailsPopup
            key={1}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
            openEditModal={openDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default MonthlyProgressReportPage;
