export function bytesToNumber(byteArray: Uint8Array, signed: boolean) {
  return signed ? signedBytesToNumber(byteArray) : unsignedBytesToNumber(byteArray)
}

function signedBytesToNumber(byteArray: Uint8Array) {
  let output = 0
  for (let i = byteArray.length - 1; i >= 0; i--) output |= byteArray[i] << (i * 8)

  if (byteArray[0] & 0x80) {
    output = logicalNot(output, byteArray.length)
    output++
    output *= -1
  }

  return output
}

function unsignedBytesToNumber(byteArray: Uint8Array) {
  let output = 0
  for (let i = byteArray.length - 1; i >= 0; i--) output |= byteArray[i] << (i * 8)

  return output
}

export function logicalNot(n: number, width: number) {
  if (n > 2 ** (width * 8) - 1) n = n & (2 ** (width * 8) - 1)
  else if (n < 0) return 0

  let result = 0
  let mask
  for (let i = 0; i < width * 8; i++) {
    mask = n & (0b1 << i)

    if (!mask) result = result | (0b1 << i)
  }

  return result
}

export function numberToBytes(n: number, width: number, signed: boolean) {
  let output = []
  let safeN = byteSafety(n, width, signed)
  let unsignedN = safeN

  if (signed) {
    if (safeN < 0) unsignedN = 2 ** (8 * width) + safeN
    else unsignedN = safeN
  }

  for (let i = 0; i < width; i++) output.push((unsignedN & (0xff << (i * 8))) >> (i * 8))

  return output
}

export function byteSafety(n: number, width: number, signed: boolean) {
  if (signed) {
    if (n < -(2 ** (8 * width - 1))) return -(2 ** (8 * width - 1))
    else if (n > 2 ** (8 * width - 1) - 1) return 2 ** (8 * width - 1) - 1

    return n
  }

  if (n < 0) return 0
  else if (n > 2 ** (width * 8) - 1) return 2 ** (width * 8) - 1

  return n
}
