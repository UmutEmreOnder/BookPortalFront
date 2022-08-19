import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Popconfirm, Table} from "antd";
import {useNavigate} from "react-router-dom";
import AdminAuthorService from "../../service/admin/AdminAuthorService";
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
                <Button onClick={() => navigate('/admin-update-author', {state: {value: record}})}>Update</Button>
            ),
        }
    ]

    const confirm = (record) => {
        deleteEntity(record)
    }

    const deleteEntity = async (record) => {
        await AdminAuthorService.delete(record);
        ToastifyUtil.success(MessageUtil.deleteAuthorSuccess())
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

        const data = await AdminAuthorService.fetchAuthors(params);
        const length = await AdminAuthorService.getCount();

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
                <h2>List of Authors</h2>
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
