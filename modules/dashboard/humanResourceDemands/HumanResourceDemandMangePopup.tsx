import React, {FC, useEffect, useMemo} from 'react';
import IconGallery from '../../../@softbd/icons/IconGallery';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CancelButton from '../../../@softbd/elements/button/CancelButton/CancelButton';
import HookFormMuiModal from '../../../@softbd/modals/HookFormMuiModal/HookFormMuiModal';
import {useIntl} from 'react-intl';
import {useFetchHrDemand, useFetchInstituteYouths} from '../../../services/instituteManagement/hooks';
import {updateHrDemand} from '../../../services/instituteManagement/HrDemandService';
import useSuccessMessage from '../../../@softbd/hooks/useSuccessMessage';
import {Grid} from '@mui/material';
import {SubmitHandler, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import yup from '../../../@softbd/libs/yup';
import {processServerSideErrors} from '../../../@softbd/utilities/validationErrorHandler';
import SubmitButton from '../../../@softbd/elements/button/SubmitButton/SubmitButton';
import useNotiStack from '../../../@softbd/hooks/useNotifyStack';
import FileUploadComponent from "../../filepond/FileUploadComponent";
import CustomFilterableFormSelect from "../../../@softbd/elements/input/CustomFilterableFormSelect";

interface HumanResourceDemandMangePopupProps {
    itemId: number | null;
    onClose: () => void;
    refreshDataTable: () => void;
}

const HumanResourceDemandMangePopup: FC<HumanResourceDemandMangePopupProps> = ({
                                                                                   itemId,
                                                                                   refreshDataTable,
                                                                                   onClose,
                                                                               }) => {
    const {messages} = useIntl();
    const {errorStack} = useNotiStack();

    const {updateSuccessMessage} = useSuccessMessage();
    const {data: itemData} = useFetchHrDemand(itemId);

    const {data:skills} = useFetchInstituteYouths(itemId);
    const validationSchema = useMemo(() => {
        return yup.object().shape({
            vacancy_provided_by_institute: yup
                .string()
                .trim()
                .required()
                .label(messages['common.vacancy_provided_by_institute'] as string),
        });
    }, [messages]);
    const {
        register,
        setError,
        setValue,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
    } = useForm<any>({
        resolver: yupResolver(validationSchema),
    });

    useEffect(()=>{

    },[])
    const onSubmit: SubmitHandler<any> = async (data: any) => {
        try {
            if (itemId) {
                await updateHrDemand(itemId, data);
                updateSuccessMessage('hr_demand.label');
            }
            onClose();
            refreshDataTable();
        } catch (error: any) {
            processServerSideErrors({error, setError, validationSchema, errorStack});
        }
    };

    return (
        <HookFormMuiModal
            open={true}
            title={
                <>
                    <IconGallery/>

                    <IntlMessages
                        id='common.manage'
                        values={{subject: <IntlMessages id='hr_demand.label'/>}}
                    />
                </>
            }
            onClose={onClose}
            handleSubmit={handleSubmit(onSubmit)}
            actions={
                <>
                    <CancelButton onClick={onClose}/>
                    <SubmitButton
                        label={messages['common.approve'] as string}
                        isSubmitting={isSubmitting}
                    />
                </>
            }>
            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                    <CustomFilterableFormSelect
                        id='skills'
                        label={messages['common.skills']}
                        isLoading={false}
                        control={control}
                        options={skills}
                        optionValueProp={'id'}
                        optionTitleProp={['title_en', 'title']}
                        errorInstance={errors}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FileUploadComponent
                        defaultFileUrl={itemData?.cv_links}
                        setValue={setValue}
                        id={'cv_links'}
                        register={register}
                        label={messages['common.cv_links']}
                        errorInstance={errors}
                        allowMultiple={true}
                    />

                </Grid>
            </Grid>
        </HookFormMuiModal>
    );
};

export default HumanResourceDemandMangePopup;
