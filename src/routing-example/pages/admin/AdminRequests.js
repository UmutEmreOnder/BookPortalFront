import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Popconfirm, Table} from "antd";
import AdminRequestService from "../../service/admin/AdminRequestService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import {useNavigate} from "react-router-dom";

function AdminBookList() {
    const navigate = useNavigate();
    const text = 'Are you sure to deny this?';

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
            title: "Create Date",
            dataIndex: "createDate",
            sorter: true,
        },
        {
            title: "Name",
            dataIndex: "bookName",
            sorter: true,
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
            onFilter: (value, record) => record.genreName.indexOf(value) === 0,
        },
        {
            title: "Author",
            dataIndex: "author",
            filters: [
                {text: "Aziz Nesin", value: "aziz"},
                {text: "Nazim Hikmet", value: "nazim"},
            ],
            render: (author) => `${author?.name} ${author?.surname}`
        },
        {
            title: "Action",
            render: (record) => {
                return (
                    <>
                        <Button onClick={async () => {
                            await AdminRequestService.accept(record);
                            ToastifyUtil.success(MessageUtil.acceptRequest())
                            handleTableChange(state.pagination)
                        }} style={{marginRight: "20px"}}>Accept</Button>

                        <Popconfirm placement="top" title={text} onConfirm={() => confirm(record)} okText="Yes"
                                    cancelText="No">
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

        const data = await AdminRequestService.fetchRequests(params);
        const length = await AdminRequestService.getCount();

        setState(() => {
            return {
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
        </>
    )
}

export default AdminBookList;
