import * as yup from 'yup';
import {Grid} from '@material-ui/core';
import {yupResolver} from '@hookform/resolvers/yup';
import {SubmitHandler, useForm} from 'react-hook-form';
import React, {FC, useEffect, useState} from 'react';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import CustomTextInput from '../../../@softbd/elements/input/CustomTextInput/CustomTextInput';
import {TEXT_REGEX_BANGLA} from '../../../@softbd/common/patternRegex';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import {useIntl} from 'react-intl';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import {
    createService,
    getService,
    updateService
} from "../../../services/organaizationManagement/OrganizationServiceService";
import FormRowStatus from "../../../@softbd/elements/input/FormRowStatus/FormRowStatus";
import IconService from "../../../@softbd/icons/IconService";

interface ServiceAddEditPopupProps {
    itemId: number | null;
    onClose: () => void;
    refreshDataTable: () => void;
}

const validationSchema = yup.object().shape({
    title_en: yup.string().trim().required('Enter title (En)'),
    title_bn: yup
        .string()
        .trim()
        .required('Enter title (Bn)')
        .matches(TEXT_REGEX_BANGLA, 'Enter valid text')
});

const initialValues = {
    title_en: '',
    title_bn: '',
    row_status: '1'
};

const ServiceAddEditPopup: FC<ServiceAddEditPopupProps> = ({
                                                               itemId,
                                                               refreshDataTable,
                                                               ...props
                                                           }) => {
    const {messages} = useIntl();
    const {successStack} = useNotiStack();
    const isEdit = itemId != null;
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const {
        register,
        reset,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
    } = useForm<Service>({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            if (isEdit && itemId) {
                let response = await getService(itemId);
                if (response) {
                    let {data: item} = response;
                    reset({
                        title_en: item?.title_en,
                        title_bn: item?.title_bn,
                        row_status: item?.row_status
                            ? String(item.row_status)
                            : initialValues.row_status,
                    });
                }

            } else {
                reset(initialValues);
            }
            setIsLoading(false);
        })();
    }, [itemId]);


    const onSubmit: SubmitHandler<Service> = async (data: Service) => {
        if (isEdit && itemId) {
            let response = await updateService(itemId, data);
            if (response) {
                successStack(
                    <IntlMessages
                        id='common.subject_updated_successfully'
                        values={{subject: <IntlMessages id='services.label'/>}}
                    />,
                );
                props.onClose();
                refreshDataTable();
            }
        } else {
            let response = await createService(data);
            if (response) {
                successStack(
                    <IntlMessages
                        id='common.subject_created_successfully'
                        values={{subject: <IntlMessages id='services.label'/>}}
                    />,
                );
                props.onClose();
                refreshDataTable();
            }
        }
    };

    return (
        <HookFormMuiModal
            {...props}
            open = {true}
            title={
                <>
                    <IconService/>
                    {isEdit ? (
                        <IntlMessages
                            id='common.edit'
                            values={{subject: <IntlMessages id='services.label'/>}}
                        />
                    ) : (
                        <IntlMessages
                            id='common.add_new'
                            values={{subject: <IntlMessages id='services.label'/>}}
                        />
                    )}
                </>
            }
            maxWidth={'sm'}
            handleSubmit={handleSubmit(onSubmit)}
            actions={
                <>
                    <CancelButton onClick={props.onClose} isLoading={isLoading}/>
                    <SubmitButton isSubmitting={isSubmitting} isLoading={isLoading}/>
                </>
            }>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <CustomTextInput
                        id='title_en'
                        label={messages['common.title_en']}
                        register={register}
                        errorInstance={errors}
                        isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CustomTextInput
                        id='title_bn'
                        label={messages['common.title_bn']}
                        register={register}
                        errorInstance={errors}
                        isLoading={isLoading}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormRowStatus
                        id='row_status'
                        control={control}
                        defaultValue={initialValues.row_status}
                        isLoading={isLoading}
                    />
                </Grid>
            </Grid>
        </HookFormMuiModal>
    );
};
export default ServiceAddEditPopup;
