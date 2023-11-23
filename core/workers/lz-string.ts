/**
 * ==========================================
 * 🔹 Boosted LZString 🔹
 * ==========================================
 */
// Copyright (c) 2021 Orbit Turner <orbitturner@orbitturner.com>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// Based On :
// https://github.com/pieroxy/lz-string
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.4
/* tslint:disable:variable-name no-bitwise triple-equals */
export let LZString = (() => {
  // private property
  const f: (a: number) => string = String.fromCharCode;
  const keyStrBase64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  const keyStrUriSafe = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$';
  const baseReverseDic: { [key: string]: { [key: string]: number } } = {};

  function initializeBaseReverseDic(alphabet: string): void {
    baseReverseDic[alphabet] = {};
    for (let i = 0; i < alphabet.length; i++) {
      baseReverseDic[alphabet][alphabet.charAt(i)] = i;
    }
  }

  function getBaseValue(alphabet: string, character: string): number {
    if (!baseReverseDic[alphabet]) {
      initializeBaseReverseDic(alphabet);
    }
    return baseReverseDic[alphabet][character];
  }

  // tslint:disable-next-line:no-shadowed-variable
  const LZString = {
    compressToBase64(input: string | null): any {
      if (input == null) {
        return '';
      }
      const res = LZString._compress(input, 6, (a: any) => keyStrBase64.charAt(a));
      switch (
        res.length % 4 // To produce valid Base64
      ) {
        default: // When could this happen ?
        case 0:
          return res;
        case 1:
          return res + '===';
        case 2:
          return res + '==';
        case 3:
          return res + '=';
      }
    },

    decompressFromBase64(input: string | null): any {
      if (input == null) return '';
      if (input === '') return null;
      return LZString._decompress(input.length, 32, (index: any) => getBaseValue(keyStrBase64, input.charAt(index)));
    },

    compressToUTF16(input: string | null): any {
      if (input == null) {
        return '';
      }
      return LZString._compress(input, 15, (a: any) => f(a + 32)) + ' ';
    },

    decompressFromUTF16(compressed: any): any {
      if (compressed == null) {
        return '';
      }
      if (compressed === '') {
        return null;
      }
      return LZString._decompress(compressed.length, 16384, (index: number) => compressed.charCodeAt(index) - 32);
    },

    // compress into uint8array (UCS-2 big endian format)
    compressToUint8Array(uncompressed: any): any {
      const compressed = LZString.compress(uncompressed);
      const buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
      const TotalLen = compressed.length;
      for (let i = 0; i < TotalLen; i++) {
        const current_value = compressed.charCodeAt(i);
        buf[i * 2] = current_value >>> 8;
        buf[i * 2 + 1] = current_value % 256;
      }
      return buf;
    },

    // decompress from uint8array (UCS-2 big endian format)
    decompressFromUint8Array(compressed: string | any[] | null | undefined): any {
      if (compressed === null || compressed === undefined) {
        return LZString.decompress(compressed);
      } else {
        const buf = new Array(compressed.length / 2); // 2 bytes per character
        for (let i = 0, TotalLen = buf.length; i < TotalLen; i++) {
          buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
        }

        const result: string[] = [];
        for (const c of buf) {
          result.push(f(c));
        }
        return LZString.decompress(result.join(''));
      }
    },

    // compress into a string that is already URI encoded
    compressToEncodedURIComponent(input: any): any {
      if (input == null) {
        return '';
      }
      return LZString._compress(input, 6, (a: any) => keyStrUriSafe.charAt(a));
    },

    // decompress from an output of compressToEncodedURIComponent
    decompressFromEncodedURIComponent(input: string | null): any {
      if (input == null) {
        return '';
      }
      if (input == '') {
        return null;
      }
      input = input.replace(/ /g, '+');
      return LZString._decompress(input.length, 32, (index: any) => {
        // @ts-ignore
        return getBaseValue(keyStrUriSafe, input.charAt(index));
      });
    },

    compress(uncompressed: any): any {
      return LZString._compress(uncompressed, 16, (a: any) => f(a));
    },
    _compress(uncompressed: any, bitsPerChar: any, getCharFromInt: any): any {
      if (uncompressed == null) {
        return '';
      }
      let i: any;
      let value: any;
      const context_dictionary: any = {};
      const context_dictionaryToCreate: any = {};
      let context_c: any = '';
      let context_wc: any = '';
      let context_w: any = '';
      let context_enlargeIn: any = 2; // Compensate for the first entry which should not count
      let context_dictSize: any = 3;
      let context_numBits: any = 2;
      const context_data: any = [];
      let context_data_val: any = 0;
      let context_data_position: any = 0;
      let ii: any;

      for (ii = 0; ii < uncompressed.length; ii += 1) {
        context_c = uncompressed.charAt(ii);
        if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
          context_dictionary[context_c] = context_dictSize++;
          context_dictionaryToCreate[context_c] = true;
        }

        context_wc = context_w + context_c;
        if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) {
          context_w = context_wc;
        } else {
          if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
            if (context_w.charCodeAt(0) < 256) {
              for (i = 0; i < context_numBits; i++) {
                context_data_val = context_data_val << 1;
                // tslint:disable-next-line:triple-equals
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 8; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            } else {
              value = 1;
              for (i = 0; i < context_numBits; i++) {
                context_data_val = (context_data_val << 1) | value;
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = 0;
              }
              value = context_w.charCodeAt(0);
              for (i = 0; i < 16; i++) {
                context_data_val = (context_data_val << 1) | (value & 1);
                if (context_data_position == bitsPerChar - 1) {
                  context_data_position = 0;
                  context_data.push(getCharFromInt(context_data_val));
                  context_data_val = 0;
                } else {
                  context_data_position++;
                }
                value = value >> 1;
              }
            }
            context_enlargeIn--;
            if (context_enlargeIn == 0) {
              context_enlargeIn = 1 << context_numBits;
              context_numBits++;
            }
            // @ts-ignore
            delete context_dictionaryToCreate[context_w];
          } else {
            // @ts-ignore
            value = context_dictionary[context_w];
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = 1 << context_numBits;
            context_numBits++;
          }
          // Add wc to the dictionary.
          // @ts-ignore
          context_dictionary[context_wc] = context_dictSize++;
          context_w = String(context_c);
        }
      }

      // Output the code for w.
      if (context_w !== '') {
        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
          if (context_w.charCodeAt(0) < 256) {
            for (i = 0; i < context_numBits; i++) {
              context_data_val = context_data_val << 1;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 8; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          } else {
            value = 1;
            for (i = 0; i < context_numBits; i++) {
              context_data_val = (context_data_val << 1) | value;
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = 0;
            }
            value = context_w.charCodeAt(0);
            for (i = 0; i < 16; i++) {
              context_data_val = (context_data_val << 1) | (value & 1);
              if (context_data_position == bitsPerChar - 1) {
                context_data_position = 0;
                context_data.push(getCharFromInt(context_data_val));
                context_data_val = 0;
              } else {
                context_data_position++;
              }
              value = value >> 1;
            }
          }
          context_enlargeIn--;
          if (context_enlargeIn == 0) {
            context_enlargeIn = 1 << context_numBits;
            context_numBits++;
          }
          delete context_dictionaryToCreate[context_w];
        } else {
          value = context_dictionary[context_w] as any;
          for (i = 0; i < context_numBits; i++) {
            context_data_val = (context_data_val << 1) | (value & 1);
            if (context_data_position == bitsPerChar - 1) {
              context_data_position = 0;
              context_data.push(getCharFromInt(context_data_val));
              context_data_val = 0;
            } else {
              context_data_position++;
            }
            value = value >> 1;
          }
        }
        context_enlargeIn--;
        if (context_enlargeIn == 0) {
          context_enlargeIn = 1 << context_numBits;
          context_numBits++;
        }
      }

      // Mark the end of the stream
      value = 2;
      for (i = 0; i < context_numBits; i++) {
        context_data_val = (context_data_val << 1) | (value & 1);
        if (context_data_position == bitsPerChar - 1) {
          context_data_position = 0;
          context_data.push(getCharFromInt(context_data_val));
          context_data_val = 0;
        } else {
          context_data_position++;
        }
        value = value >> 1;
      }

      // Flush the last char
      while (true) {
        context_data_val = context_data_val << 1;
        if (context_data_position == bitsPerChar - 1) {
          context_data.push(getCharFromInt(context_data_val));
          break;
        } else {
          context_data_position++;
        }
      }
      return context_data.join('');
    },

    decompress(compressed: any): any {
      if (compressed == null) {
        return '';
      }
      if (compressed == '') {
        return null;
      }
      return LZString._decompress(compressed.length, 32768, (index: any) => compressed.charCodeAt(index));
    },

    _decompress(length: number, resetValue: number, getNextValue: any): any {
      const dictionary: any = [];
      let next;
      let enlargeIn = 4;
      let dictSize = 4;
      let numBits = 3;
      let entry = '';
      const result = [];
      let i;
      let w;
      let bits;
      let resb;
      let maxpower;
      let power;
      let c;
      const data = { val: getNextValue(0), position: resetValue, index: 1 };

      for (i = 0; i < 3; i += 1) {
        dictionary[i] = i;
      }

      bits = 0;
      maxpower = Math.pow(2, 2);
      power = 1;
      while (power != maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position == 0) {
          data.position = resetValue;
          data.val = getNextValue(data.index++);
        }
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      switch ((next = bits)) {
        case 0:
          bits = 0;
          maxpower = Math.pow(2, 8);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          c = f(bits);
          break;
        case 1:
          bits = 0;
          maxpower = Math.pow(2, 16);
          power = 1;
          while (power != maxpower) {
            resb = data.val & data.position;
            data.position >>= 1;
            if (data.position == 0) {
              data.position = resetValue;
              data.val = getNextValue(data.index++);
            }
            bits |= (resb > 0 ? 1 : 0) * power;
            power <<= 1;
          }
          c = f(bits);
          break;
        case 2:
          return '';
      }
      dictionary[3] = c;
      w = c;
      result.push(c);
      while (true) {
        if (data.index > length) {
          return '';
        }

        bits = 0;
        maxpower = 1 << numBits;
        power = 1;
        while (power != maxpower) {
          resb = data.val & data.position;
          data.position >>= 1;
          if (data.position == 0) {
            data.position = resetValue;
            data.val = getNextValue(data.index++);
          }
          bits |= (resb > 0 ? 1 : 0) * power;
          power <<= 1;
        }

        switch ((c = bits)) {
          case 0:
            bits = 0;
            maxpower = Math.pow(2, 8);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }

            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;
          case 1:
            bits = 0;
            maxpower = Math.pow(2, 16);
            power = 1;
            while (power != maxpower) {
              resb = data.val & data.position;
              data.position >>= 1;
              if (data.position == 0) {
                data.position = resetValue;
                data.val = getNextValue(data.index++);
              }
              bits |= (resb > 0 ? 1 : 0) * power;
              power <<= 1;
            }
            dictionary[dictSize++] = f(bits);
            c = dictSize - 1;
            enlargeIn--;
            break;
          case 2:
            return result.join('');
        }

        if (enlargeIn == 0) {
          enlargeIn = 1 << numBits;
          numBits++;
        }

        if (dictionary[c]) {
          entry = dictionary[c];
        } else {
          if (c === dictSize) {
            // @ts-ignore
            entry = w + w.charAt(0);
          } else {
            return null;
          }
        }
        result.push(entry);

        // Add w+entry[0] to the dictionary.
        dictionary[dictSize++] = w + entry.charAt(0);
        enlargeIn--;

        w = entry;

        if (enlargeIn == 0) {
          enlargeIn = 1 << numBits;
          numBits++;
        }
      }
    },
  };

  return LZString;
})();
