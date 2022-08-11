import axios from "axios";
import LocalStorageUtil from "../../util/SessionStorageUtil";

const AdminAuthorService = (function () {
    const _getAuthors = async () => {
        const response = await axios.get(`http://localhost:8080/api/admin/author`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

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