import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";

import {Button, Table} from "antd";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {useNavigate} from "react-router-dom";
import FavoriteListService from "../../service/user/lists/FavoriteListService";
import updateUser from "./UpdateUser";
import UserService from "../../service/user/UserService";
import SessionStorageService from "../../util/SessionStorageUtil";

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
            title: "Name",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
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
        },
        {
            title: "Action",
            render: (record) => {
            return (
            <>
                <Button onClick={async () => {
                    await FavoriteListService.drop(record);
                    ToastifyUtil.success(MessageUtil.removeBook())
                    await setUserToken()
                    handleTableChange()
                }} style={{marginRight: "20px"}}>Delete</Button>
            </>
            )}
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

    const setUserToken = async () => {
        const response = await UserService.getUser();
        SessionStorageService.setUser(response)
    }

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

        const data = await FavoriteListService.getFavoriteList();

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
