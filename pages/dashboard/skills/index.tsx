import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const SkillPage = asyncComponent(
  () => import('../../../modules/dashboard/skills/SkillPage'),
);
export default AppPage(() => (
  <>
    <PageMeta title='Skill' />
    <SkillPage />
  </>
));
