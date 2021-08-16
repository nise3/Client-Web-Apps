import {Form, Input} from "antd";
import {ReactNode} from "react";

type Props = {
    name: string;
    label?: string;
    rules?: any;
    className?: string;
    size?: any;
    addonBefore?: ReactNode;
}

const FormInput = ({name, label, rules, className, addonBefore,size}: Props) => {
    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            className={className}
        >
            <Input
                size={size ? size : "large"}
                addonBefore = {addonBefore}/>
        </Form.Item>
    );
};

export default FormInput;