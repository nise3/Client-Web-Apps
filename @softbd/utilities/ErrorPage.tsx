import React from 'react';
import {Button, Result} from 'antd';
import Router from 'next/router';

type TErrorPage = {
    statusCode: number | string
}
type ExceptionStatusType = 403 | 404 | 500 | '403' | '404' | '500';
const supportedCodes = [403, 404, 500, '403', '404', '500'];

const ErrorPage: React.FunctionComponent<TErrorPage> = ({statusCode}) => {
    const subTitle = statusCode == '403' ? 'Sorry, you are not authorized to access this page.'
        : (statusCode == '404' ? 'Sorry, the page you visited does not exist.' : 'Sorry, something went wrong.');

    const status = (supportedCodes.includes(statusCode) ? statusCode : 404) as ExceptionStatusType;

    return (
        <Result
            status={status}
            title={statusCode}
            subTitle={subTitle}
            extra={<Button type="primary" onClick={() => Router.push('/')}>Back Home</Button>}
        />
    );
}

export default ErrorPage;