import { describe, expect, it } from 'vitest'
import { validateWords } from '../src/index'

describe('validateWords', () => {
  it('should return false when words are invalid', () => {
    const { isMnemonicValid: isInvalid1 } = validateWords({
      mnemonic: 'invalid words'
    })
    const { isMnemonicValid: isInvalid2 } = validateWords({
      mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon zebra'
    })

    expect(isInvalid1).toBeFalsy()
    expect(isInvalid2).toBeFalsy()
  })

  it('should return true when words are valid', () => {
    const { isMnemonicValid: isValid1 } = validateWords({
      mnemonic: 'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about'
    })
    const { isMnemonicValid: isValid2 } = validateWords({
      mnemonic: 'zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong'
    })
    const { isMnemonicValid: isValid3 } = validateWords({
      mnemonic: 'bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon bacon'
    })

    expect(isValid1).toBeTruthy()
    expect(isValid2).toBeTruthy()
    expect(isValid3).toBeTruthy()
  })
})
