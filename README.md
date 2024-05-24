# NIP06

![tests](https://github.com/jaonoctus/nip06/actions/workflows/tests.yml/badge.svg)

- [NIP-06 Specs](https://github.com/nostr-protocol/nips/blob/master/06.md)

## Install

```bash
npm i nip06
```

## Usage

```js
import {
  privateKeyFromSeedWords,
  getPublicKey,
  getBech32PrivateKey,
  getBech32PublicKey
} from 'nip06'

const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
const passphrase = 'your super secure passphrase' // optional

const { privateKey } = privateKeyFromSeedWords({ mnemonic, passphrase })
const { publicKey } = getPublicKey({ privateKey })
const { bech32PrivateKey } = getBech32PrivateKey({ privateKey })
const { bech32PublicKey } = getBech32PublicKey({ publicKey })

const extendedAccountIndex = 0
const accountIndex = 0

const { privateExtendedKey, publicExtendedKey } = extendedPairFromSeedWords(mnemonic, passphrase, extendedAccountIndex)
const { privateKey, publicKey } = accountFromExtendedKey(privateExtendedKey, accountIndex)
```
