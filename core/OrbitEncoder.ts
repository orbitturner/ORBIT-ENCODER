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
   * ENCODING & COMPRESSING OBJECT TO UTF16 STRING.
   *
   * Since everything is an object in Javascript this will
   * encode whatever you give it in Base64 then Compress it to an UTF16 String.
   *
   * @see: https://developer.mozilla.org/en-US/docs/Glossary/Base64
   */
  public static encode(obj: any): any {
    if (typeof obj !== 'object' && !Array.isArray(obj)) {
      return LZString.compressToUTF16(Buffer.from(obj, 'binary').toString('base64'));
    }
    return LZString.compressToUTF16(Buffer.from(JSON.stringify(obj), 'binary').toString('base64'));
  }
  /**
   * ENCODING & COMPRESSING OBJECT FOR AN URI SAFE STRING.
   *
   * produces ASCII strings representing the original string encoded in Base64 with a few tweaks to make these URI safe.
   * Hence, you can send them to the server without thinking about URL encoding them.
   * This saves bandwidth and CPU.
   *
   * @see: https://developer.mozilla.org/en-US/docs/Glossary/Base64
   */
  public static encodeWithURIsafe(obj: any): any {
    if (typeof obj !== 'object' && !Array.isArray(obj)) {
      return LZString.compressToEncodedURIComponent(Buffer.from(obj, 'binary').toString('base64'));
    }
    return LZString.compressToEncodedURIComponent(Buffer.from(JSON.stringify(obj), 'binary').toString('base64'));
  }

  /**
   * DECODING STRING CREATED WITH 'encode' Method.
   *
   * Since everything is an object in Javascript this will
   * decode whatever in Base64 you give it.
   *
   * @see: https://developer.mozilla.org/en-US/docs/Glossary/Base64
   */
  public static decode(obj: any): any {
    try {
      return JSON.parse(Buffer.from(LZString.decompressFromUTF16(obj), 'base64').toString('binary'));
    } catch {
      return Buffer.from(LZString.decompressFromUTF16(obj), 'base64').toString('binary');
    }
  }

  /**
   * DECODING OBJECT CREATED BY 'encodeWithURIsafe' METHOD.
   *
   * @see: https://developer.mozilla.org/en-US/docs/Glossary/Base64
   */
  public static decodeURIsafe(obj: any): any {
    try {
      return JSON.parse(Buffer.from(LZString.decompressFromEncodedURIComponent(obj), 'base64').toString('binary'));
    } catch {
      return Buffer.from(LZString.decompressFromEncodedURIComponent(obj), 'base64').toString('binary');
    }
  }
}
