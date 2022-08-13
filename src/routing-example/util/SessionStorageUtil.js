import CryptoJS from 'crypto-js';

const SessionStorageService = (function () {
    const TOKEN = "token";
    const USER = "user"

    const key = "4{!31/#!#_?$fk3k10";

    function _setToken(token) {
        const serializedState = JSON.stringify(token);
        const encrypted = CryptoJS.AES.encrypt(serializedState, key);
        sessionStorage.setItem(TOKEN, encrypted)
    }

    function _setUser(user) {
        const serializedState = JSON.stringify(user);
        const encrypted = CryptoJS.AES.encrypt(serializedState, key);
        sessionStorage.setItem(USER, encrypted)
    }

    function _getToken() {
        const serializedState = sessionStorage.getItem(TOKEN);
        if (serializedState === null) {
            return undefined;
        }
        const decrypted = CryptoJS.AES.decrypt(serializedState, key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    }

    function _getUser() {
        const serializedState = sessionStorage.getItem(USER);
        if (serializedState === null) {
            return undefined;
        }
        const decrypted = CryptoJS.AES.decrypt(serializedState, key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    }

    function _clearToken() {
        sessionStorage.removeItem(TOKEN);
    }

    function _clearUser() {
        sessionStorage.removeItem(USER);
    }


    return {
        setToken: _setToken,
        getToken: _getToken,
        clearToken: _clearToken,
        setUser: _setUser,
        getUser: _getUser,
        clearUser: _clearUser,
    };
})();

export default SessionStorageService;
