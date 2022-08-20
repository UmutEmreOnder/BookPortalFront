import axios from "axios";
import SessionStorageUtil from "../../../util/SessionStorageUtil";
import UrlUtil from "../../../util/UrlUtil";

const ReadListService = (function () {
    const _addOrDrop = async (records) => {
        if (await _checkContains(records)) {
            await axios.delete(`${UrlUtil.userURL()}/book/read?id=${records.id}`, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            });

            return "DELETE";
        } else {
            await axios.post(`${UrlUtil.userURL()}/book/read?id=${records.id}`, {}, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            });
            return "ADD";
        }
    };

    const _getReadList = async () => {
        const response = await axios.get(`${UrlUtil.userURL()}/book/read`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _checkContains = async (records) => {
        let list = await axios.get(`${UrlUtil.userURL()}/book/read`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        for (let i = 0; i < list.data.length; i++) {
            if (list.data[i].name === records.name) {
                return true
            }
        }

        return false
    };

    const _drop = async (records) => {
        return await axios.delete(`${UrlUtil.userURL()}/book/read?id=${records.id}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });
    }

    return {
        addOrDrop: _addOrDrop,
        checkContains: _checkContains,
        getReadList: _getReadList,
        drop: _drop
    };
})();

export default ReadListService;