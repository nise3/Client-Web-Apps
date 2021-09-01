import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';

const ServicesPage = asyncComponent(
    () => import('../../../modules/dashboard/services/ServicesPage'),
);
export default AppPage(() => (
    <>
        <PageMeta title='Services' />
        <ServicesPage />
    </>
));
