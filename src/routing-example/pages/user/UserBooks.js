import React, {useEffect, useState} from "react";
import "antd/dist/antd.css";
import {Button, Input, Rate, Table} from "antd";
import UserBookService from "../../service/user/UserBookService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {debounce} from "lodash";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import {useNavigate} from "react-router-dom";

const UserBooks = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        data: [],
        pagination: {
            current: 1,
            pageSize: 5
        },
        loading: false,
        columns: [],
    })


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

    const onChange = async (e) => {
        const {pagination} = state

        fetch({pagination: pagination, search: e.target.value})
    }

    const canLoad = () => {
        return SessionStorageUtil.getUser()?.roles[0].id === 2;
    }

    const debouncedSearch = debounce((e) => {
        onChange(e)
    }, 500)

    async function fetch(params) {
        setState(prevState => {
            return {
                ...prevState,
                loading: true
            }
        });

        const data = await UserBookService.fetchBooks(params);

        setState({
            loading: false,
            data: data,
            pagination: {
                ...params.pagination,
                total: data.length
            },
            columns: [
                {
                    title: "Page",
                    dataIndex: "id",
                    render: (id) => <Button onClick={() => navigate(`/book/${id}`)}>Book's Page</Button>
                },
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
                    render: (author) => `${author?.name} ${author?.surname}`
                },
                {
                    title: "Rate",
                    dataIndex: "rate",
                    sorter: (a, b) => a.rate - b.rate,
                    render: (rate) => <Rate defaultValue={rate} disabled={true}></Rate>
                }
            ]
        });
    }

    const {data, pagination, loading, columns} = state;
    return (
        <>
            <div style={{textAlign: "center", margin: "25px"}}>
                <h2>List of Books</h2>
            </div>

            <Input
                placeholder="Book Name"
                onChange={debouncedSearch}
                size={"large"}
            />

            <br/> <br/>

            <Table
                columns={columns}
                rowKey={(record) => record.id}
                dataSource={data}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
            />
        </>
    )
}


export default UserBooks;
