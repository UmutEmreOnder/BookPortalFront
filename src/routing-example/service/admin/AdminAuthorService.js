import axios from "axios";
import LocalStorageUtil from "../../util/SessionStorageUtil";
import localStorageUtil from "../../util/SessionStorageUtil";

const AdminAuthorService = (function () {
    const _getAuthors = async (params) => {
        const url = params.search ? `http://localhost:8080/api/admin/author/like/${params.search}` : `http://localhost:8080/api/admin/author/`;

        const response = await axios.get(url, {
            withCredentials: true,
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                ...params
            },
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _delete = async (record) => {
        const response = await axios.delete(`http://localhost:8080/api/admin/author?id=${record.id}`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    return {
        fetchAuthors: _getAuthors,
        delete: _delete
    }
})();

export default AdminAuthorService