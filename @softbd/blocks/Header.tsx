import React, {useEffect, useState} from "react";
import {Button, Dropdown, Menu, Popconfirm, Space} from "antd";
import {Header as AntHeader} from "antd/lib/layout/layout";
import {useRouter} from "next/router";
import {AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, LogoutOutlined} from "@ant-design/icons/lib/icons";
import Image from 'next/image';
import Avatar from "antd/lib/avatar/avatar";

const {SubMenu} = Menu;

const Header = () => {
    const router = useRouter();
    const [current, setCurrent] = useState<string>('');

    const handleClick = (e: any) => {
        setCurrent(e.key);
    }

    useEffect(() => {
        setCurrent(router.pathname);
    }, [router.pathname]);

    const menu = (
        <Menu onClick={handleClick}>
            <Menu.Item key="3" icon={<LogoutOutlined/>}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <AntHeader style={{position: 'fixed', zIndex: 1, width: '100%', background: '#fff'}}>
            <div className={'row'}>
                <div className={'col-2'}>
                    <div className={'logo'} style={{float: 'left', paddingTop: '5px', marginRight: '50px'}}>
                        <Image src={'/assets/svg/logo.svg'} width={'100'} height={'50'} alt={'logo'}/>
                    </div>
                </div>
                <div className={'col-7'}>
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                        <Menu.Item key="mail" icon={<MailOutlined/>}>
                            Navigation One
                        </Menu.Item>
                        <Menu.Item key="app" disabled icon={<AppstoreOutlined/>}>
                            Navigation Two
                        </Menu.Item>
                        <SubMenu key="SubMenu" icon={<SettingOutlined/>} title="Navigation Three - Submenu">
                            <Menu.ItemGroup title="Item 1">
                                <Menu.Item key="setting:1">Option 1</Menu.Item>
                                <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="Item 2">
                                <Menu.Item key="setting:3">Option 3</Menu.Item>
                                <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>
                        <Menu.Item key="alipay">
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                Navigation Four - Link
                            </a>
                        </Menu.Item>
                    </Menu>
                </div>
                <div className={'col-3'}>
                    <Space style={{float: 'right'}}>
                        <Popconfirm title="Change language to English?" okText="Yes" cancelText="No">
                            <Button>Bangla</Button>
                        </Popconfirm>

                        <Dropdown overlay={menu} trigger={['click']}>
                            <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined />}/>
                        </Dropdown>
                    </Space>
                </div>
            </div>
        </AntHeader>
    );
}

export default Header;