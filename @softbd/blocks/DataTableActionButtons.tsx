import React, {ReactNode} from "react";
import {Space} from "antd";

type Props = {
    children: ReactNode;
}

const DataTableActionButtons = ({children}: Props) => {
    return (
        <>
            <Space>
                {children}
            </Space>
        </>
    );
};

export default DataTableActionButtons;