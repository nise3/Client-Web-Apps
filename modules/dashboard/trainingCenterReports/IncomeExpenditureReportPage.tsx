import {useIntl} from 'react-intl';
import React, {useCallback, useMemo, useState} from 'react';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import useReactTableFetchData from '../../../@softbd/hooks/useReactTableFetchData';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import IconUser from '../../../@softbd/icons/IconUser';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import {Link} from '../../../@softbd/elements/common';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {API_TRAINING_CENTERS_REPORTING_INCOME_EXPENDITURE} from '../../../@softbd/common/apiRoutes';
import IncomeExpenditureReportDetailsPopup from './IncomeExpenditureReportDetailsPopup';
import {useAuthUser} from '../../../@crema/utility/AppHooks';
import {CommonAuthUser} from '../../../redux/types/models/CommonAuthUser';
import {hasCreateTrainingCenterReportPermission} from '../../../services/instituteManagement/policies';
import {getCalculatedSerialNo} from '../../../@softbd/utilities/helpers';

const IncomeExpenditureReportPage = () => {
  const {messages} = useIntl();
  const authUser = useAuthUser<CommonAuthUser>();
  const hasCreatePermission = useMemo(
    () => hasCreateTrainingCenterReportPermission(authUser),
    [authUser],
  );
  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const openDetailsModal = useCallback((itemId: number | null = null) => {
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
        Header:
          messages[
            'skills_development_training_activities_income_expenditure_information.number_of_labs_or_training_rooms'
          ],
        accessor: 'number_of_labs_or_training_rooms',
        disableFilters: true,
      },
      {
        Header: messages['common.actions'],
        Cell: (props: any) => {
          let data = props.row.original;
          return <ReadButton onClick={() => openDetailsModal(data?.id)} />;
        },
        sortable: false,
      },
    ],
    [messages],
  );

  const {onFetchData, data, loading, pageCount, totalCount} =
    useReactTableFetchData({
      urlPath: API_TRAINING_CENTERS_REPORTING_INCOME_EXPENDITURE,
    });

  return (
    <>
      <PageBlock
        title={
          <>
            <IconUser />{' '}
            <IntlMessages id='skills_development_training_activities_income_expenditure_information.label' />
          </>
        }
        extra={[
          hasCreatePermission && (
            <Link
              key={1}
              href={
                '/training-center-reports/income-expenditure-report/create'
              }>
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
          <IncomeExpenditureReportDetailsPopup
            key={selectedItemId}
            itemId={selectedItemId}
            onClose={closeDetailsModal}
          />
        )}
      </PageBlock>
    </>
  );
};

export default IncomeExpenditureReportPage;
