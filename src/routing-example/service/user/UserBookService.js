import axios from "axios";
import localStorageUtil from "../../util/SessionStorageUtil";

const UserBookService = (function () {
    const _fetchBooks = async (params) => {
        if (params.search) {
            const response = await axios.get(`http://localhost:8080/api/user/book/like/${params.search}`, {
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
        } else {
            const response = await axios.get(`http://localhost:8080/api/user/book/`, {
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
        }
    };

    const _fetchReadBooks = async (params) => {
        const response = await axios.get("http://localhost:8080/api/user/book/read", {
            withCredentials: true,
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                ...params
            },
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        })

        return response.data;
    }

    const _fetchFavoriteBooks = async (params) => {
        const response = await axios.get("http://localhost:8080/api/user/book/favorite", {
            withCredentials: true,
            params: {
                results: params.pagination.pageSize,
                page: params.pagination.current,
                ...params
            },
            headers: {
                "Authorization": `Basic ${localStorageUtil.getToken()}`
            }
        })

        return response.data;
    }


    return {
        fetchBooks: _fetchBooks,
        fetchReadBooks: _fetchReadBooks,
        fetchFavoriteBooks: _fetchFavoriteBooks
    };
})();

export default UserBookService;
