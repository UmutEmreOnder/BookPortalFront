import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const AdminAuthorService = (function () {
    const _getAuthors = async (params) => {
        const url = params.search ? `${UrlUtil.adminURL()}/author/like/${params.search}` : `${UrlUtil.adminURL()}/author/`;

        const response = await axios.get(url, {
            params: {
                pageSize: params.pagination.pageSize,
                page: params.pagination.current,
                field: params.sorter?.field,
                order: params.sorter?.order,
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _delete = async (record) => {
        const response = await axios.delete(`${UrlUtil.adminURL()}/author?id=${record.id}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _getCount = async () => {
        const response = await axios.get(`${UrlUtil.adminURL()}/author/count`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    return {
        fetchAuthors: _getAuthors,
        delete: _delete,
        getCount: _getCount,
    }
})();

export default AdminAuthorService