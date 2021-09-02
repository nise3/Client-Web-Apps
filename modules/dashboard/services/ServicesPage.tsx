import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {useIntl} from 'react-intl';
import DatatableButtonGroup from '../../../@softbd/elements/button/DatatableButtonGroup/DatatableButtonGroup';
import ReadButton from '../../../@softbd/elements/button/ReadButton/ReadButton';
import EditButton from '../../../@softbd/elements/button/EditButton/EditButton';
import DeleteButton from '../../../@softbd/elements/button/DeleteButton/DeleteButton';
import PageBlock from '../../../@softbd/utilities/PageBlock';
import AddButton from '../../../@softbd/elements/button/AddButton/AddButton';
import ReactTable from '../../../@softbd/table/Table/ReactTable';
import {
    deleteService,
    getAllServices,
} from '../../../services/organaizationManagement/OrganizationServiceService';
import ServiceAddEditPopup from './ServiceAddEditPopup';
import ServiceDetailsPopup from './ServiceDetailsPopup';
import IntlMessages from '../../../@crema/utility/IntlMessages';
import CustomChipRowStatus from "../../../@softbd/elements/display/CustomChipRowStatus/CustomChipRowStatus";
import useNotiStack from "../../../@softbd/hooks/useNotifyStack";
import IconService from "../../../@softbd/icons/IconService";

const ServicesPage = () => {
    const {messages} = useIntl();
    const {successStack} = useNotiStack();
    const [serviceId, setServiceId] = useState<number | null>(null);
    const [isOpenAddEditModal, setIsOpenAddEditModal] = useState(false);
    const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
    const [services, setServices] = useState<Array<Service>>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            await loadServicesData();
        })();
    }, []);

    const loadServicesData = async () => {
        setIsLoading(true);
        let services = await getAllServices();
        if(services) setServices(services);
        setIsLoading(false);
    };

    const closeAddEditModal = useCallback(() => {
        setIsOpenAddEditModal(false);
        setServiceId(null);
    }, []);

    const openAddEditModal = useCallback((serviceId: number | null = null) => {
        setIsOpenDetailsModal(false);
        setIsOpenAddEditModal(true);
        setServiceId(serviceId);
    }, []);

    const openDetailsModal = useCallback(
        (serviceId: number) => {
            setIsOpenDetailsModal(true);
            setServiceId(serviceId);
        },
        [serviceId],
    );

    const closeDetailsModal = useCallback(() => {
        setIsOpenDetailsModal(false);
    }, []);


    const deleteServiceItem = async (itemId: number) => {
        let response = await deleteService(itemId);
        if (response) {
            successStack(
                <IntlMessages
                    id='common.subject_deleted_successfully'
                    values={{subject: <IntlMessages id='job_sectors.label' />}}
                />,
            );
            await refreshDataTable();
        }
    };
    const refreshDataTable = useCallback(() => {
        (async () => {
            await loadServicesData();
        })();
    }, []);

    const columns = useMemo(() => [
        {
            Header: messages['common.id'],
            accessor: 'id',
            disableFilters: true,
            disableSortBy: true,
        },
        {
            Header: messages['common.title_en'],
            accessor: 'title_en',
        },
        {
            Header: messages['common.title_bn'],
            accessor: 'title_bn',
        },
        {
            Header: messages['common.status'],
            accessor: 'row_status',
            filter: 'rowStatusFilter',
            Cell: (props: any) => {
                let data = props.row.original;
                return <CustomChipRowStatus value={data?.row_status}/>;
            },
        },
        {
            Header: messages['common.actions'],
            Cell: (props: any) => {
                let data = props.row.original;
                return (
                    <DatatableButtonGroup>
                        <ReadButton onClick={() => openDetailsModal(data.id)}/>
                        <EditButton onClick={() => openAddEditModal(data.id)}/>
                        <DeleteButton
                            deleteAction={() => deleteServiceItem(data.id)}
                            deleteTitle='Are you sure?'
                        />
                    </DatatableButtonGroup>
                );
            },
            sortable: false,
        },
    ], []);
    return (
        <>
            <PageBlock
                title={
                    <>
                        <IconService/> <IntlMessages id='services.label'/>
                    </>
                }
                extra={[
                    <AddButton
                        key={1}
                        onClick={() => openAddEditModal(null)}
                        isLoading={isLoading}
                        tooltip={
                            <IntlMessages
                                id={'common.add_new'}
                                values={{
                                    subject: messages['services.label'],
                                }}
                            />
                        }
                    />,
                ]}>
                <ReactTable
                    columns={columns}
                    data={services || []}
                    loading={isLoading}
                    skipDefaultFilter={true}
                />
                {isOpenAddEditModal && (
                    <ServiceAddEditPopup
                        key={1}
                        onClose={closeAddEditModal}
                        itemId={serviceId}
                        refreshDataTable={refreshDataTable}
                    />
                )}

                {isOpenDetailsModal && (
                    <ServiceDetailsPopup
                        key={1}
                        itemId={serviceId}
                        onClose={closeDetailsModal}
                        openEditModal={openAddEditModal}
                    />
                )}
            </PageBlock>
        </>
    );
};

export default ServicesPage;
