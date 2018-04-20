import * as dbActions from './Actions';
import { Alert } from 'react-native';
import * as coins from 'hail/app/crypto/coins';
import { logger } from 'hail/app/utils/Logger.js';

/**
 *
 * @param {*} coin
 * @param {*} network
 * //Ethereum
 * @param {string} params.nonce must have 0x preceeding
 * @param {string} params.privateKey
 * @param {string} params.to destination address
 * @param {string} params.gasLimit must have 0x preceeding
 * @param {string} params.gasPrice must have 0x preceeding
 * @param {string} params.value must have 0x preceeding
 * @param {int} params.chainId EIP 155 chainId - mainnet: 1, ropsten: 3
 */
export function send(coin, params, network = 'main') {
    return coins[coin].send(params, network);
}

export function create(coin, network, name, walletType) {
    return dbActions.createWallet({
        ...createPrivateKeyPair(coin, walletType),
        coin,
        network,
        name,
        walletType
    });
}

export function estimateFee(coin, from, to, value) {
    return coins[coin].estimateFee(from, to, value);
}

export function createPrivateKeyPair(coin, walletType) {
    switch (walletType) {
        case 'HD':
            return coins[coin].generateHDWallet();
            break;
        case 'PAIR':
            return coins[coin].generateWallet();
            break;
        default:
            logger(0, 'createPrivateKeyPair switch failed because incorrect walletType');
    }
}

export function createPrivateKey() {}

export function createAddress() {}