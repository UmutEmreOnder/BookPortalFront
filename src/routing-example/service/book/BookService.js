import axios from "axios";
import LocalStorageUtil from "../../util/LocalStorageUtil";

const BookService = (function () {
    const _updateBook = async (credentials) => {
        const response = await axios.put(`http://localhost:8080/api/admin/book/?id=${credentials.id}`, credentials, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    return {
        updateBook: _updateBook
    }
})();

export default BookService