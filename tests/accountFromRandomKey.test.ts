import { describe, expect, it } from 'vitest'
import { accountFromRandomKey } from '../src/index'

describe('generatePrivateKey', () => {
  it('should generate a 64 bytes hex', () => {
    const { privateKey } = accountFromRandomKey()
    expect(privateKey.hex).toHaveLength(64)
  })
})
