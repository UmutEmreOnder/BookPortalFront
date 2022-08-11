import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Table} from "antd";
import {useNavigate} from "react-router-dom";
import Search from "antd/es/input/Search";
import AdminBookService from "../../service/admin/AdminBookService";

function AdminBookList() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 10
        },
        loading:  false,
    })

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
            render: (genre) => `${genre.name}`,
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
        },
        {
            title: "Delete",
            render: (text, record) => (
                <Button onClick={() => {AdminBookService.delete(record); window.location.reload()}}>Delete</Button>
            ),
        },
        {
            title: "Update",
            render: (text, record) => (
                <Button onClick={() => navigate('/test')}>Update</Button>
            ),
        }
    ]

    useEffect(() => {
        const {pagination} = state;
        fetch({pagination});
    }, [])

    function handleTableChange() {
        const {pagination} = state;
        fetch({pagination});
    }

    async function fetch(params) {
        setState(prevState => {
            return {
                data: prevState.data,
                pagination: prevState.pagination,
                loading: true
            }
        })

        const data = await AdminBookService.fetchBooks(params);

        setState(() => {
            return {
                data: data,
                pagination: {
                    ...params?.pagination,
                    total: data.length
                },
                loading: false
            }
        })
    }

    return (
        <>
            <Search
                placeholder="input search text"
                allowClear
                onSearch={(value) => console.log(value)}
                style={{
                    width: 200,
                }}
            />

            <br/> <br/> <br/>

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={state.data}
                pagination={state.pagination}
                loading={state.loading}
                onChange={handleTableChange}
            />

            <br/> <br/> <br/>

            <Button onClick={() => navigate('/add-book')}>Add a Request</Button>
        </>
    )
}

export default AdminBookList;
