import axios from "axios";
import LocalStorageUtil from "../../util/LocalStorageUtil";

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

    return {
        updateAuthor: _updateAuthor
    }
})();

export default AuthorService