import axios from "axios";
import localStorageUtil from "../../../util/SessionStorageUtil";

const ReadListService = (function () {
    const _addOrDrop = async (records) => {
        if(await _checkContains(records)) {
            await axios.delete(`http://localhost:8080/api/user/book/read?name=${records.name}`, {
                withCredentials: true,
                headers: {
                    "Authorization": `Basic ${localStorageUtil.getToken()}`
                }
            });

            return "DELETE";
        } else {
            await axios.post(`http://localhost:8080/api/user/book/read?name=${records.name}`, {}, {
                withCredentials: true,
                headers: {
                    "Authorization": `Basic ${localStorageUtil.getToken()}`
                }
            });
            return "ADD";
        }
    };

    const _getReadList = async () => {
        const response = await axios.get(`http://localhost:8080/api/user/book/read`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _checkContains = async (records) => {
        let list = await axios.get(`http://localhost:8080/api/user/book/read`, {
            withCredentials: true,
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        })

        for(let i = 0; i < list.data.length; i++) {
            if(list.data[i].name === records.name) {
                return true
            }
        }

        return false
    };

    return {
        addOrDrop: _addOrDrop,
        checkContains: _checkContains,
        getReadList: _getReadList
    };
})();

export default ReadListService;