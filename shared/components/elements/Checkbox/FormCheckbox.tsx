import {Checkbox, Form} from "antd";

type Props = {
    label:string;
    name:string;
}

const FormCheckbox = ({label,name}:Props) => {
    return (
        <Form.Item name={name} valuePropName="checked">
            <Checkbox>{label}</Checkbox>
        </Form.Item>
    );
};

export default FormCheckbox;