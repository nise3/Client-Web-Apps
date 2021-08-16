import {Form, InputNumber} from "antd";
import {ReactNode} from "react";

type Props = {
    name: string;
    label?: string;
    rules?: any;
    className?: string;
    size?: any;
    addonBefore?: ReactNode;
    addonAfter?: string;
    min?: number;
}

const FormNumberInput = ({name, label, rules, className, addonBefore, size, addonAfter, min}: Props) => {

    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            className={className}
        >
            <div className="ant-input-group">
                <InputNumber min={min} size={size ? size : "large"}/>
                {addonAfter && (
                    <span className={'ant-input-group-addon'}>{addonAfter}</span>
                )}
            </div>
        </Form.Item>
    );
};

export default FormNumberInput;