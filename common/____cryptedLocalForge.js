// Constants
const passphrase = 'A3PnGzWjxGuAYtFu',
    key = 'data',
    object = { foo: 'bar' };

// Log original item
console.log('Original object', object);

// Store item with encryption
setItem(key, object, passphrase)
    .then(data => console.log('Set item response', data))
    .catch(err => console.warn('Set item error', err));

// Log retrieved item
getItem(key, passphrase)
    .then(data => console.log('Returned object', data))
    .catch(err => console.warn('Get item error', err));

/**
 * Set object in storage
 * @param {string} key object identifier
 * @param {any} data object to store
 * @param {string} passphrase optional encryption passphrase
 * @return {void}
 */
function setItem(key, data, passphrase = null) {
    // If passphrase is present, JSON stringify and encrypt string
    if (passphrase) {
        console.log('Encrypting data');
        data = CryptoJS.AES.encrypt(JSON.stringify(data), passphrase).toString();
        console.log('Encrypted data', data);
    }
    return localforage.setItem(key, data);
}

/**
 * Get object from storage
 * @param {string} key object identifier
 * @param {string} passphrase optional encryption passphrase
 * @return {any}
 */
function getItem(key, passphrase = null) {
    return localforage.getItem(key)
        .then(data => {
            // If passphrase is present, decrypt string and parse JSON
            if (passphrase) {
                console.log('Data encrypted, decrypting');
                data = CryptoJS.AES.decrypt(data, passphrase);
                console.log('Decrypted data encoded', data);
                data = data.toString(CryptoJS.enc.Utf8)
                console.log('Decrypted data decoded', data);
                return JSON.parse(data);
            }
            return data;
        });
}

/**
 * Delete object from storage
 * @param {string} key object identifier
 */
function deleteItem(key) {
    return localforage.removeItem(key);
}

/**
 * Clear storage
 */
function deleteAll() {
    return localforage.clear();
}