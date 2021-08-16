import React from "react";
import Header from "../blocks/Header";
import Nprogress from "../utilities/Nprogress";
import {Layout} from "antd";
import Footer from "../blocks/Footer";
import {TFrontendLayoutProps} from "./typings";

const {Content} = Layout;

export default function FrontendLayout({children}: TFrontendLayoutProps) {
    return (
        <>
            <Nprogress/>
            <Layout>
                <Header/>
                <Content style={{marginTop: '65px', minHeight: '90vh'}}>
                    {children}
                </Content>
                <Footer/>
            </Layout>
        </>
    );
}