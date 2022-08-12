import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Table} from "antd";
import {useNavigate} from "react-router-dom";
import AdminBookService from "../../service/admin/AdminBookService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {ToastContainer} from "react-toastify";
import UserBookService from "../../service/user/UserBookService";
import {debounce} from "lodash";

function AdminBookList() {
    const navigate = useNavigate();
    const text = 'Are you sure to delete this?';

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 5
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
            title: "Author",
            dataIndex: "author",
            render: (author) => `${author?.name} ${author?.surname}`
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
            render: (record) => (
                <Popconfirm placement="top" title={text} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                    <Button>Delete</Button>
                </Popconfirm>
            ),
        },
        {
            title: "Update",
            render: (text, record) => (
                <Button onClick={() => navigate('/book-update', {state: {value: record}})}>Update</Button>
            ),
        }
    ]

    const confirm = (record) => {
        deleteEntity(record)
    }

    const deleteEntity = async (record) => {
        await AdminBookService.delete(record);
        ToastifyUtil.success(MessageUtil.deleteBookSuccess())
        handleTableChange(state.pagination)
    }

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

        const data = await UserBookService.fetchBooks(params);

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
            <div style={{textAlign: "center", margin: "25px"}}>
                <h2>List of Books</h2>
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

            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    )
}

export default AdminBookList;
