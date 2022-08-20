import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Table} from "antd";
import {useNavigate} from "react-router-dom";
import AdminUserService from "../../service/admin/AdminUserService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {debounce} from "lodash";
import SessionStorageUtil from "../../util/SessionStorageUtil";

function AdminUserList() {
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
        search: "",
    })

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: true,
            width: "20%"
        },
        {
            title: "Surname",
            dataIndex: "surname",
            width: "20%"
        },
        {
            title: "Age",
            dataIndex: "age",
            sorter: true
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Username",
            dataIndex: "username",
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
                <Button onClick={() => navigate('/admin-update-user', {state: {value: record}})}>Update</Button>
            ),
        }
    ]

    const confirm = (record) => {
        deleteEntity(record)
    }

    const deleteEntity = async (record) => {
        await AdminUserService.delete(record);
        ToastifyUtil.success(MessageUtil.deleteUserSuccess())
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

        const data = await AdminUserService.fetchUsers(params);
        const length = await AdminUserService.getCount();

        setState((prevState) => {
            return {
                ...prevState,
                data: data,
                pagination: {
                    ...params.pagination,
                    total: length
                },
                loading: false,
            }
        })
    }

    return (
        <>
            <div style={{textAlign: "center", margin: "25px"}}>
                <h2>List of Users</h2>
            </div>

            <Input
                placeholder="Name"
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

export default AdminUserList;
