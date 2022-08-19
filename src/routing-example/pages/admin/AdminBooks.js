import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Table} from "antd";
import {useNavigate} from "react-router-dom";
import AdminBookService from "../../service/admin/AdminBookService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import UserBookService from "../../service/user/UserBookService";
import {debounce} from "lodash";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import BookService from "../../service/book/BookService";

function AdminBookList() {
    const navigate = useNavigate();
    const text = 'Are you sure to delete this?';

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 5
        },
        sorter: {
            field: "id",
            order: "ascend",
        },
        filter: {},
        loading: false,
    })

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
            sorter: true,
        },
        {
            title: "Favorite Count",
            dataIndex: "favoriteCounter",
            sorter: true,
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
        if (!canLoad()) {
            ToastifyUtil.error(MessageUtil.noPermission())
            navigate('/restriction')
        } else {
            const {pagination, filter, sorter} = state;
            fetch({pagination, filter, sorter});
        }
    }, [])

    const canLoad = () => {
        return SessionStorageUtil.getUser()?.roles[0].id === 1;
    }

    function handleTableChange(pagination, filter, sorter) {
        fetch({pagination, filter, sorter});
    }

    const onChange = async (e) => {
        const {pagination, filter, sorter} = state

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
                data: prevState.data,
                pagination: prevState.pagination,
                loading: true
            }
        })

        const data = await UserBookService.fetchBooks(params);
        const length = await BookService.getCount();

        setState(() => {
            return {
                data: data,
                pagination: {
                    ...params?.pagination,
                    total: length
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
        </>
    )
}

export default AdminBookList;
