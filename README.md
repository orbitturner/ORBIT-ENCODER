# 🟢 ORBIT ENCODER ⚙️🗜️
[![Compatible Status](https://img.shields.io/badge/works%20with-PS1-blue)](https://github.com/orbitturner/ORBIT-ENCODER)
[![Code Size Status](https://img.shields.io/github/languages/code-size/orbitturner/ORBIT-ENCODER)](https://github.com/orbitturner/ORBIT-ENCODER)
[![Commit Status](https://img.shields.io/github/commit-activity/m/orbitturner/ORBIT-ENCODER?color=red)](https://github.com/orbitturner/ORBIT-ENCODER)
[![Issues Status](https://img.shields.io/github/issues/orbitturner/ORBIT-ENCODER)](https://github.com/orbitturner/ORBIT-ENCODER)
[![npm version](https://img.shields.io/npm/v/ORBIT-ENCODER.svg)](https://github.com/orbitturner/ORBIT-ENCODER) [![license](https://img.shields.io/npm/l/ORBIT-ENCODER.svg)](https://github.com/orbitturner/ORBIT-ENCODER)

**ORBIT-ENCODER** is an utility library for Data Compression and Encoding. It can take whatever object you give him as argument and returns a compressed encoded string. It provides a decoding method too. It uses a modified version of [*LZString*](https://www.npmjs.com/package/lz-string) for UTF16 Compression.

<p align="center">
  <a href="http://orbitturner.com/"><img src="./.repo-assets/images/GITHUB REPOS COVER.gif" width="auto" alt="ORBIT-ENCODER COVER"/></a>
</p>


<h1 align="center">INSTALLATION</h1>
<p align="center">
<a href="https://github.com/orbitturner/ORBIT-ENCODER"><img src="https://img.shields.io/badge/DOWNLOAD-LATEST%20VERSION-lime?style=for-the-badge&logo=docusign&logoColor=lime"></a>
<a href="https://github.com/orbitturner/ORBIT-ENCODER/issues/new/choose"><img src="https://img.shields.io/badge/ISSUES-CREATE%20AN%20ISSUE-crimson?style=for-the-badge&logo=indeed&logoColor=CRIMSON"></a>
</p>
<br/>

___
## 📚 Table Of Contents 📑
- [🟢 ORBIT ENCODER ⚙️🗜️](#orbit-encoder)
  * [📚 Table Of Contents 📑](#table-of-contents)
  * [💨 What is this Library for? 🤔](#what-is-this-library-for)
  * [✨ Key Features 🎯](#key-features---)
  * [📥 HOW TO RUN IT ? 🔰](#how-to-run-it)
  * [🤔 HOW IT WORKS ? 🤔](#how-it-works)
    + [➤ Encode & Decode Given Data 🟢](#encode---decode-given-data)
  * [Configuration Options](#configuration-options)
  * [Contributing ❤](#contributing--)
  * [Issue Reporting](#issue-reporting)
  * [GREETINGS](#greetings)
  * [Author](#author)
  * [License](#license)

___

## 💨 What is this Library for? 🤔

**ORBIT-ENCODER** is a small library that is useful for Encoding Objects [`String, Arrays, JSON, Anything...`] to a `Compressed UTF16` String. You can also Decode that string back using The exposed **Decode**  method.


> **Note:** This library can only be used with JS or TS but you already know that 🤦🏿‍♂️.



## ✨ Key Features 🎯

* Use it **without `Instanciation`**  because all the methods are `Static`.
* **Fast and High Performance Compression** of big Complex Data.
* ✅ TOO EASY TO USE !! 🥳🥳

___

## 📥 HOW TO RUN IT ? 🔰

```bash
# installation with npm
npm install array-querier

# or you may prefer
npm i --save array-querier

# installation with yarn
yarn add array-querier
```

**This SCRIPT relies on NOTHING SO YOU DON'T NEED ADDITIONNAL PACKAGES.**

___
## 🤔 HOW IT WORKS ? 🤔

You only need to Import the ***OrbitEncoder*** Class from the Package and start using it !

### ➤ Encode & Decode Given Data 🟢
If you have a User object as follows ->
```json
const User = {
    "name": "Orbit",
    "age": 21,
    "planet": {
        "id": 4,
        "codename" : "Shadow-Coders",
        "galaxyName" : "Turner"
    }   
}
```
👇🏾 Let's Encode and Decode an Objects :

- **ECMAScript Modules and Typescript** 
```typescript
    import {OrbitEncoder} from 'orbit-encoder/lib/OrbitEncoder';

    // Then Encode whatever you want
    const encodedData = OrbitEncoder.encode(User);

    console.log(encodedData);
    /**
     * 👇🏾 Output: 👇🏾
     * 
     * ᓢ㰴䅼ী甤〦恩Ìߐዠᔣᣡ䂦TɈ〦⁐䰠ᘡ㐢〪僠㲪␠祶fĂ࢕⓸Ǹ͚ࣣគⵉM䀼䀻什䁕㒘攈ᢸ᣷吰ৣ乩厖亰æၩ䩴¸椮ࠢ昤怪挑䃒塐恬睂⑘䤣&㉀PƘ䀠
     * 
     * /
```
```typescript
    ...
    // Then Encode whatever you want
    const decodedData = OrbitEncoder.decode(encodedData);

    console.log(decodedData);
    /**
     * 👇🏾 Output: 👇🏾
     * 
     * {
        name: 'Orbit',
        age: 21,
        planet: { id: 4, codename: 'Shadow-Coders', galaxyName: 'Turner' }
      }
     * 
     * /
```

- **CommonJs and Vailla JS** 
```javascript
  const orbit = require("orbit-encoder").OrbitEncoder;

  const data = orbit.encode('Bodio Bodio Yei !!');

  console.log(data); // 🚀 Output :ᅢ汇ǌࢀ甠瀼橪梸恕<Ұᡠ⢠ୀ

  console.log(orbit.decode(data));
```
> **⚠ Note: ⚠**    * You can do that : const orbit = require("orbit-encoder"); And use orbit.OrbitEncoder.encode() everywhere but for a more clean approach I did the  code above.

___
## Configuration Options

*Coming Soon !*
___
## Contributing ❤

👋🏾 Pull requests are welcome! 
___

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](mailto:support@orbitturner.com) details the procedure for disclosing security issues.
___

## GREETINGS

<p align="center">
❤❤
<a href="https://github.com/GalsenDev221/made.in.senegal"><img src="https://github.com/GalsenDev221/made.in.senegal/raw/master/assets/badge.svg"></a>
❤❤
</p>


___
## Author

[Orbit Turner](https://orbitturner.com)

___
## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
______________________________________________________
**❤ MADE WITH LOVE ❤**

![Image of OT](https://raw.githubusercontent.com/orbitturner/orbitturner/master/LOGO-OT.png)

<img src="https://github.com/orbitturner/challenger/blob/master/images/OrbitTurner_Gaming_GitHubBadge.png?raw=true" align="right" />
