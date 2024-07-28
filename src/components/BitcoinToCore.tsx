import { Steps, Typography, Button, theme, Spin, Input, List, Table } from "antd";
import { useContext, useEffect, useState } from "react";
import { useWeb3 } from "../providers/Web3Provider";
import startBridging from '../assets/start-bridging.svg';
import bitcoinWallet from '../assets/connect-bitcoin.svg';
import { ClientContext } from "../providers/ClientProvider";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = '0x6487FD18c2F99f35A096d570d9dCCa12641AD8dd';
const ABI = [
    "function receiveTransaction(string runeId, uint256 amount, address sourceAddress, string txIdentifier) payable",
    "function getTransactionsBySourceAddress(address sourceAddress) view returns (tuple(string runeId, uint256 amount, address sourceAddress, address destinationAddress, string txIdentifier, string sourceTxId, string targetTxId)[])"
];


const BitcoinToCore = () => {
    const [current, setCurrent] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [sendDetails, setSendDetails] = useState<any>({});
    const { address, connect, signer } = useWeb3();
    const [bridgeStatus, setBridgeStatus] = useState('');
    const { client } = useContext(ClientContext);
    const [connectedBitcoinAddress, setConnectedBitcoinAddress] = useState(null);

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
            minHeight: '360px',
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
        input: {
            marginBottom: 16,
            lineHeight: '40px',
            width: 200,
        },
        list: {
            width: '100%',
        },
    };
    useEffect(() => {
        if (address) {
            loadTransactions();
        }
    }, [address]);

    const loadTransactions = async () => {
        const provider = signer?.provider;
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const txs = await contract.getTransactionsBySourceAddress(address);
        setTransactions(txs);
    };

    const connectUnisat = async () => {
        try {
            await window.unisat.requestAccounts();
            const connectedAccount = await window.unisat.getAccounts();
            setConnectedBitcoinAddress(connectedAccount);
            next();
        } catch (error) {
            console.log('Connection failed:', error);
        }
    };

    const Step1 = ({ address, connect }) => (
        <div style={styles.centeredContainer}>
            <img src={address ? bitcoinWallet : startBridging} style={styles.image} alt="wallet connection" />
            <Typography.Title level={4}>{address ? 'Connect your Unisat Wallet to start bridging' : 'Connect to Core chain'}</Typography.Title>
            <Typography.Paragraph>{address ? 'After connecting to Unisat Wallet, you will be able to choose your runes to bridge to Core' : 'In order to start the bridge journey, you need to connect to CORE Chain first'}</Typography.Paragraph>
            <Button type="primary" size="large" onClick={address ? connectUnisat : connect}>
                {address ? 'Connect Unisat' : 'Connect to Core Chain'}
            </Button>
        </div>
    );

    const Step2 = () => {
        const [selectedRune, setSelectedRune] = useState(null);
        const [runes, setRunes] = useState([]);
        const [loading, setLoading] = useState(true);
        const [amount, setAmount] = useState('');

        useEffect(() => {
            if (connectedBitcoinAddress) {
                client.getBalances(connectedBitcoinAddress).then(data => {
                    setLoading(false);
                    setRunes(data);
                });
            }
        }, [connectedBitcoinAddress]);

        const showModal = (rune) => setSelectedRune(rune);

        const handleOk = () => {
            setSendDetails({
                amount,
                runeId: selectedRune.runeid,
                spacedRune: selectedRune.spacedRune,
                divisibility: selectedRune.divisibility,
            });
            next();
        };

        const handleCancel = () => {
            setAmount('');
            setSelectedRune(null);
        };

        if (loading) {
            return (
                <div style={{ width: '100%', padding: '20px 40px' }}>
                    <Spin />
                </div>
            );
        }

        return (
            <div style={{ width: '100%', padding: '20px 40px' }}>
                {selectedRune ? (
                    <div style={{ maxWidth: 400, margin: '0 auto' }}>
                        <Typography.Title level={4}>Enter amount to bridge for {selectedRune.spacedRune}</Typography.Title>
                        <Input
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />
                        <div style={styles.buttonsContainer}>
                            <Button type="primary" onClick={handleOk}>Continue</Button>
                            <Button onClick={handleCancel} style={styles.buttonMargin}>Cancel</Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <List
                            header="Select Runes to bridge"
                            itemLayout="horizontal"
                            dataSource={runes}
                            renderItem={(rune) => (
                                <List.Item actions={[<Button onClick={() => showModal(rune)}>Select</Button>]}>
                                    <List.Item.Meta
                                        style={{ textAlign: 'left' }}
                                        title={rune.spacedRune}
                                        description={`Available: ${rune.amount / 10 ** rune.divisibility}`}
                                    />
                                </List.Item>
                            )}
                            style={styles.list}
                        />
                        <div style={styles.buttonsContainer}>
                            <Button onClick={prev} style={styles.buttonMargin}>Go Back</Button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const Step3 = ({ runeDetails, address, onBridge }) => {
        switch (bridgeStatus) {
            case 'in-progress':
                return (
                    <div style={{ textAlign: 'center', fontSize: 18 }}>
                        <Typography.Title level={3}>Bridging in Progress</Typography.Title>
                        <Spin size="large" />
                        <Typography.Paragraph>Please wait while we process your transaction...</Typography.Paragraph>
                    </div>
                );
            case 'completed':
                return (
                    <div style={{ textAlign: 'center', fontSize: 18 }}>
                        <Typography.Title level={3}>Bridge Completed</Typography.Title>
                        <Typography.Paragraph>Your transaction has been successfully processed!</Typography.Paragraph>
                        <Button type="primary" onClick={() => setCurrent(0)}>Bridge other Runes</Button>
                    </div>
                );
            default:
                return (
                    <div style={{ textAlign: 'left', fontSize: 18 }}>
                        <Typography.Title level={3}>Summary</Typography.Title>
                        <Typography.Paragraph><strong>Rune Name:</strong> {runeDetails.spacedRune}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Rune ID:</strong> {runeDetails.runeId}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Amount:</strong> {runeDetails.amount}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Recipient Address:</strong> {address}</Typography.Paragraph>
                        <Typography.Paragraph><strong>Fee:</strong> 0.5 CORE</Typography.Paragraph>
                        <div style={styles.buttonsContainer}>
                            <Button onClick={prev} style={styles.buttonMargin}>Go Back</Button>
                            <Button type="primary" onClick={onBridge}>Bridge</Button>
                        </div>
                    </div>
                );
        }
    
    }
    const generateRandomString = (length = 5) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
    };

    const startBridge = async () => {
        setBridgeStatus('in-progress');
        if (signer) {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            const randomTxId = generateRandomString();
            try {
                const tx = await contract.receiveTransaction(sendDetails.runeId, sendDetails.amount, address, randomTxId, {
                    value: ethers.parseEther("0.5"),
                    gasLimit: 0x100000,
                });
                console.log("Transaction sent:", tx);
                await tx.wait();
                const result = await window.unisat.sendRunes('bc1q2fh4s7p5r8qgmm7f430dzyrravd8hgh5atjtfk', sendDetails.runeId, (sendDetails.amount * 10 ** sendDetails.divisibility).toString());
                client.reportTx(result, randomTxId);
                setBridgeStatus('completed');
                loadTransactions();
                console.log("Transaction confirmed:", tx);
            } catch (error) {
                console.error("Transaction failed:", error);
            }
        }
    };

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
            content: <Step3 runeDetails={sendDetails} address={address} onBridge={startBridge} />,
        },
    ];

    const next = () => setCurrent(current + 1);
    const prev = () => setCurrent(current - 1);

    const columns = [
        { title: 'Rune ID', dataIndex: 'runeId', key: 'runeId' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (amount) => amount.toString() },
        { title: 'Transaction ID', dataIndex: 'txIdentifier', key: 'txIdentifier'},
        { title: 'Source Tx ID', dataIndex: 'sourceTxId', key: 'sourceTxId' },
        { title: 'Target Tx ID', dataIndex: 'targetTxId', key: 'targetTxId' },
    ];

    return (
        <>
            <Steps current={current} items={steps.map(item => ({ key: item.title, title: item.title }))} style={styles.stepsContainer} />
            <div style={styles.contentStyle}>{steps[current].content}</div>
            <div>
                <h2 style={{ marginTop: 40}}>Transactions for {address}</h2>
                {transactions.length > 0 ? (
                    <Table dataSource={transactions} columns={columns} rowKey={(record) => record.txIdentifier} />
                ) : (
                    <p>No transactions found for this address.</p>
                )}
            </div>
        </>
    );
};

export default BitcoinToCore;
