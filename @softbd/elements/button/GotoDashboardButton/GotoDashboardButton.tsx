import React, {useCallback} from 'react';
import Button from '@mui/material/Button';
import {ButtonProps} from '@mui/material/Button/Button';
import IntlMessages from '../../../../@crema/utility/IntlMessages';
import ButtonSkeleton from '../../display/skeleton/ButtonSkeleton/ButtonSkeleton';
import {useAuthUser} from '../../../../@crema/utility/AppHooks';
import Router from 'next/router';
import {Dashboard} from '@mui/icons-material';
import {adminDomain, niseDomain, youthDomain} from "../../../common/constants";

interface Props extends ButtonProps {
}

const GotoDashboardButton = ({className, ...extra}: Props) => {
    const authUser = useAuthUser();

    const onClickButton = useCallback(() => {
        if (authUser && authUser.isYouthUser) {
            Router.push(youthDomain());
        } else if (
            authUser &&
            (authUser.isSystemUser ||
                authUser.isInstituteUser ||
                authUser.isOrganizationUser)
        ) {
            Router.push(adminDomain());
        } else {
            Router.push(niseDomain());
        }
    }, [authUser]);

    return !authUser ? (
        <ButtonSkeleton/>
    ) : (
        <Button
            startIcon={<Dashboard/>}
            onClick={onClickButton}
            variant={'contained'}
            color={'primary'}
            {...extra}>
            <IntlMessages id='menu.dashboard'/>
        </Button>
    );
};

export default React.memo(GotoDashboardButton);
