import { Steps, Typography, theme } from "antd";
// import { useState } from "react";

const CoreToBitcoin = () => {
    //const [current, setCurrent] = useState(0);
    const { token } = theme.useToken();

    const steps = [
        {
          title: 'Select wrapped Rune',
          content: <Typography.Title>Work in progress</Typography.Title>,
        },
        {
          title: 'Bridge',
          content: <Typography.Title>Work in progress</Typography.Title>,
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

    // const next = () => {
    //     setCurrent(current + 1);
    // };

    // const prev = () => {
    //     setCurrent(current - 1);
    // };

    return (
        <>
            <Steps current={0} items={items} style={{ marginTop: 20 }}/>
            <div style={contentStyle}>{steps[0].content}</div>
        </>
    );
};

export default CoreToBitcoin;
