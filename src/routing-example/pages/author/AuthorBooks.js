import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Table} from "antd";
import AuthorBookService from "../../service/author/AuthorBookService";
import {useNavigate} from "react-router-dom";
import Search from "antd/es/input/Search";
import {debounce} from "lodash";

const columns = [
    {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
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
        ],
        onFilter: (value, record) => record.genre.name.indexOf(value) === 0,
    },
    {
        title: "Read Count",
        dataIndex: "readCounter",
        sorter: (a, b) => a.readCounter - b.readCounter
    },
    {
        title: "Favorite Count",
        dataIndex: "favoriteCounter",
        sorter: (a, b) => a.favoriteCounter - b.favoriteCounter
    }
];

function AuthorBookList() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10
        },
        loading: false,
    })

    useEffect(() => {
        const {pagination} = state;
        fetch({pagination});
    }, [])

    function handleTableChange(pagination) {
        fetch({pagination});
    }

    const onChange = async (e) => {
        const {pagination} = state

        fetch({pagination: pagination, search: e.target.value})
    }

    const debouncedSearch = debounce((e) => {onChange(e)}, 500)

    async function fetch(params) {
        setState(prevState => {
            return {
                data: prevState.data,
                pagination: prevState.pagination,
                loading: true
            }
        })

        const data = await AuthorBookService.fetchBooks(params);

        setState(prevState => {
            return {
                data: data,
                pagination: {
                    ...params.pagination,
                    total: data.length
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
