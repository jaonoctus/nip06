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
  accountFromSeedWords,
} from 'nip06'

const mnemonic = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
const passphrase = 'your super secure passphrase' // optional
const accountIndex = 0

const { privateKey, publicKey } = accountFromSeedWords(mnemonic, passphrase, accountIndex)
```

```js
import {
  accountFromRandomKey,
} from 'nip06'

const { privateKey, publicKey } = accountFromRandomKey()
```

```js
import {
  getPublicKey,
  getBech32PrivateKey,
  getBech32PublicKey,
} from 'nip06'

const privateKey = '5f29af3b9676180290e77a4efad265c4c2ff28a5302461f73597fda26bb25731'

const { publicKey } = getPublicKey(privateKey)
const nsec = getBech32PrivateKey(privateKey)
const npub = getBech32PublicKey(publicKey.hex)
// or
const npub = publicKey.bech32
```

```js
import {
  extendedKeysFromSeedWords,
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
