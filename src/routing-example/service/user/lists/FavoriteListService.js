import axios from "axios";
import SessionStorageUtil from "../../../util/SessionStorageUtil";
import UrlUtil from "../../../util/UrlUtil";

const ReadListService = (function () {
    const _addOrDrop = async (records) => {
        if (await _checkContains(records)) {
            await axios.delete(`${UrlUtil.userURL()}/book/favorite?name=${records.name}`, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            });
            return "DELETE"
        } else {
            await axios.post(`${UrlUtil.userURL()}/book/favorite?name=${records.name}`, {}, {
                headers: {
                    "Authorization": `Basic ${SessionStorageUtil.getToken()}`
                }
            });
            return "ADD"
        }
    };

    const _getFavoriteList = async () => {
        const response = await axios.get(`${UrlUtil.userURL()}/book/favorite`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data
    }

    const _checkContains = async (records) => {
        let list = await axios.get(`${UrlUtil.userURL()}/book/favorite`, {
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

    return {
        addOrDrop: _addOrDrop,
        checkContains: _checkContains,
        getFavoriteList: _getFavoriteList
    };
})();

export default ReadListService;