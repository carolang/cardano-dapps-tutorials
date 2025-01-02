import { MeshWallet } from '@meshsdk/core';
import { BlockfrostProvider } from '@meshsdk/core';

import { Component } from 'react';

import Player from "../domain/player"

// 0 -> preprod // 1 -> mainnet // 2 -> preview
const networkId = 0;
const blockfrostKey = "preprodg9Wz5eOsMXxvFOT7enJIGS2gS7aTWUmZ";

const blockchainProvider = new BlockfrostProvider(blockfrostKey);

class Game extends Component {
    constructor(props: any) {
        super(props);

        this.playerOne = new Player(this.brewWallet(), "X");
        this.playerTwo = new Player(this.brewWallet(), "O");
    }

    brewWallet(): MeshWallet {
        const words = MeshWallet.brew();
        return new MeshWallet({
            networkId: networkId,
            fetcher: blockchainProvider,
            submitter: blockchainProvider,
            key: {
              type: 'mnemonic',
              words: words,
            },
          });
    }
}

export default Game;