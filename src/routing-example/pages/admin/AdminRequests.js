import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Popconfirm, Table} from "antd";
import AdminRequestService from "../../service/admin/AdminRequestService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {ToastContainer} from "react-toastify";
import AdminUserService from "../../service/admin/AdminUserService";

function AdminBookList() {
    const text = 'Are you sure to deny this?';

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
            title: "Create Date",
            dataIndex: "createDate",
            sorter: (a, b) => a.id - b.id // https://www.youtube.com/shorts/SzvWMClt-iU
        },
        {
            title: "Name",
            dataIndex: "bookName",
            sorter: (a, b) => a.bookName.localeCompare(b.bookName),
            width: "20%"
        },
        {
            title: "ISBN",
            dataIndex: "bookIsbn",
            width: "20%"
        },
        {
            title: "Genre",
            dataIndex: "genreName",
            render: (genre) => `${genre.charAt(0).toUpperCase() + genre.toLowerCase().slice(1)}`,
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
            title: "Action",
            render: (record) => {
                return (
                    <>
                        <Button onClick={async() => {
                            await AdminRequestService.accept(record);
                            ToastifyUtil.success(MessageUtil.acceptRequest())
                            handleTableChange(state.pagination)
                        }} style={{marginRight: "20px"}}>Accept</Button>

                        <Popconfirm placement="top" title={text} onConfirm={() => confirm(record)} okText="Yes" cancelText="No">
                            <Button>Deny</Button>
                        </Popconfirm>
                    </>
                )
            }
        }
    ]

    const confirm = (record) => {
        deleteEntity(record)
    }

    const deleteEntity = async (record) => {
        await AdminRequestService.deny(record);
        ToastifyUtil.success(MessageUtil.denyRequest())
        handleTableChange(state.pagination)
    }

    useEffect(() => {
        const {pagination} = state;
        fetch({pagination});
    }, [])

    function handleTableChange(pagination) {
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

        const data = await AdminRequestService.fetchRequests(params);

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
                <h2>List of Requests</h2>
            </div>

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
