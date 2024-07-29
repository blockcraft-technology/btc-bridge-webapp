import axios from "axios";

export class Client {
    private _baseUrl = `https://rune-bridge-api-ax9im.ondigitalocean.app`;

    async getBalances(address: string) {
        const { data } = await axios.get(`${this._baseUrl}/indexer/balances/${address}`);
        return data;
    }

    async reportTx(txHash: string, txId: string) {
        const { data } = await axios.post(`${this._baseUrl}/bridge`, {
            txId, 
            txHash,
        });
        return data;
    }
}