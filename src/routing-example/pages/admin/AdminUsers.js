import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Table, message} from "antd";
import {useNavigate} from "react-router-dom";
import AdminUserService from "../../service/admin/AdminUserService";
import {ToastContainer} from "react-toastify";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {debounce} from "lodash";

function AdminUserList() {
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
            title: "Surname",
            dataIndex: "surname",
            width: "20%"
        },
        {
            title: "Age",
            dataIndex: "age",
            sorter: (a, b) => a.age - b.age
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

        const data = await AdminUserService.fetchUsers(params);

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

export default AdminUserList;
