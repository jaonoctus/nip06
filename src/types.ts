export type Key = { 
  hex: string,
  bech32: string
}
export type Account = {
  privateKey: Key,
  publicKey:  Key
}
export type ExtendedKeys = {
  privateExtendedKey: string,
  publicExtendedKey: string
}
