import { describe, expect, it } from 'vitest'
import { accountFromExtendedKey } from '../src/index'

describe('accountFromExtendedKey', () => {
  it('should get account from extended private key', () => {
    const { privateKey, publicKey } = accountFromExtendedKey('xprv9z78fizET65qsCaRr1MSutTSGk1fcKfSt1sBqmuWShtkjRJJ4WCKcSnha6EmgNzFSsyom3MWtydHyPtJtSLZQUtictVQtM2vkPcguh6TQCH')

    expect(privateKey?.hex).toBe('5f29af3b9676180290e77a4efad265c4c2ff28a5302461f73597fda26bb25731')
    expect(privateKey?.bech32).toBe('nsec1tu567wukwcvq9y880f8045n9cnp07299xqjxrae4jl76y6aj2ucs2mkupq')
    expect(publicKey.hex).toBe('e8bcf3823669444d0b49ad45d65088635d9fd8500a75b5f20b59abefa56a144f')
    expect(publicKey.bech32).toBe('npub1az708q3kd9zy6z6f44zav5ygvdwelkzspf6mtusttx47lft2z38sghk0w7')
  })

  it('should get account from extended public key', () => {
    const { publicKey } = accountFromExtendedKey('xpub6D6V5EX8HTe95getx2tTH2QApmrA1nPJFEnneAK813RjcDdSc3WaAF7BRNpTF7o7zXjVm3DD3VMX66jhQ7wLaZ9sS6NzyfiwfzqDZbxvpDN')

    expect(publicKey.hex).toBe('e8bcf3823669444d0b49ad45d65088635d9fd8500a75b5f20b59abefa56a144f')
    expect(publicKey.bech32).toBe('npub1az708q3kd9zy6z6f44zav5ygvdwelkzspf6mtusttx47lft2z38sghk0w7')
  })
})
