import { describe, expect, it } from 'vitest'
import { validateWords } from '../src/index'

describe('validateWords', () => {
  it('should return false when words are invalid', () => {
    const mnemonic1 = 'invalid words'
    const { isMnemonicValid: isInvalid1 } = validateWords(mnemonic1)
    const mnemonic2 = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon zebra'
    const { isMnemonicValid: isInvalid2 } = validateWords(mnemonic2)
    expect(isInvalid1).toBeFalsy()
    expect(isInvalid2).toBeFalsy()
  })

  it('should return true when words are valid', () => {
    const mnemonic1 = 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    const mnemonic2 = 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
    const mnemonic3 = 'bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon'
    const { isMnemonicValid: isValid1 } = validateWords(mnemonic1)
    const { isMnemonicValid: isValid2 } = validateWords(mnemonic2)
    const { isMnemonicValid: isValid3 } = validateWords(mnemonic3)
    expect(isValid1).toBeTruthy()
    expect(isValid2).toBeTruthy()
    expect(isValid3).toBeTruthy()
  })
})
