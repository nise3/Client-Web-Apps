import {Modal} from "antd";
import {ReactNode} from "react";

type Props = {
    title: string;
    visible: boolean;
    okText: string;
    onCancel: any;
    onOk: any;
    className?: string;
    children?: ReactNode;
    width?: number;
}

const CustomModal = ({title, visible, okText, onCancel, onOk, className, children, width}: Props) => {
    return (
        <Modal
            title={<div>{title}</div>}
            visible={visible}
            okText={okText}
            cancelText={'cancel'}
            destroyOnClose={true}
            onCancel={onCancel}
            onOk={onOk}
            className={className}
            centered
            width={width}
        >
            {children}
        </Modal>
    );
};

export default CustomModal;