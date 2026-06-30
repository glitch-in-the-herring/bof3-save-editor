const symbolMap: Record<number, string> = {
  0x3a: "(",
  0x3b: ")",
  0x3c: ",",
  0x3d: "-",
  0x3e: ".",
  0x3f: "/",
  0x5c: "?",
  0x5d: "!",
  0x8b: "+",
  0x8c: "~",
  0x8d: "&",
  0x8e: "'",
  0x8f: ":",
  0x90: '"',
  0x91: ";",
  0x92: "•",
  0x93: "%",
  0xff: " ",
}

const reverseSymbolMap: Record<string, number> = {
  "(": 0x3a,
  ")": 0x3b,
  ",": 0x3c,
  "-": 0x3d,
  ".": 0x3e,
  "/": 0x3f,
  "?": 0x5c,
  "!": 0x5d,
  "+": 0x8b,
  "~": 0x8c,
  "&": 0x8d,
  "'": 0x8e,
  ":": 0x8f,
  '"': 0x90,
  ";": 0x91,
  "•": 0x92,
  "%": 0x93,
  " ": 0xff,
}

export function decode(byteArray: Uint8Array) {
  let output: string[] = []

  for (const b of byteArray) {
    if (b == 0x00) break

    if (b in symbolMap) {
      output.push(symbolMap[b])
      continue
    }

    output.push(String.fromCharCode(b))
  }

  return output.join("")
}

export function encode(s: string) {
  let output: number[] = []

  for (let i = 0; i < 5; i++) {
    const c = s.charAt(i)

    if (i >= s.length) {
      output.push(0)
      continue
    }

    if (c in reverseSymbolMap) {
      output.push(reverseSymbolMap[c])
      continue
    }

    output.push(c.charCodeAt(0))
  }

  return output
}
