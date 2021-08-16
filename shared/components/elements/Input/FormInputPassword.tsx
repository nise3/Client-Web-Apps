import {Form, Input} from "antd";

type Props = {
    name: string;
    label?: string;
    rules?: any;
    className?: string;
    dependencies?: any;
}

const FormInputPassword = ({name, label, rules, className,dependencies}: Props) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            className={className}
            hasFeedback
            dependencies = {dependencies}
        >
            <Input.Password size={"large"}/>
        </Form.Item>
    );
};

export default FormInputPassword;