import { MeshWallet, Transaction, ForgeScript, BlockfrostProvider, } from '@meshsdk/core';
import { metadata } from './metadata.js';
import { recipients } from './recipients.js';
// 0 -> preprod // 1 -> mainnet // 2 -> preview
const networkId = 0;
const blockfrostKey = "preprodg9Wz5eOsMXxvFOT7enJIGS2gS7aTWUmZ";
const blockchainProvider = new BlockfrostProvider(blockfrostKey);
const wallet = new MeshWallet({
    networkId: networkId,
    fetcher: blockchainProvider,
    submitter: blockchainProvider,
    key: {
        type: 'mnemonic',
        words: [
            'stuff', 'apple', 'dish', 'language', 'icon', 'exit', 'despair', 'eagle',
            'dignity', 'poem', 'earth', 'fruit', 'blush', 'clay', 'toddler', 'confirm',
            'season', 'play', 'moral', 'cake', 'exchange', 'nerve', 'absorb', 'anger'
        ],
    },
});
const walletAddress = wallet.getUsedAddress().toBech32();
console.log("Operating from address:", walletAddress);
const forgingScript = ForgeScript.withOneSignature(walletAddress);
const tx = new Transaction({ initiator: wallet });
for (let recipient in recipients) {
    const recipientAddress = recipient;
    const assetName = recipients[recipient];
    const assetMetadata = metadata[assetName];
    const asset = {
        assetName: assetName,
        assetQuantity: '1',
        metadata: assetMetadata,
        label: '721',
        recipient: recipientAddress,
    };
    tx.mintAsset(forgingScript, asset).setChangeAddress(walletAddress);
}
const unsignedTx = await tx.build();
const signedTx = await wallet.signTx(unsignedTx, false);
const txHash = await wallet.submitTx(signedTx);
