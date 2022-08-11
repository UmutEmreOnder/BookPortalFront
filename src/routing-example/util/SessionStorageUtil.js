const SessionStorageService = (function () {
    const TOKEN = "token";

    function _setToken(token) {
        sessionStorage.setItem(TOKEN, token);
    }

    function _getToken() {
        return sessionStorage.getItem(TOKEN);
    }

    function _clearToken() {
        sessionStorage.removeItem(TOKEN);
    }

    return {
        setToken: _setToken,
        getToken: _getToken,
        clearToken: _clearToken
    };
})();

export default SessionStorageService;
