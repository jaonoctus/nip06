import { describe, expect, it } from 'vitest'
import { getPublicKey } from '../src/index'

const PRIVATE_KEY = '0e5744385ea9268b61019704036cb22dc4bd5103bf6fa55086da17d1aec5e620'
const PUBLIC_KEY = '8a82a85afb75adb8544cb32b8ff7172803922308b59fa06d66d1120ead61ab97'

describe('getPublicKey', () => {
  it('should generate a 64 bytes hex', () => {
    const privateKey = PRIVATE_KEY
    const { publicKey } = getPublicKey({ privateKey })
    expect(publicKey).toHaveLength(64)
    expect(publicKey).toBe(PUBLIC_KEY)
  })
})
