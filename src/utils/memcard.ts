import { numberToBytes } from "./numbers"

export function isMemcard(byteArray: Uint8Array) {
  return byteArray[0] == 0x4d && byteArray[1] == 0x43
}

export function browseTOC(byteArray: Uint8Array) {
  let addresses: number[] = []
  let current_address = 0x00

  while (current_address <= 0x780) {
    current_address += 0x80
    if (byteArray[current_address] != 0xa0 && checkTOCEntry(byteArray, current_address))
      addresses.push(0x2000 * (current_address / 0x80))
  }

  return addresses
}

export function checkTOCEntry(byteArray: Uint8Array, currentAddress: number) {
  //const codeJP = "SLPS-00990BOF3"
  const codeUS = "SLUS-00422BOF3"
  const codeEU = "SLES-01304BOF3"

  for (let i = 0; i < 0x0e; i++) {
    if (
      byteArray[currentAddress + 0x0c + i] != codeUS[i].charCodeAt(0) &&
      byteArray[currentAddress + 0x0c + i] != codeEU[i].charCodeAt(0)
      /*&& byte_array[current_address + 0x0C + i] != codeJP[i].charCodeAt() */
    )
      return false
  }

  return true
}

export function checksum(byteArray: Uint8Array, address: number) {
  let sum = 0
  let buffer
  byteArray[address + 0x270] = 0
  byteArray[address + 0x271] = 0

  for (let i = 0; i < 0x10b0; i++) sum += byteArray[address + 0x200 + i]

  buffer = numberToBytes(sum, 4, false)
  byteArray[address + 0x270] = buffer[0]
  byteArray[address + 0x271] = buffer[1]
}
