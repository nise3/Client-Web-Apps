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
import SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationDetailsPopup from './SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationDetailsPopup';

const SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationPage =
  () => {
    const {messages} = useIntl();

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
            return <ReadButton onClick={() => openDetailsModal(data.id)} />;
          },
          sortable: false,
        },
      ],
      [messages],
    );

    //todo: urlPath must be given after getting api
    const {onFetchData, data, loading, pageCount, totalCount} =
      useReactTableFetchData({
        urlPath: '/rt',
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
            <Link
              key={selectedItemId}
              href={`/skills-development-training-activities-income-expenditure-information-create`}>
              <AddButton
                onClick={() => openDetailsModal(1)} //todo: item id must be integrated here after getting api
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
            </Link>,

            //todo: this will be removed after getting api..
            <AddButton
              key={Math.random()}
              onClick={() => openDetailsModal(1)}
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
            />,
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
            <SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationDetailsPopup
              key={1}
              itemId={selectedItemId}
              onClose={closeDetailsModal}
            />
          )}
        </PageBlock>
      </>
    );
  };

export default SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationPage;
