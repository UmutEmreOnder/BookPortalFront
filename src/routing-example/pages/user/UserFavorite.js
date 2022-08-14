import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";

import {Table} from "antd";
import UserBookService from "../../service/user/UserBookService";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {useNavigate} from "react-router-dom";

function UserFavorite() {
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 5
        },
        loading: false,
    })

    const requestColumns = [
        {
            title: "Create Date",
            dataIndex: "createDate",
            sorter: (a, b) => a.id - b.id // https://www.youtube.com/shorts/SzvWMClt-iU
        },
        {
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
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
            render: author => `${author?.name} ${author?.surname}`
        }
    ]

    useEffect(() => {
        if (!canLoad()) {
            ToastifyUtil.error(MessageUtil.noPermission())
            navigate('/restriction')
        } else {
            const {pagination} = state;
            fetch({pagination});
        }
    }, [])

    function handleTableChange(pagination) {
        fetch({pagination});
    }

    const canLoad = () => {
        return SessionStorageUtil.getUser()?.roles[0].id === 2;
    }

    async function fetch(params) {
        setState(prevState => {
            return {
                data: prevState.data,
                pagination: prevState.pagination,
                loading: true
            }
        })

        const data = await UserBookService.fetchFavoriteBooks(params);

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
            <div style={{textAlign: "center", margin: "25px"}}>
                <h2>List of Your Favorite List</h2>
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

export default UserFavorite;
