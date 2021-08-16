import {Button} from "antd";
import {EditOutlined} from "@ant-design/icons";

interface Props {
    onClick: () => void;
    className?: string;
}

const EditButton = ({onClick, className}: Props) => {
    return (
        <Button
            type="dashed"
            icon={<EditOutlined/>}
            onClick={onClick}
            className={className}
        >
            {'edit_button_label'}
        </Button>

    );
};

export default EditButton;