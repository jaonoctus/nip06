import { describe, expect, it } from 'vitest'
import { privateKeyFromSeedWords } from '../src/index'
import { DERIVATION_PATH } from '../src/constants'

describe('privateKeyFromSeedWords', () => {
  it('should use the NIP-06 derivation path', () => {
    expect(`${DERIVATION_PATH}/0'/0/0`).toBe(`m/44'/1237'/0'/0/0`)
  })

  it('should get a 64 bytes hex private key from mnemonic', () => {
    const { privateKey: sk1 } = privateKeyFromSeedWords({ mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about' })
    const { privateKey: sk2 } = privateKeyFromSeedWords({ mnemonic: 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong' })
    const { privateKey: sk3 } = privateKeyFromSeedWords({ mnemonic: 'bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon' })

    expect(sk1).toBe('5f29af3b9676180290e77a4efad265c4c2ff28a5302461f73597fda26bb25731')
    expect(sk2).toBe('c26cf31d8ba425b555ca27d00ca71b5008004f2f662470f8c8131822ec129fe2')
    expect(sk3).toBe('45049983ec1e38aa8a4a7d76b0203a4484d9a1d3120017cfd455e80aac2d52e4')
  })

  it('should get a 64 bytes hex private key from mnemonic and passphrase', () => {
    const { privateKey } = privateKeyFromSeedWords({
      mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about',
      passphrase: '123'
    })
    expect(privateKey).toBe('60ecd7942071530818b4f3cf42e402b5c946b3ce387606d134c4613e59fa0196')
  })

  it('should thow an error when a invalid mnemonic is provided', () => {
    const fn = () => {
      privateKeyFromSeedWords({ mnemonic: 'invalid words' })
    }
    expect(fn).toThrowError('Invalid mnemonic')
  })
})
