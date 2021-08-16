import {Form, Radio, Space} from "antd";

type Props = {
    hidden?: boolean;
    name: string;
}

const FormRowStatus = ({hidden, name}: Props) => {

    return (
        <Form.Item name={name} label={'active_status'} hidden={hidden}>
            <Radio.Group>
                <Space direction="horizontal">
                    <Radio value={1}>{'active'}</Radio>
                    <Radio value={0}>{'inactive'}</Radio>
                </Space>
            </Radio.Group>
        </Form.Item>
    );
};

export default FormRowStatus;