import React, {ReactNode} from 'react';
import {Card, Col, Layout, PageHeader, Row} from "antd";

type TPageBlock = {
    bordered?: boolean
    children: ReactNode
    title?: ReactNode | string
    subTitle?: string
    onBack?: () => any
    extra?: Array<ReactNode>
}

const PageBlock = ({children, bordered = false, title, subTitle, onBack, extra}: TPageBlock) => {
    return <Layout style={{marginBottom: '10px'}}>
        <Row>
            <Col span={24}>
                {title
                    ? (<Card bordered={bordered} title={<PageHeader
                        onBack={onBack}
                        title={title}
                        subTitle={subTitle}
                        extra={extra}
                    >
                    </PageHeader>}>
                        {children}
                    </Card>)
                    : (<Card bordered={bordered}>
                        {children}
                    </Card>)}
            </Col>
        </Row>
    </Layout>;
}

export default PageBlock;