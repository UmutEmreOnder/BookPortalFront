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

    return {
        baseURL: _baseUrl,
        adminURL: _adminUrl,
        authorURL: _authorUrl,
        userURL: _userUrl,
    }
}();

export default UrlUtil;