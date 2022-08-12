import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AdminBookService = (function () {
    const _fetchBooks = async (params) => {
        const response = await axios.get(`${UrlUtil.adminURL()}/book`, {
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                ...params
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _delete = async (record) => {
        const response = await axios.delete(`${UrlUtil.adminURL()}/book?id=${record.id}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    return {
        fetchBooks: _fetchBooks,
        delete: _delete
    };
})();

export default AdminBookService;
