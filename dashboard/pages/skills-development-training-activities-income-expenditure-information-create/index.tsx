import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationCreatePage =
  asyncComponent(
    () =>
      import(
        '../../../modules/dashboard/skillsDevelopmentTrainingActivitiesIncomeExpenditureInformation/SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationCreatePage'
      ),
  );
export default DashboardPage(() => {
  const {messages} = useIntl();
  return (
    <>
      <PageMeta
        title={
          messages[
            'skills_development_training_activities_income_expenditure_information.label'
          ]
        }
      />
      <SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationCreatePage />
    </>
  );
});

// SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformation
// skills-development-training-activities-income-expenditure-information
// skills_development_training_activities_income_expenditure_information
