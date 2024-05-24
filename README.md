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
  getBech32PublicKey,
} from 'nip06'

const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
const passphrase = 'your super secure passphrase' // optional

const { privateKey } = privateKeyFromSeedWords({ mnemonic, passphrase })
const { publicKey } = getPublicKey({ privateKey })
const { bech32PrivateKey } = getBech32PrivateKey({ privateKey })
const { bech32PublicKey } = getBech32PublicKey({ publicKey })
```

```js
import {
  extendedPairFromSeedWords,
  accountFromExtendedKey
} from 'nip06'

const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
const passphrase = 'your super secure passphrase' // optional

const extendedAccountIndex = 0
const accountIndex = 0

const { privateExtendedKey, publicExtendedKey } = extendedPairFromSeedWords(mnemonic, passphrase, extendedAccountIndex)
const { privateKey, publicKey } = accountFromExtendedKey(privateExtendedKey, accountIndex)
```

```js
import {
  accountFromExtendedKey
} from 'nip06'

const publicExtendedKey = 'xpub6C2FTj1fmB2GES9CSxbXYtrve372NjoHLLQxYRGb9qXbMWBLdDH5qQ7pm29LQuYaF4HzFUsdkcj4jurBU3ebF7xkVNbVTY3MCp9mEiX4Te5'
const accountIndex = 0

const { publicKey } = accountFromExtendedKey(publicExtendedKey, accountIndex)
```
