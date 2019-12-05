/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
import { ICrypto, PKCECodes } from "msal-common";
import { GuidGenerator } from "../../math/GuidGenerator";
import { Base64Encode } from "../../math/Base64Encode";
import { Base64Decode } from "../../math/Base64Decode";
import { PkceGenerator } from "../../math/PkceGenerator";

export class BrowserCrypto implements ICrypto {

    private guidGenerator: GuidGenerator;
    private b64Encode: Base64Encode;
    private b64Decode: Base64Decode;
    private pkceGenerator: PkceGenerator;

    constructor() {
        this.b64Encode = new Base64Encode();
        this.b64Decode = new Base64Decode();
        this.guidGenerator = new GuidGenerator(BrowserCrypto.getBrowserCryptoObj());
        this.pkceGenerator = new PkceGenerator(BrowserCrypto.getBrowserCryptoObj());
    }

    /**
     * Creates a new random GUID - used to populate state?
     * @returns string (GUID)
     */
    createNewGuid(): string {
        return this.guidGenerator.generateGuid();
    }

    base64Encode(input: string): string {
        return this.b64Encode.encode(input);
    }    
    
    base64Decode(input: string): string {
        return this.b64Decode.decode(input);
    }

    async generatePKCECodes(): Promise<PKCECodes> {
        return this.pkceGenerator.generateCodes();
    }

    static getBrowserCryptoObj(): Crypto {
        return "msCrypto" in window ? window["msCrypto"] : window.crypto;
    }
}
