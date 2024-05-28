import { secp256k1, schnorr } from '@noble/curves/secp256k1'
import { hexToBytes, bytesToHex } from '@noble/curves/abstract/utils'
import { HDKey } from '@scure/bip32'
import {
  generateMnemonic,
  mnemonicToSeedSync,
  validateMnemonic
} from '@scure/bip39'
import { bech32 } from 'bech32'
import { wordlist } from '@scure/bip39/wordlists/english'
import { 
  DERIVATION_PATH,
  PUBLIC_KEY_PREFIX,
  SECRET_KEY_PREFIX
} from './constants'

import { 
  ExtendedKeys,
  Key,
  Account,
} from './types'

export function accountFromSeedWords({
  mnemonic,
  passphrase,
  accountIndex = 0
} : {
  mnemonic: string,
  passphrase?: string,
  accountIndex?: number
}): Account {
  const root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  const seed = root.derive(`${DERIVATION_PATH}/${accountIndex}'/0/0`)
  const privateKeyHex = bytesToHex(seed.privateKey!)
  const publicKeyHex = bytesToHex(seed.publicKey!.slice(1))
  if (!privateKeyHex && !publicKeyHex) {
    throw new Error('could not derive key pair')
  }
  const { bech32PrivateKey } = getBech32PrivateKey({ privateKey: privateKeyHex })
  const { bech32PublicKey } = getBech32PublicKey({ publicKey: publicKeyHex })
  return {
    privateKey: { hex: privateKeyHex, bech32: bech32PrivateKey },
    publicKey: { hex: publicKeyHex, bech32: bech32PublicKey } 
  }
}

export function accountFromRandomKey(): Account {
  const privateKeyHex = bytesToHex(secp256k1.utils.randomPrivateKey())
  const publicKeyHex = bytesToHex(schnorr.getPublicKey(privateKeyHex))
  if (!privateKeyHex && !publicKeyHex) {
    throw new Error('could not derive key pair')
  }
  const { bech32PrivateKey } = getBech32PrivateKey({ privateKey: privateKeyHex })
  const { bech32PublicKey } = getBech32PublicKey({ publicKey: publicKeyHex })
  return {
    privateKey: { hex: privateKeyHex, bech32: bech32PrivateKey },
    publicKey: { hex: publicKeyHex, bech32: bech32PublicKey } 
  }
}

export function getPublicKey({ privateKey }: { privateKey: string }): {
  publicKey: Key
} {
  const publicKeyHex = bytesToHex(schnorr.getPublicKey(privateKey))
  if (!publicKeyHex) {
    throw new Error('could not generate public key')
  }
  const { bech32PublicKey } = getBech32PublicKey({ publicKey: publicKeyHex })
  return {
    publicKey: { hex: publicKeyHex, bech32: bech32PublicKey } 
  }
}

export function extendedKeysFromSeedWords({
  mnemonic,
  passphrase,
  extendedAccountIndex = 0
} : {
  mnemonic: string,
  passphrase?: string,
  extendedAccountIndex?: number
}): ExtendedKeys {
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  let seed = root.derive(`${DERIVATION_PATH}/${extendedAccountIndex}'`)
  let privateExtendedKey = seed.privateExtendedKey
  let publicExtendedKey = seed.publicExtendedKey
  if (!privateExtendedKey && !publicExtendedKey) throw new Error('could not derive extended key pair')
  return { privateExtendedKey, publicExtendedKey }
}

export function accountFromExtendedKey({ 
  base58Key,
  accountIndex = 0
} : {
  base58Key: string,
  accountIndex?: number
}): {
  privateKey?: Key,
  publicKey:  Key
} {
  let extendedKey = HDKey.fromExtendedKey(base58Key)
  let version = base58Key.slice(0, 4)
  let child = extendedKey.deriveChild(0).deriveChild(accountIndex)
  let publicKeyHex = bytesToHex(child.publicKey!.slice(1))
  if (!publicKeyHex) throw new Error('could not derive public key')
  const { bech32PublicKey } = getBech32PublicKey({ publicKey: publicKeyHex })
  if (version === 'xprv') {
    let privateKeyHex = bytesToHex(child.privateKey!)
    if (!privateKeyHex) throw new Error('could not derive private key')
    const { bech32PrivateKey } = getBech32PrivateKey({ privateKey: privateKeyHex })
    return { 
      privateKey: { hex: privateKeyHex, bech32: bech32PrivateKey },
      publicKey: { hex: publicKeyHex, bech32: bech32PublicKey } 
    } 
  }
  return { publicKey: { hex: publicKeyHex, bech32: bech32PublicKey } } 
}

function hexToBech32(key: string, prefix: string) {
  const words = bech32.toWords(hexToBytes(key))
  return bech32.encode(prefix, words)
}

export function getBech32PrivateKey({ privateKey }: { privateKey: string }): { bech32PrivateKey: string } {
  return {
    bech32PrivateKey: hexToBech32(privateKey, SECRET_KEY_PREFIX)
  }
}

export function getBech32PublicKey({ publicKey }: { publicKey: string }): { bech32PublicKey: string } {
  return {
    bech32PublicKey: hexToBech32(publicKey, PUBLIC_KEY_PREFIX)
  }
}

export function generateSeedWords(): { mnemonic: string } {
  return {
    mnemonic: generateMnemonic(wordlist)
  }
}

export function validateWords({ mnemonic }: { mnemonic: string }): { isMnemonicValid: boolean } {
  return {
    isMnemonicValid: validateMnemonic(mnemonic, wordlist)
  }
}
