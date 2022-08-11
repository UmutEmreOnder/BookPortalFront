import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {useNavigate} from "react-router-dom";
import {Button, Table} from "antd";
import AuthorRequestService from "../../service/author/AuthorRequestService";

function AuthorResponse() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 5
        },
        loading:  false,
    })

    const requestColumns = [
        {
            title: "Create Date",
            dataIndex: "createDate",
            sorter: (a, b) => a.id - b.id // https://www.youtube.com/shorts/SzvWMClt-iU
        },
        {
            title: "Name",
            dataIndex: "bookName",
            sorter: (a, b) => a.name.localeCompare(b.name),
            width: "20%"
        },
        {
            title: "ISBN",
            dataIndex: "bookIsbn",
            width: "20%"
        },
        {
            title: "Response",
            dataIndex: "respond",
            render: (respond) => `${respond.charAt(0).toUpperCase() + respond.toLowerCase().slice(1)}`,
            onFilter: (value, record) => record.respond.indexOf(value) === 0,
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

        const data = await AuthorRequestService.fetchResponses(params);

        setState(() => {
            return {
                data: data,
                pagination: {
                    ...params.pagination,
                    total: data.length
                },
                loading: false
            }
        })
    }


    const {data, pagination, loading} = state;
    return (
        <div style={{textAlign: "center"}}>
            <div style={{marginBottom: "50px"}}>
                <Button style={{marginRight: "25px"}} onClick={() => navigate('/author-request')}>Requests</Button>
                <Button disabled={true}>Responses</Button>
            </div>

            <div style={{textAlign: "center", margin: "25px"}}>
                <h2>List of Your Responded Requests</h2>
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

export default AuthorResponse;
