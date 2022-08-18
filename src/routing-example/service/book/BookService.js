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

    const _fetchRate = async (id) => {
        const response = await axios.get(`${UrlUtil.userURL()}/book/id?id=${id}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data.rate;
    }


    return {
        updateBook: _updateBook,
        fetchBook: _fetchBook,
        fetchRate: _fetchRate,
    }
})();

export default BookService