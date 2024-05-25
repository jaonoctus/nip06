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
import { DERIVATION_PATH, PUBLIC_KEY_PREFIX, SECRET_KEY_PREFIX } from './constants'

type ExtendedKeys = {
  privateExtendedKey: string,
  publicExtendedKey: string
}
type PrivateKey = { hex: string, bech32: string }
type PublicKey = { hex: string, bech32: string }
type Account = {
  privateKey: PrivateKey,
  publicKey:  PublicKey
}

export function accountFromSeedWords(mnemonic: string, passphrase?: string, accountIndex = 0): Account {
  const root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  const seed = root.derive(`${DERIVATION_PATH}/${accountIndex}'/0/0`)
  const privateKeyHex = bytesToHex(seed.privateKey!)
  const publicKeyHex = bytesToHex(seed.publicKey!.slice(1))
  if (!privateKeyHex && !publicKeyHex) {
    throw new Error('could not derive key pair')
  }
  const privateKeyBech32 = getBech32PrivateKey(privateKeyHex)
  const publicKeyBech32 = getBech32PublicKey(publicKeyHex)
  return {
    privateKey: { hex: privateKeyHex, bech32: privateKeyBech32 },
    publicKey: { hex: publicKeyHex, bech32: publicKeyBech32 } 
  }
}

export function accountFromRandomKey(): Account {
  const privateKeyHex = bytesToHex(secp256k1.utils.randomPrivateKey())
  const publicKeyHex = bytesToHex(schnorr.getPublicKey(privateKeyHex))
  if (!privateKeyHex && !publicKeyHex) {
    throw new Error('could not derive key pair')
  }
  const privateKeyBech32 = getBech32PrivateKey(privateKeyHex)
  const publicKeyBech32 = getBech32PublicKey(publicKeyHex)
  return {
    privateKey: { hex: privateKeyHex, bech32: privateKeyBech32 },
    publicKey: { hex: publicKeyHex, bech32: publicKeyBech32 } 
  }
}

export function getPublicKey(privateKey: string): {
  publicKey: PublicKey
} {
  const publicKeyHex = bytesToHex(schnorr.getPublicKey(privateKey))
  if (!publicKeyHex) {
    throw new Error('could not generate public key')
  }
  const publicKeyBech32 = getBech32PublicKey(publicKeyHex)
  return {
    publicKey: { hex: publicKeyHex, bech32: publicKeyBech32 } 
  }
}

export function extendedKeysFromSeedWords(mnemonic: string, passphrase?: string, extendedAccountIndex = 0): ExtendedKeys {
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  let seed = root.derive(`${DERIVATION_PATH}/${extendedAccountIndex}'`)
  let privateExtendedKey = seed.privateExtendedKey
  let publicExtendedKey = seed.publicExtendedKey
  if (!privateExtendedKey && !publicExtendedKey) throw new Error('could not derive extended key pair')
  return { privateExtendedKey, publicExtendedKey }
}

export function accountFromExtendedKey(base58key: string, accountIndex = 0): {
  privateKey?: PrivateKey,
  publicKey:  PublicKey
} {
  let extendedKey = HDKey.fromExtendedKey(base58key)
  let version = base58key.slice(0, 4)
  let child = extendedKey.deriveChild(0).deriveChild(accountIndex)
  let publicKeyHex = bytesToHex(child.publicKey!.slice(1))
  if (!publicKeyHex) throw new Error('could not derive public key')
  let publicKeyBech32 = getBech32PublicKey(publicKeyHex)
  if (version === 'xprv') {
    let privateKeyHex = bytesToHex(child.privateKey!)
    if (!privateKeyHex) throw new Error('could not derive private key')
    let privateKeyBech32 = getBech32PrivateKey(privateKeyHex)
    return { 
      privateKey: { hex: privateKeyHex, bech32: privateKeyBech32 },
      publicKey: { hex: publicKeyHex, bech32: publicKeyBech32 } 
    } 
  }
  return { publicKey: { hex: publicKeyHex, bech32: publicKeyBech32 } } 
}

function hexToBech32(key: string, prefix: string) {
  const words = bech32.toWords(hexToBytes(key))
  return bech32.encode(prefix, words)
}

export function getBech32PrivateKey(privateKey: string): string {
  return hexToBech32(privateKey, SECRET_KEY_PREFIX)
}

export function getBech32PublicKey(publicKey: string): string {
  return hexToBech32(publicKey, PUBLIC_KEY_PREFIX)
}

export function generateSeedWords(): { mnemonic: string } {
  return {
    mnemonic: generateMnemonic(wordlist)
  }
}

export function validateWords(mnemonic: string): { isMnemonicValid: boolean } {
  return {
    isMnemonicValid: validateMnemonic(mnemonic, wordlist)
  }
}
