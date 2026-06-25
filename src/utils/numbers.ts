export function bytesToNumber(byteArray: Uint8Array, signed: boolean) {
  return signed ? signedBytesToNumber(byteArray) : unsignedBytesToNumber(byteArray)
}

function signedBytesToNumber(byteArray: Uint8Array) {
  let output = 0
  for (let i = byteArray.length - 1; i >= 0; i--)
    output |= byteArray[i] << i * 8

  if (byteArray[0] & 0x80) {
    output = logicalNot(output, byteArray.length)
    output++
    output *= -1
  }

  return output;
}

function unsignedBytesToNumber(byteArray: Uint8Array) {
  let output = 0
  for (let i = byteArray.length - 1; i >= 0; i--)
    output |= byteArray[i] << i * 8

  return output
}

function logicalNot(n: number, width: number) {
  if (n > 2 ** (width * 8) - 1)
    n = n & 2 ** (width * 8) - 1
  else if (n < 0)
    return 0

  let result = 0
  let mask
  for (let i = 0; i < width * 8; i++) {
    mask = n & (0b1 << i)

    if (!mask)
      result = result | (0b1 << i)
  }

  return result
}