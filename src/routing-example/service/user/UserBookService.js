import axios from "axios";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UrlUtil from "../../util/UrlUtil";

const UserBookService = (function () {
    const _fetchBooks = async (params) => {
        const url = `${UrlUtil.userURL()}/book/`;

        const response = await axios.get(url, {
            params: {
                keyword: params.search,
                page: params.pagination.current,
                pageSize: params.pagination.pageSize,
                field: params.sorter?.field,
                order: params.sorter?.order,
                author: params.filter?.author?.join(","),
                genre: params.filter?.genre?.join(",")
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        });

        return response.data;
    };

    const _fetchReadBooks = async (params) => {
        const response = await axios.get(`${UrlUtil.userURL()}/book/read`, {
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                ...params
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _fetchFavoriteBooks = async (params) => {
        const response = await axios.get(`${UrlUtil.userURL()}/book/favorite`, {
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                field: params.filter.field,
                order: params.filter.order,
                ...params
            },
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _fetchRate = async (bookId) => {
        const response = await axios.get(`${UrlUtil.userURL()}/rate/${bookId}`, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _addRate = async (bookId, value) => {
        const response = await axios.post(`${UrlUtil.userURL()}/rate/${bookId}?rate=${value}`, {}, {
            headers: {
                "Authorization": `Basic ${SessionStorageUtil.getToken()}`
            }
        })
        return response;
    }


    return {
        fetchBooks: _fetchBooks,
        fetchReadBooks: _fetchReadBooks,
        fetchFavoriteBooks: _fetchFavoriteBooks,
        fetchRate: _fetchRate,
        addRate: _addRate,
    };
})();

export default UserBookService;
