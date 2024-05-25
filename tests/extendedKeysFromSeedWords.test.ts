import { describe, expect, it } from 'vitest'
import { extendedKeysFromSeedWords } from '../src/index'

describe('extendedPairFromSeedWords', () => {
  it('should get extended keys pair from mnemonic', () => {
    const { privateExtendedKey, publicExtendedKey } = extendedKeysFromSeedWords('abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about')

    expect(privateExtendedKey).toBe('xprv9z78fizET65qsCaRr1MSutTSGk1fcKfSt1sBqmuWShtkjRJJ4WCKcSnha6EmgNzFSsyom3MWtydHyPtJtSLZQUtictVQtM2vkPcguh6TQCH')
    expect(publicExtendedKey).toBe('xpub6D6V5EX8HTe95getx2tTH2QApmrA1nPJFEnneAK813RjcDdSc3WaAF7BRNpTF7o7zXjVm3DD3VMX66jhQ7wLaZ9sS6NzyfiwfzqDZbxvpDN')
  })
})
