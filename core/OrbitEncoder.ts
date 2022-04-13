import { LZString } from './workers/lz-string';
import { Buffer } from 'buffer';
global.Buffer = global.Buffer || Buffer;

// 🟢💻 WELCOME TO ANOTHER SPACESHIP - DEVELOPED BY 💻🟢
//  ██████╗ ██████╗ ██████╗ ██╗████████╗    ████████╗██╗   ██╗██████╗ ███╗   ██╗███████╗██████╗
// ██╔═══██╗██╔══██╗██╔══██╗██║╚══██╔══╝    ╚══██╔══╝██║   ██║██╔══██╗████╗  ██║██╔════╝██╔══██╗
// ██║   ██║██████╔╝██████╔╝██║   ██║          ██║   ██║   ██║██████╔╝██╔██╗ ██║█████╗  ██████╔╝
// ██║   ██║██╔══██╗██╔══██╗██║   ██║          ██║   ██║   ██║██╔══██╗██║╚██╗██║██╔══╝  ██╔══██╗
// ╚██████╔╝██║  ██║██████╔╝██║   ██║          ██║   ╚██████╔╝██║  ██║██║ ╚████║███████╗██║  ██║
//  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝   ╚═╝          ╚═╝    ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
// 💚🔰 KEEP GOING FURTHER 🔰💚
/**
 * 💨 Project Name : Orbit-Encoder
 * 💨 Project Repo : https://github.com/orbitturner/orbit-encoder
 * 💨 My GitHub    : https://github.com/orbitturner
 * 💨 My LinkedIn  : https://linkedin.com/in/orbitturner
 * 💨 My Twitter   : https://twitter.com/orbitturner
 */

export class OrbitEncoder {
  /**
   * ENCODING OBJECT TO BASE64.
   *
   * Since everything is an object in Javascript this will
   * encode whatever you give it in Base64 then Compress it to an UTF16 String.
   *
   * btoa(): creates a Base64-encoded ASCII string from a "string" of binary data ("btoa" should be read as "binary to ASCII").
   * @see: https://developer.mozilla.org/en-US/docs/Glossary/Base64
   */
  public static encode(obj: any): any {
    if (typeof obj !== 'object' && !Array.isArray(obj)) {
      // OLD DEPRECATED : return LZString.compressToUTF16(btoa(unescape(encodeURIComponent(obj))));
      return LZString.compressToUTF16(Buffer.from(obj, 'binary').toString('base64'));
    }
    return LZString.compressToUTF16(Buffer.from(JSON.stringify(obj), 'binary').toString('base64'));
  }

  /**
   * DECODING BASE64.
   *
   * Since everything is an object in Javascript this will
   * decode whatever in Base64 you give it.
   *
   * @see: https://developer.mozilla.org/en-US/docs/Glossary/Base64
   */
  public static decode(obj: any): any {
    try {
      return JSON.parse(Buffer.from(LZString.decompressFromUTF16(obj), 'base64').toString('binary'));
      // * atob(): decodes a Base64-encoded string("atob" should be read as "ASCII to binary").
      // DEPRECATED : return JSON.parse(decodeURIComponent(escape(atob(LZString.decompressFromUTF16(obj)))));
    } catch {
      return Buffer.from(LZString.decompressFromUTF16(obj), 'base64').toString('binary');
    }
  }
}
