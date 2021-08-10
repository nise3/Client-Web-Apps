import React from 'react';
import AppPage from '../../@crema/hoc/AppPage'
import asyncComponent from "../../@crema/utility/asyncComponent";
import PageMeta from "../../@crema/core/PageMeta";

const HealthCare = asyncComponent(() => import('../../modules/dashboard/HealthCare'));
export default AppPage(() => <React.Fragment>
  <PageMeta title="Health Care | Crema " />
  <HealthCare/>
</React.Fragment>);
