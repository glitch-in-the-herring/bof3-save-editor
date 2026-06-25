export function isMemcard(byteArray: Uint8Array) {
  return byteArray[0] == 0x4D && byteArray[1] == 0x43
}

export function browseTOC(byteArray: Uint8Array) {
  let addresses: number[] = []
  let current_address = 0x00

  while (current_address <= 0x780) {
    current_address += 0x80
    if (byteArray[current_address] != 0xA0 && checkTOCEntry(byteArray, current_address))
      addresses.push(0x2000 * (current_address / 0x80))
  }

  return addresses;
}

export function checkTOCEntry(byteArray: Uint8Array, currentAddress: number) {
  //const codeJP = "SLPS-00990BOF3"
  const codeUS = "SLUS-00422BOF3"
  const codeEU = "SLES-01304BOF3"

  for (let i = 0; i < 0x0E; i++) {       
    if (
      byteArray[currentAddress + 0x0C + i] != codeUS[i].charCodeAt(0) 
      && byteArray[currentAddress + 0x0C + i] != codeEU[i].charCodeAt(0)
      /*&& byte_array[current_address + 0x0C + i] != codeJP[i].charCodeAt() */
    )
      return false
  }

  return true
}