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

    const _fetchBook = async (credentials) => {
        const response = await axios.get(`${UrlUtil.userURL()}${credentials}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }


    return {
        updateBook: _updateBook,
        fetchBook: _fetchBook,
    }
})();

export default BookService