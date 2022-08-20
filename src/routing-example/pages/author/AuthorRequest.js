import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {useNavigate} from "react-router-dom";
import {Button, Table} from "antd";
import AuthorRequestService from "../../service/author/AuthorRequestService";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";

function AuthorRequest() {
    const navigate = useNavigate();

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

    const requestColumns = [
        {
            title: "Create Date",
            dataIndex: "createDate",
            sorter: true
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
            filters: [
                {text: "Action", value: "ACTION"},
                {text: "Classic", value: "CLASSIC"},
                {text: "Fantasy", value: "FANTASY"},
                {text: "Horror", value: "HORROR"},
                {text: "Romance", value: "ROMANCE"},
                {text: "Sci-Fi", value: "SCI_FI"},
                {text: "History", value: "HISTORY"},
            ],
            render: (respond) => `${respond.charAt(0).toUpperCase() + respond.toLowerCase().slice(1)}`,
            onFilter: (value, record) => record.genreName.indexOf(value) === 0
        }
    ]

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
        return SessionStorageUtil.getUser()?.roles[0].id === 3;
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
                ...prevState,
                sorter: params.sorter,
                filter: params.filter,
                loading: true,

            }
        })

        const data = await AuthorRequestService.fetchRequests(params);
        const length = await AuthorRequestService.getReqCount();

        setState((prevState) => {
            return {
                ...prevState,
                data: data,
                pagination: {
                    ...params.pagination,
                    total: length
                },
                loading: false
            }
        })
    }


    const {data, pagination, loading} = state;
    return (
        <div style={{textAlign: "center"}}>
            <div style={{marginBottom: "50px"}}>
                <Button style={{marginRight: "25px"}} disabled={true}>Requests</Button>
                <Button onClick={() => navigate('/author-response')}>Responses</Button>
            </div>

            <div style={{textAlign: "center", margin: "25px"}}>
                <h2>List of Your Requests</h2>
            </div>

            <Table
                columns={requestColumns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />

            <br/> <br/>
        </div>
    )
}

export default AuthorRequest;
