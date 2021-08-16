import {useEffect, useState} from "react";
import DetailsInputView from "../../utilities/DetailsInputView";
import {getInstitute} from "../../../../services/instituteManagement/InstituteService";
import CustomModal from "../../elements/CustomModal";
import {Col, Row} from "antd";

type Props = {
    instituteId: number | null;
    isOpenDetailsModal: boolean;
    closeDetailsModal: any;
    openAddEditModal: any;
}

const InstituteDetailsPopup = ({instituteId, isOpenDetailsModal, closeDetailsModal, openAddEditModal}: Props) => {

    const [institute, setInstitute] = useState<any>(null);

    useEffect(() => {
        if (instituteId) {
            setInstituteState(instituteId);
        }
    }, [instituteId]);

    const setInstituteState = async (instituteId: number) => {
        let institute = await getInstitute(instituteId);
        if (institute) {
            setInstitute(institute);
        }
    }

    return (
        <>
            <CustomModal
                title={'details'}
                visible={isOpenDetailsModal}
                okText={'edit_button_label'}
                onCancel={closeDetailsModal}
                onOk={() => {
                    closeDetailsModal();
                    openAddEditModal(institute.id);
                }}
                width={1000}
            >
                <Row gutter={12}>
                    <Col span={12}>
                        <DetailsInputView label={'title_en'} value={institute?.title_en}/>
                    </Col>
                    <Col span={12}>
                        <DetailsInputView label={'title_bn'} value={institute?.title_bn}/>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:code'} value={institute?.code}/>
                    </Col>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:domain'} value={institute?.domain}/>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:primary_phone'} value={institute?.primary_phone}/>
                    </Col>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:phone_numbers'} value={institute?.phone_numbers}/>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:primary_mobile'} value={institute?.primary_mobile}/>
                    </Col>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:mobile_numbers'} value={institute?.mobile_numbers}/>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <DetailsInputView label={'address'} value={institute?.address}/>
                    </Col>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:google_map_source'} value={institute?.google_map_source}/>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <DetailsInputView label={'institutes:logo'} value={institute?.logo}/>
                    </Col>
                    <Col span={12}>
                        <DetailsInputView label={'active_status'} value={institute?.row_status == 1 ? "Active" : "Inactive"}/>
                    </Col>
                </Row>
            </CustomModal>
        </>
    );
}
export default InstituteDetailsPopup;