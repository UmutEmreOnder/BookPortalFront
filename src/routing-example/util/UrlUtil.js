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

    const _registerUrl = () => {
        return `${_baseUrl()}/api/register`
    }

    return {
        baseURL: _baseUrl,
        adminURL: _adminUrl,
        authorURL: _authorUrl,
        userURL: _userUrl,
        registerURL: _registerUrl
    }
}();

export default UrlUtil;