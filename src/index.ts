import * as secp256k1 from '@noble/secp256k1'
import { HDKey } from '@scure/bip32'
import {
  generateMnemonic,
  mnemonicToSeedSync,
  validateMnemonic
} from '@scure/bip39'
import { bech32 } from 'bech32'
import { wordlist } from '@scure/bip39/wordlists/english.js'
import { DERIVATION_PATH, PUBLIC_KEY_PREFIX, SECRET_KEY_PREFIX } from './constants'

export function privateKeyFromSeedWords(
  {
    mnemonic,
    passphrase
  }: { mnemonic: string, passphrase?: string }
): { privateKey: string } {
  const root = HDKey.fromMasterSeed(mnemonicToSeedSync(mnemonic, passphrase))
  const { privateKey } = root.derive(DERIVATION_PATH)
  if (!privateKey) {
    throw new Error('could not derive private key')
  }
  return {
    privateKey: secp256k1.utils.bytesToHex(privateKey)
  }
}

export function generatePrivateKey(): { privateKey: string } {
  return {
    privateKey: secp256k1.utils.bytesToHex(secp256k1.utils.randomPrivateKey())
  }
}

export function getPublicKey({ privateKey }: { privateKey: string }): { publicKey: string } {
  return {
    publicKey: secp256k1.utils.bytesToHex(secp256k1.schnorr.getPublicKey(privateKey))
  }
}

function hexToBech32(key: string, prefix: string) {
  const words = bech32.toWords(secp256k1.utils.hexToBytes(key))
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
