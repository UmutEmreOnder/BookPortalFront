import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Table} from "antd";
import {useNavigate} from "react-router-dom";
import Search from "antd/es/input/Search";
import AdminAuthorService from "../../service/admin/AdminAuthorService";

function AdminUserList() {
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
            render: (text, record) => (
                <Button onClick={async () => {
                    await AdminAuthorService.delete(record);
                    handleTableChange(state.pagination)
                }}>Delete</Button>
            ),
        },
        {
            title: "Update",
            render: (text, record) => (
                <Button onClick={() => navigate('/author-update', {state: {value: record}})}>Update</Button>
            ),
        }
    ]

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

        const data = await AdminAuthorService.fetchAuthors(params);

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
                <h2>List of Authors</h2>
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

export default AdminUserList;
