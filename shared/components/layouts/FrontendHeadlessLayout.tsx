import React from "react";
import Nprogress from "../utilities/Nprogress";
import {Layout} from "antd";
import Footer from "../blocks/Footer";
import {TFrontendHeadlessLayoutProps} from "./typings";

const {Content} = Layout;

export default function FrontendHeadlessLayout({children}: TFrontendHeadlessLayoutProps) {
    return (
        <>
            <Nprogress/>
            <Layout>
                <Content  style={{minHeight: '90vh'}}>
                    {children}
                </Content>
                <Footer/>
            </Layout>
        </>
    );
}