const MessageUtil = function () {
    const _loginSuccess = () => {
        return "Successfully Logged In!"
    }

    const _loginFailed = () => {
        return "Username or Password Is Incorrect!"
    }

    const _registerSuccess = () => {
        return "Successfully Registered!"
    }

    const _registerFail = () => {
        return "Username or Email Already In Use!"
    }

    const _addBookSuccess = () => {
        return "The Book Added to Your List!"
    }

    const _removeBookSuccess = () => {
        return "The Book Removed From Your List!"
    }

    const _updateProfileSuccess = () => {
        return "Profile Updated Successfully!"
    }

    const _updateProfileFail = () => {
        return _registerFail();
    }

    const _loggedOut = () => {
        return "You Will Be Logged Out!"
    }

    const _requestSuccess = () => {
        return "Request Successfully Sent!"
    }

    const _updateBookSuccess = () => {
        return "The Book Updated Successfully!"
    }

    const _updateBookFail = () => {
        return "The Book Name Already Exists!"
    }

    const _deleteBookSuccess = () => {
        return "The Book Deleted Successfully!"
    }

    const _deleteUserSuccess = () => {
        return "The User Deleted Successfully!"
    }

    const _acceptRequest = () => {
        return "Request Accepted!"
    }

    const _denyRequest = () => {
        return "Request Denied!"
    }

    const _createAuthorSuccess = () => {
        return "Author Created Successfully!"
    }

    const _createAuthorFailed = () => {
        return _registerFail();
    }

    return {
        loginSuccess: _loginSuccess,
        loginFailed: _loginFailed,
        registerSuccess: _registerSuccess,
        registerFailed: _registerFail,
        addBook: _addBookSuccess,
        removeBook: _removeBookSuccess,
        updateProfileSuccess: _updateProfileSuccess,
        updateProfileFailed: _updateProfileFail,
        logOut: _loggedOut,
        requestSuccess: _requestSuccess,
        updateBookSuccess: _updateBookSuccess,
        updateBookFailed: _updateBookFail,
        deleteBookSuccess: _deleteBookSuccess,
        deleteUserSuccess: _deleteUserSuccess,
        acceptRequest: _acceptRequest,
        denyRequest: _denyRequest,
        createAuthorSuccess: _createAuthorSuccess,
        createAuthorFailed: _createAuthorFailed
    }
}();

export default MessageUtil;