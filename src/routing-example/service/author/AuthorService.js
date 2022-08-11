import axios from "axios";
import LocalStorageUtil from "../../util/SessionStorageUtil";

const AuthorService = (function () {
    const _updateAuthor = async (credentials) => {
        const response = await axios.put(`http://localhost:8080/api/author/?id=${credentials.id}`, credentials, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _register = async (credentials) => {
        return await axios.post('http://localhost:8080/api/admin/author/', credentials, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })
    }

    return {
        updateAuthor: _updateAuthor,
        register: _register
    }
})();

export default AuthorService