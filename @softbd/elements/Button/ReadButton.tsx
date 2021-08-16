import {Button} from "antd";
import {EyeOutlined} from "@ant-design/icons";

interface Props {
    onClick: () => void;
    className?: string;
}

const ReadButton = ({onClick, className}: Props) => {
    return (
        <Button type="primary"
                icon={<EyeOutlined/>}
                onClick={onClick}
                className={className}
        >
            {'read'}
        </Button>

    );
};

export default ReadButton;