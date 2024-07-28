import { Button, Col, message, Steps, theme, Typography } from "antd"
import { useState } from "react";

export const Home = () => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
  
    const next = () => {
      setCurrent(current + 1);
    };
  
    const prev = () => {
      setCurrent(current - 1);
    };
  
    const steps = [
        {
          title: 'Connect Bitcoin Wallet',
          content: <Typography.Title>Step 1 Placeholder</Typography.Title>,
        },
        {
          title: 'Bridge Your Runes',
          content: <Typography.Title>Step 2 Placeholder</Typography.Title>,
        },
        {
          title: 'Send Assets',
          content: <Typography.Title>Step 3 Placeholder</Typography.Title>,
        },
      ];
      const items = steps.map((item) => ({ key: item.title, title: item.title }));
      const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
      };
    
    
    return (
        <Col
            style={{ marginTop: 40}}
            xxl={{ span: 12, offset: 6 }}
            xl={{ span: 12, offset: 6 }}
            lg={{ span: 12, offset: 6 }}
            md={{ span: 24, offset: 0 }}
            sm={{ span: 24, offset: 0 }}
            xs={{ span: 24, offset: 0 }}
            
            >

            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
        </Col>
    )
}