import {Modal} from "antd";

const ConfirmDialog =  (onConfirm: any) => {
        Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure to delete this?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: onConfirm
        });
}

export default ConfirmDialog;