import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import DashboardPage from '../../../@softbd/layouts/hoc/DashboardPage';
import React from 'react';
import {useIntl} from 'react-intl';

const SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationPage =
  asyncComponent(
    () =>
      import(
        '../../../modules/dashboard/skillsDevelopmentTrainingActivitiesIncomeExpenditureInformation/SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationPage'
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
      <SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformationPage />
    </>
  );
});

// SkillsDevelopmentTrainingActivitiesIncomeExpenditureInformation
// skills-development-training-activities-income-expenditure-information
// skills_development_training_activities_income_expenditure_information
