import axios from "axios";
import LocalStorageUtil from "../../util/SessionStorageUtil";
import localStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AdminAuthorService = (function () {
    const _getAuthors = async (params) => {
        const url = params.search ? `${UrlUtil.adminURL()}/author/like/${params.search}` : `${UrlUtil.adminURL()}/author/`;

        const response = await axios.get(url, {
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
        const response = await axios.delete(`${UrlUtil.adminURL()}/author?id=${record.id}`, {
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