import { describe, expect, it } from 'vitest'
import { getBech32PrivateKey, privateKeyFromSeedWords, getPublicKey, getBech32PublicKey } from '../src/index'
import { PUBLIC_KEY_PREFIX, SECRET_KEY_PREFIX } from '../src/constants'

describe('bech32 formats', () => {
  it('private keys should start with "nsec"', () => {
    expect(SECRET_KEY_PREFIX).toBe('nsec')
  })

  it('public keys should start with "npub"', () => {
    expect(PUBLIC_KEY_PREFIX).toBe('npub')
  })

  it('should generate a valid bech32 private and public key', () => {
    const { privateKey } = privateKeyFromSeedWords({ mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about' })
    const { publicKey } = getPublicKey({ privateKey })
    const { bech32PrivateKey } = getBech32PrivateKey({ privateKey })
    const { bech32PublicKey } = getBech32PublicKey({ publicKey })
    expect(bech32PrivateKey).toBe('nsec1tu567wukwcvq9y880f8045n9cnp07299xqjxrae4jl76y6aj2ucs2mkupq')
    expect(bech32PublicKey).toBe('npub1az708q3kd9zy6z6f44zav5ygvdwelkzspf6mtusttx47lft2z38sghk0w7')
  })

  it('should generate a valid bech32 private and public key', () => {
    const { privateKey } = privateKeyFromSeedWords({ mnemonic: 'bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon' })
    const { publicKey } = getPublicKey({ privateKey })
    const { bech32PrivateKey } = getBech32PrivateKey({ privateKey })
    const { bech32PublicKey } = getBech32PublicKey({ publicKey })
    expect(bech32PrivateKey).toBe('nsec1g5zfnqlvrcu24zj204mtqgp6gjzdngwnzgqp0n752h5q4tpd2tjq5khznp')
    expect(bech32PublicKey).toBe('npub1s566ayhl06xkt4k3fk5ttvygjjhtkj8gndfflf3qmv2qpq7xhd2sy3ukkd')
  })
})
