import {Layout} from 'antd';
import React, {useState} from 'react';
import AntMenu from "./AntMenu";
const {Sider} = Layout;

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const onCollapse = (collapsed: boolean) => {
        setCollapsed(collapsed);
    };

    return <Sider theme={'light'} collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <AntMenu/>
    </Sider>;
}

export default Sidebar;