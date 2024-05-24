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

export function privateKeyFromSeedWords(
  {
    mnemonic,
    passphrase
  }: { mnemonic: string, passphrase?: string }
): { privateKey: string } {
  const root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  const { privateKey } = root.derive(`${DERIVATION_PATH}/0'/0/0`)
  if (!privateKey) {
    throw new Error('could not derive private key')
  }
  return {
    privateKey: bytesToHex(privateKey)
  }
}

export function generatePrivateKey(): { privateKey: string } {
  return {
    privateKey: bytesToHex(secp256k1.utils.randomPrivateKey())
  }
}

export function getPublicKey({ privateKey }: { privateKey: string }): { publicKey: string } {
  return {
    publicKey: bytesToHex(schnorr.getPublicKey(privateKey))
  }
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

export function extendedPairFromSeedWords(mnemonic: string, passphrase?: string, extendedAccountIndex = 0): {
  privateExtendedKey: string,
  publicExtendedKey: string
} {
  let root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  let seed = root.derive(`${DERIVATION_PATH}/${extendedAccountIndex}'`)
  let privateExtendedKey = seed.privateExtendedKey
  let publicExtendedKey = seed.publicExtendedKey
  if (!privateExtendedKey) throw new Error('could not derive private extended key')
  return { privateExtendedKey, publicExtendedKey }
}

export function accountFromExtendedKey(base58key: string, accountIndex = 0): {
  privateKey?: { hex: string, bech32: string },
  publicKey:  { hex: string, bech32: string }
} {
  let extendedKey = HDKey.fromExtendedKey(base58key)
  let version = base58key.slice(0, 4)
  let child = extendedKey.deriveChild(0).deriveChild(accountIndex)
  let publicKeyHex = bytesToHex(child.publicKey!.slice(1))
  if (!publicKeyHex) throw new Error('could not derive public key')
  let publicKeyBech32 = hexToBech32(publicKeyHex, 'npub')
  if (version === 'xprv') {
    let privateKeyHex = bytesToHex(child.privateKey!)
    if (!privateKeyHex) throw new Error('could not derive private key')
    let privateKeyBech32 = hexToBech32(privateKeyHex, 'nsec')
    return { 
      privateKey: { hex: privateKeyHex, bech32: privateKeyBech32 },
      publicKey: { hex: publicKeyHex, bech32: publicKeyBech32 } 
    } 
  }
  return { publicKey: { hex: publicKeyHex, bech32: publicKeyBech32 } } 
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
