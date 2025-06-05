// Crypto2.js
export function encryptData(keyStr, data) {
    const enc = new TextEncoder();
    const keyMaterial = window.crypto.subtle.importKey(
        "raw",
        enc.encode(keyStr.padEnd(32, ' ')), // AES-256 key (32 bytes)
        { name: "AES-GCM" },
        false,
        ["encrypt"]
    );

    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // GCM은 12바이트 IV 권장
    const encrypted = window.crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        keyMaterial,
        enc.encode(data)
    );

    // IV + 암호문을 base64로 병합하여 저장
    const ivBase64 = btoa(String.fromCharCode(...iv));
    const cipherBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));

    return `${ivBase64}:${cipherBase64}`;
}

export function decryptData(keyStr, encryptedText) {
    const [ivBase64, cipherBase64] = encryptedText.split(":");

    const enc = new TextEncoder();
    const iv = new Uint8Array([...atob(ivBase64)].map(c => c.charCodeAt(0)));
    const data = new Uint8Array([...atob(cipherBase64)].map(c => c.charCodeAt(0)));

    const keyMaterial = window.crypto.subtle.importKey(
        "raw",
        enc.encode(keyStr.padEnd(32, ' ')),
        { name: "AES-GCM" },
        false,
        ["decrypt"]
    );

    const decrypted = window.crypto.subtle.decrypt(
        {
            name: "AES-GCM",
            iv: iv
        },
        keyMaterial,
        data
    );

    return new TextDecoder().decode(decrypted);
}

