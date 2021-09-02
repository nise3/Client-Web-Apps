import asyncComponent from '../../../@crema/utility/asyncComponent';
import PageMeta from '../../../@crema/core/PageMeta';
import AppPage from '../../../@crema/hoc/AppPage';
import React from 'react';
import {useIntl} from "react-intl";

const ServicesPage = asyncComponent(
    () => import('../../../modules/dashboard/services/ServicesPage'),
);
export default AppPage(() => {
    const {messages} = useIntl();
    return (
        <>
            <PageMeta title= {messages['services.label'] as string} />
            <ServicesPage />
        </>
    )

});
