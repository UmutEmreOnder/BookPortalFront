import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {useNavigate} from "react-router-dom";
import {Button, Table} from "antd";
import AuthorRequestService from "../../service/author/AuthorRequestService";

function AuthorRequest() {
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
            onFilter: (value, record) => record.genre.name.indexOf(value) === 0,
        }
    ]

    useEffect(() => {
        const {pagination} = state;
        fetchRequest({pagination});
    }, [])

    function handleRequestTableChange() {
        const {pagination} = state;
        fetchRequest({pagination});
    }

    async function fetchRequest(params) {
        setState(prevState => {
            return {
                data: prevState.data,
                pagination: prevState.pagination,
                loading: true
            }
        })

        const data = await AuthorRequestService.fetchRequests(params);

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


    const {data, pagination, loading} = state;
    return (
        <div style={{textAlign: "center"}}>
            <div style={{marginBottom: "50px"}}>
                <Button style={{marginRight: "25px"}}>Requests</Button>
                <Button onClick={() => navigate('/author-response')}>Responses</Button>
            </div>

            <h2>Your current requests</h2>
            <Table
                columns={requestColumns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleRequestTableChange}
            />

            <br/> <br/>
        </div>
    )
}

export default AuthorRequest;
