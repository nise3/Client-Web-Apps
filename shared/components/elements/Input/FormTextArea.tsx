import {Form, Input} from "antd";

type Props = {
    name: string;
    label?: string;
    rules?: any;
    className?: string;
}

const FormTextArea = ({name, label, rules, className}: Props) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            className={className}
        >
            <Input.TextArea size={"large"} />
        </Form.Item>

    );
};

export default FormTextArea;