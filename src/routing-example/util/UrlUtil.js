const UrlUtil = function () {
    const _baseUrl = () => {
        return "http://localhost:8080"
    }

    const _adminUrl = () => {
        return `${_baseUrl()}/api/admin`
    }

    const _userUrl = () => {
        return `${_baseUrl()}/api/user`
    }

    const _authorUrl = () => {
        return `${_baseUrl()}/api/author`
    }

    const _adminBtoa = () => {
        return btoa("sys.admin:admin");
    }

    return {
        baseURL: _baseUrl,
        adminURL: _adminUrl,
        authorURL: _authorUrl,
        userURL: _userUrl,
        adminBtao: _adminBtoa
    }
}();

export default UrlUtil;