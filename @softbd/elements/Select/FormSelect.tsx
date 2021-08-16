import {Form, Select} from "antd";

type Props = {
    name: string;
    label: string;
    rules?: any;
    placeholder?: string;
    options?: Array<any>;
    className?: string;
    optionValueProp?: any;
    optionTitleProp?: Array<string>;
    onSelect?: any;
}

const FormSelect = ({
                        name,
                        label,
                        rules,
                        placeholder,
                        options,
                        className,
                        optionValueProp,
                        optionTitleProp,
                        onSelect
                    }: Props) => {

    const {Option} = Select;


    const getTitle = (option: any, optionTitleProp: Array<string> | undefined) => {
        let title = '';
        if (option && optionTitleProp) {
            let arr = [];
            for (let i = 0; i < optionTitleProp.length; i++) {
                arr.push(option[optionTitleProp[i]]);
            }
            title = arr.join('-');
        }

        return title;
    }

    let placeholderVal = placeholder ? placeholder : 'select';


    return (
        <Form.Item
            name={name}
            label={label}
            rules={rules}
            className={className}
        >
            <Select
                placeholder={placeholderVal}
                size={"large"}
                showSearch
                optionFilterProp="children"
                filterOption={(input: any, option: any) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                onSelect={onSelect}
            >
                {
                    (options || []).map((option: any, index: number) => {
                        let value = option[optionValueProp] && option[optionValueProp];
                        let title = getTitle(option, optionTitleProp);
                        return <Option key={index} value={value}>
                            {title}</Option>
                    })
                }
            </Select>
        </Form.Item>
    );
};

export default FormSelect;