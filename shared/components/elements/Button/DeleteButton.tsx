import {Button} from "antd";
import {DeleteOutlined} from "@ant-design/icons";

interface Props {
    onClick: () => void;
    className?: string;
}

const DeleteButton = ({onClick, className}: Props) => {

    return (
        <Button
            type={"dashed"}
            danger={true}
            icon={<DeleteOutlined/>}
            onClick={onClick}
            className={className}
        >
            {'delete_button_label'}
        </Button>

    );
};

export default DeleteButton;