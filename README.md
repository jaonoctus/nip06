# NIP06

![tests](https://github.com/jaonoctus/nip06/actions/workflows/tests.yml/badge.svg)

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

// hex format
const { privateKey } = privateKeyFromSeedWords({ mnemonic })
const { publicKey } = getPublicKey({ privateKey })
// bech32 format
const { bech32PrivateKey } = getBech32PrivateKey({ privateKey })
const { bech32PublicKey } = getBech32PublicKey({ publicKey })
```
