import { describe, expect, it } from '@jest/globals'
import { generateSeedWords, validateWords } from '../src/index'

describe('generateSeedWords', () => {
  it('should generate a valid mnemonic', () => {
    const { mnemonic } = generateSeedWords()
    const { isMnemonicValid } = validateWords({ mnemonic })
    expect(isMnemonicValid).toBeTruthy()
  })
})
