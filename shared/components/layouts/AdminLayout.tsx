import React from "react";
import Nprogress from "../utilities/Nprogress";
import {Layout} from 'antd';
import Sidebar from "../blocks/Sidebar";
import Header from "../blocks/Header";
import Footer from "../blocks/Footer";
import {TAdminLayoutProps} from "./typings";
const {Content: AntContent} = Layout;

export default function AdminLayout({children}: TAdminLayoutProps) {
    return (
        <>
            <Nprogress/>
            <Layout>
                <Header />
                <Layout style={{marginTop: '65px'}}>
                    <Sidebar />
                    <Layout>
                        <AntContent style={{margin: '10px', minHeight: '90vh'}}>
                            {children}
                        </AntContent>
                        <Footer />
                    </Layout>
                </Layout>
            </Layout>
        </>
    );
}