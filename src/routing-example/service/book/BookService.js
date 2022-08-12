import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const BookService = (function () {
    const _updateBook = async (credentials) => {
        const response = await axios.put(`${UrlUtil.adminURL()}/book/?id=${credentials.id}`, credentials, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    return {
        updateBook: _updateBook
    }
})();

export default BookService