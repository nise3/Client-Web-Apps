import {Col, Form, Row, Select} from "antd";
import {useEffect} from "react";
import FormInput from "../../elements/Input/FormInput";
import {
    createInstitute,
    getInstitute,
    updateInstitute
} from "../../../../services/instituteManagement/InstituteService";
import CustomModal from "../../elements/CustomModal";
import FormRowStatus from "../../elements/FormRowStatus";
import FormTextArea from "../../elements/Input/FormTextArea";
import {DOMAIN_REGEX, MOBILE_NUMBER_REGEX, TEXT_REGEX_BANGLA} from "../../../../common/patternRegex";

type Props = {
    instituteId: number | null;
    isOpenAddEditModal: boolean;
    closeAddEditModal: any;
    loadInstituteTableData: any;
}

const InstituteAddEditPopup = ({
                                   instituteId,
                                   isOpenAddEditModal,
                                   closeAddEditModal,
                                   loadInstituteTableData
                               }: Props) => {

    const isEdit = instituteId != null;
    const [form] = Form.useForm()
    //const {t} = useTranslation(['common', 'institutes']);
    const {Option} = Select;

    useEffect(() => {
        if (isEdit && instituteId) {
            setInstituteState(instituteId);
        } else {
            form.resetFields();
        }
    }, [instituteId]);

    const setInstituteState = async (instituteId: number) => {
        let institute = await getInstitute(instituteId);
        if (institute) {
            setFieldValues(institute);
        }
    }

    const setFieldValues = (data: Institute) => {
        form.setFieldsValue(
            {
                title_en: data.title_en,
                title_bn: data.title_bn,
                domain: data.domain,
                code: data.code,
                address: data.address,
                google_map_src: data.google_map_src,
                phone_numbers: data.phone_numbers,
                primary_mobile: data.primary_mobile,
                mobile_numbers: data.mobile_numbers,
                email: data.email,
                config: data.config,
                row_status: data.row_status
            }
        );
    };

    const onSubmit = async (data: Institute) => {
        if (isEdit && instituteId) {
            let response = await updateInstitute(instituteId, data);
            if (response) {
                //Toast.success(t('object_updated_successfully', {object: t('institute')}));
                closeAddEditModal();
                loadInstituteTableData();
            }
        } else {
            let response = await createInstitute(data);
            if (response) {
                //Toast.success(t('object_created_successfully', {object: t('institute')}));
                closeAddEditModal();
                loadInstituteTableData();
            }
        }
    };

    const selectBefore = (
        <Select defaultValue="http://" className="select-before">
            <Option value="http://">http://</Option>
            <Option value="https://">https://</Option>
        </Select>
    );

    const title = isEdit ? 'Edit Institute' : 'Add Institute'

    return (
        <>
            <CustomModal
                title={title}
                visible={isOpenAddEditModal}
                okText={isEdit ? 'Update': 'Create'}
                onCancel={closeAddEditModal}
                width={1000}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            onSubmit(values);
                        });
                }}
            >
                <Form layout="vertical" form={form} name="control-hooks" scrollToFirstError={true}>
                    <Row gutter={12}>
                        <Col span={12}>
                            <FormInput
                                name="title_en"
                                label={'title_en'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'this_field_required',
                                    }
                                ]}
                            />
                        </Col>
                        <Col span={12}>
                            <FormInput
                                name="title_bn"
                                label={'title_bn'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'this_field_required',
                                    },
                                    {
                                        pattern: TEXT_REGEX_BANGLA,
                                        message: "Format is wrong"
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <FormInput
                                name="code"
                                label={'institutes:code'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'this_field_required',
                                    }
                                ]}
                            />
                        </Col>
                        <Col span={12}>
                            <FormInput
                                name="domain"
                                label={'institutes:domain'}
                                addonBefore={selectBefore}
                                rules={[
                                    {
                                        required: true,
                                        message: 'this_field_required',
                                    }, {
                                        pattern: DOMAIN_REGEX,
                                        message: 'invalid_domain',
                                    },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            <FormInput
                                name="primary_phone"
                                label={'institutes:primary_phone'}
                                rules={[
                                    {
                                        pattern: MOBILE_NUMBER_REGEX,
                                        message: 'mobile_number_invalid',
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={12}>
                            <FormInput
                                name="primary_mobile"
                                label={'institutes:primary_mobile'}
                                rules={[
                                    {
                                        pattern: MOBILE_NUMBER_REGEX,
                                        message: 'mobile_number_invalid',
                                    },
                                ]}
                            />
                            {/*<FormInput*/}
                            {/*    name="phone_numbers"*/}
                            {/*    label={t('institutes:phone_numbers')}*/}
                            {/*    rules={[*/}
                            {/*        {*/}
                            {/*            pattern: MOBILE_NUMBER_REGEX,*/}
                            {/*            message: t('mobile_number_invalid'),*/}
                            {/*        },*/}
                            {/*    ]}*/}
                            {/*/>*/}
                        </Col>
                    </Row>
                    {/*<Row gutter={12}>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <FormInput*/}
                    {/*            name="primary_mobile"*/}
                    {/*            label={t('institutes:primary_mobile')}*/}
                    {/*            rules={[*/}
                    {/*                {*/}
                    {/*                    pattern: MOBILE_NUMBER_REGEX,*/}
                    {/*                    message: t('mobile_number_invalid'),*/}
                    {/*                },*/}
                    {/*            ]}*/}
                    {/*        />*/}
                    {/*    </Col>*/}
                    {/*    <Col span={12}>*/}
                    {/*        <FormInput*/}
                    {/*            name="mobile_numbers"*/}
                    {/*            label={t('institutes:mobile_numbers')}*/}
                    {/*            rules={[*/}
                    {/*                {*/}
                    {/*                    pattern: MOBILE_NUMBER_REGEX,*/}
                    {/*                    message: t('mobile_number_invalid'),*/}
                    {/*                },*/}
                    {/*            ]}*/}
                    {/*        />*/}
                    {/*    </Col>*/}
                    {/*</Row>*/}
                    <Row gutter={12}>
                        <Col span={12}>
                            <FormTextArea
                                name="address"
                                label={'address'}
                                rules={[
                                    {
                                        required: true,
                                        message: 'this_field_required',
                                    },
                                ]}
                            />
                        </Col>
                        <Col span={12}>
                            <FormTextArea
                                name="google_map_source"
                                label={'institutes:google_map_source'}
                            />
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col span={12}>
                            Logo
                        </Col>
                        <Col span={12}>
                            <FormRowStatus
                                name={"row_status"}
                                hidden={!isEdit}
                            />
                        </Col>
                    </Row>

                </Form>
            </CustomModal>
        </>
    );
}

export default InstituteAddEditPopup;
