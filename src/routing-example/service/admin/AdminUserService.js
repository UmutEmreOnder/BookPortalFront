import axios from "axios";
import LocalStorageUtil from "../../util/LocalStorageUtil";
import localStorageUtil from "../../util/LocalStorageUtil";

const AdminUserService = (function () {
    const _getUsers = async () => {
        const response = await axios.get(`http://localhost:8080/api/admin/user`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${LocalStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _delete = async (record) => {
        const response = await axios.delete(`http://localhost:8080/api/admin/user?id=${record.id}`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    return {
        fetchUsers: _getUsers,
        delete: _delete
    }
})();

export default AdminUserService