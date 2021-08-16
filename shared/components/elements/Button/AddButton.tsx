import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";

interface Props {
    onClick: () => void;
    className?: string;
}

const AddButton = ({onClick, className}: Props) => {
    //const {t} = useTranslation(['common']);
    return (
        <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={onClick}
            className={className}
        >
            {'add_new'}
        </Button>
    );
};

export default AddButton;