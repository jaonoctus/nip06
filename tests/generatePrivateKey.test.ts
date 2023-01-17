import { describe, expect, it } from '@jest/globals'
import { generatePrivateKey } from '../src/index'

describe('generatePrivateKey', () => {
  it('should generate a 64 bytes hex', () => {
    const { privateKey } = generatePrivateKey()
    expect(privateKey).toHaveLength(64)
  })
})
