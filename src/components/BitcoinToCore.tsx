import { Steps, Typography, Button, theme, message } from "antd";
import { useState } from "react";

const BitcoinToCore = () => {
    const [current, setCurrent] = useState(0);
    const { token } = theme.useToken();

    const steps = [
        {
          title: 'Connect',
          content: <Typography.Title>Step 1 Placeholder</Typography.Title>,
        },
        {
          title: 'Select Runes',
          content: <Typography.Title>Step 2 Placeholder</Typography.Title>,
        },
        {
          title: 'Bridge',
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

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            <Steps current={current} items={items} style={{ marginTop: 20 }}/>
            <div style={contentStyle}>{steps[current].content}</div>
        </>
    );
};

export default BitcoinToCore;
