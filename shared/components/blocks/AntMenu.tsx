import {useEffect} from "react";
import {Menu} from "antd";
import {useState} from "react";
import {MailOutlined, SettingOutlined} from "@ant-design/icons";
import Link from "next/link";
import {
    LINK_DISTRICT,
    LINK_DIVISION,
    LINK_PERMISSION,
    LINK_PERMISSION_GROUP,
    LINK_PERMISSION_SUB_GROUP,
    LINK_RANK_TYPES,
    LINK_RANKS,
    LINK_SERVICES,
    LINK_ROLE,
    LINK_USER,
    LINK_UPAZILA,
    LINK_JOB_SECTORS,
    LINK_OCCUPATIONS,
    LINK_SKILLS,
    LINK_ORGANIZATION_TYPES, LINK_ORGANOGRAM, LINK_INSTITUTES, LINK_BRANCHES, LINK_PROGRAMMES, LINK_COURSES,
} from "../../../common/constants";
import {useRouter} from "next/router";

const {SubMenu} = Menu;

export default function AntMenu({children}: any) {
    const router = useRouter();
    const [current, setCurrent] = useState<string>('');

    const handleClick = (e: any) => {
        setCurrent(e.key);
    }

    useEffect(() => {
        setCurrent(router.pathname);
    }, [router.pathname]);

    return (
        <>
            <Menu
                onClick={handleClick}
                defaultOpenKeys={['sub1']}
                selectedKeys={[current]}
                mode="inline"
            >
                <Menu.Item key="/dashboard" icon={<MailOutlined/>}>
                    <Link href={'/dashboard'} passHref>
                        Dashboard
                    </Link>
                </Menu.Item>

                <SubMenu key="sub1" icon={<MailOutlined/>} title="Navigation One">
                    <Menu.Item key='/dashboard/menu-builder'>
                        <Link href={'/dashboard/menu-builder'} passHref>
                            Menu Builder
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" icon={<SettingOutlined/>} title="User Management">
                    <Menu.Item key="13" icon={<SettingOutlined/>}>
                        <Link href={LINK_PERMISSION_GROUP} passHref>
                            Permission Group
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="14" icon={<SettingOutlined/>}>
                        <Link href={LINK_PERMISSION} passHref>
                            Permission
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="15" icon={<SettingOutlined/>}>
                        <Link href={LINK_PERMISSION_SUB_GROUP} passHref>
                            Permission Sub Group
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="16" icon={<SettingOutlined/>}>
                        <Link href={LINK_ROLE} passHref>
                            Role
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="17" icon={<SettingOutlined/>}>
                        <Link href={LINK_USER} passHref>
                            User
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub6" icon={<SettingOutlined/>} title="Location">
                    <Menu.Item key="18" icon={<SettingOutlined/>}>
                        <Link href={LINK_DIVISION} passHref>
                            Division
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="19" icon={<SettingOutlined/>}>
                        <Link href={LINK_DISTRICT} passHref>
                            District
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="20" icon={<SettingOutlined/>}>
                        <Link href={LINK_UPAZILA} passHref>
                            Upazila
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu key="sub7" icon={<SettingOutlined/>} title="Organization Management">
                    <Menu.Item key="25" icon={<SettingOutlined/>}>
                        <Link href={LINK_RANK_TYPES} passHref>
                            Rank Type
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="28" icon={<SettingOutlined/>}>
                        <Link href={LINK_RANKS} passHref>
                            Rank
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="29" icon={<SettingOutlined/>}>
                        <Link href={LINK_SERVICES} passHref>
                            Service
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="30" icon={<SettingOutlined/>}>
                        <Link href={LINK_JOB_SECTORS} passHref>
                            Job Sectors
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="31" icon={<SettingOutlined/>}>
                        <Link href={LINK_OCCUPATIONS} passHref>
                            Occupations
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="32" icon={<SettingOutlined/>}>
                        <Link href={LINK_SKILLS} passHref>
                            Skills
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="33" icon={<SettingOutlined/>}>
                        <Link href={LINK_ORGANIZATION_TYPES} passHref>
                            Organization Types
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="34" icon={<SettingOutlined/>}>
                        <Link href={LINK_ORGANOGRAM} passHref>
                            Organogram
                        </Link>
                    </Menu.Item>

                </SubMenu>
                <SubMenu key="sub8" icon={<SettingOutlined/>} title="Institute Management">
                    <Menu.Item key="41" icon={<SettingOutlined/>}>
                        <Link href={LINK_INSTITUTES} passHref>
                            Institutes
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="42" icon={<SettingOutlined/>}>
                        <Link href={LINK_PROGRAMMES} passHref>
                            Programmes
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="43" icon={<SettingOutlined/>}>
                        <Link href={LINK_BRANCHES} passHref>
                            Branches
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="44" icon={<SettingOutlined/>}>
                        <Link href={LINK_COURSES} passHref>
                            Courses
                        </Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </>
    );
}