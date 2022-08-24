import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Input, Table} from "antd";
import AuthorBookService from "../../service/author/AuthorBookService";
import {debounce} from "lodash";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {useNavigate} from "react-router-dom";

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        sorter: true,
        width: "20%"
    },
    {
        title: "ISBN",
        dataIndex: "isbn",
        width: "20%"
    },
    {
        title: "Genre",
        dataIndex: "genre",
        render: (genre) => `${genre.name.charAt(0).toUpperCase() + genre.name.toLowerCase().slice(1)}`,
        filters: [
            {text: "Action", value: "ACTION"},
            {text: "Classic", value: "CLASSIC"},
            {text: "Fantasy", value: "FANTASY"},
            {text: "Horror", value: "HORROR"},
            {text: "Romance", value: "ROMANCE"},
            {text: "Sci-Fi", value: "SCI_FI"},
            {text: "History", value: "HISTORY"},
        ]
    },
    {
        title: "Read Count",
        dataIndex: "readCounter",
        sorter: true
    },
    {
        title: "Favorite Count",
        dataIndex: "favoriteCounter",
        sorter: true
    }
];

function AuthorBookList() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 5
        },
        loading: false,
        sorter: {
            field: "id",
            order: "ascend",
        },
        filter: {},
        search: ""
    })

    useEffect(() => {
        if (!canLoad()) {
            ToastifyUtil.error(MessageUtil.noPermission())
            navigate('/restriction')
        } else {
            const {pagination, filter, sorter, search} = state;
            fetch({pagination, filter, sorter, search});
        }
    }, [])

    const canLoad = () => {
        return SessionStorageUtil.getUser()?.roles[0].id === 3;
    }

    function handleTableChange(pagination, filter, sorter) {
        const {search} = state;
        fetch({pagination, filter, sorter, search});
    }

    const onChange = async (e) => {
        const {pagination, filter, sorter} = state

        await setState(prevState => {
            return {
                ...prevState,
                search: e.target.value
            }
        })

        fetch({pagination: pagination, filter: filter, sorter: sorter, search: e.target.value})
    }

    const debouncedSearch = debounce((e) => {
        onChange(e)
    }, 500)

    async function fetch(params) {
        if (params.sorter?.order === undefined) {
            params.sorter = {
                field: "id",
                order: "ascend"
            };
        }


        setState(prevState => {
            return {
                ...prevState,
                sorter: params.sorter,
                filter: params.filter,
                loading: true
            }
        })

        const data = await AuthorBookService.fetchBooks(params);
        const length = await AuthorBookService.getCount();

        setState(prevState => {
            return {
                ...prevState,
                data: data,
                pagination: {
                    ...params.pagination,
                    total: length
                },
                loading: false
            }
        })
    }

    return (
        <>
            <div style={{textAlign: "center", margin: "25px"}}>
                <h2>List of Your Books</h2>
            </div>

            <Input
                placeholder="Book Name"
                onChange={debouncedSearch}
                size={"large"}
            />

            <br/> <br/>

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={state.data}
                pagination={state.pagination}
                loading={state.loading}
                onChange={handleTableChange}
            />
        </>
    )
}

export default AuthorBookList;
