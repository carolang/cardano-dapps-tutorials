import { MeshWallet } from '@meshsdk/core';

class Player {
    constructor(wallet: MeshWallet, symbol: string) {
        this.wallet = wallet;
        this.symbol = symbol;
    }
}

export default Player;