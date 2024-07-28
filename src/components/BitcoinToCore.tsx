import { Steps, Typography, Button, message, theme } from "antd";
import { useState } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import startBridging from '../assets/start-bridging.svg';
import bitcoinWallet from '../assets/connect-bitcoin.svg';

const BitcoinToCore = () => {
    const [current, setCurrent] = useState(0);
    const { address, connect } = useWeb3();
    const { token } = theme.useToken();

    const styles: any = {
        centeredContainer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        },
        image: {
            width: 250,
        },
        contentStyle: {
            height: '360px',
            textAlign: 'center',
            color: token.colorTextTertiary,
            backgroundColor: token.colorFillAlter,
            borderRadius: token.borderRadiusLG,
            border: `1px dashed ${token.colorBorder}`,
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        stepsContainer: {
            marginTop: 20,
        },
        buttonsContainer: {
            marginTop: 24,
            textAlign: 'center',
        },
        buttonMargin: {
            margin: '0 8px',
        },
    };

    const Step1 = ({ address, connect }: { address: string | null; connect: () => void }) => (
        <div style={styles.centeredContainer}>
            <img src={address ? bitcoinWallet : startBridging} style={styles.image} />
            <Typography.Title level={4}>{address ? 'Connect your Unisat Wallet to start bridging' : 'Connect to Core chain'}</Typography.Title>
            <Typography.Paragraph>{address ? 'After connecting to Unisat Wallet, you will be able to choose your runes to bridge to Core' : 'In order to start the bridge journey, you need to connect to CORE Chain first'}</Typography.Paragraph>
            <Button type="primary" size="large" onClick={address ? () => {} : connect}>
                {address ? 'Connect Unisat' : 'Connect to Core Chain'}
            </Button>
        </div>
    );

    const Step2 = () => (
        <div style={styles.centeredContainer}>
            <Typography.Title>Step 2 Placeholder</Typography.Title>
        </div>
    );

    const Step3 = () => (
        <div style={styles.centeredContainer}>
            <Typography.Title>Step 3 Placeholder</Typography.Title>
        </div>
    );

    const steps = [
        {
            title: 'Connect BTC Wallet',
            content: <Step1 address={address} connect={connect} />,
        },
        {
            title: 'Choose Runes',
            content: <Step2 />,
        },
        {
            title: 'Bridge',
            content: <Step3 />,
        },
    ];

    const items = steps.map(item => ({ key: item.title, title: item.title }));

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    return (
        <>
            <Steps current={current} items={items} style={styles.stepsContainer} />
            <div style={styles.contentStyle}>{steps[current].content}</div>
        </>
    );
};

export default BitcoinToCore;
