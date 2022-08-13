import React from "react";
import "antd/dist/antd.css";
import {Input, Table} from "antd";
import UserBookService from "../../service/user/UserBookService";
import ReadListService from "../../service/user/lists/ReadListService";
import FavoriteListService from "../../service/user/lists/FavoriteListService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import {ToastContainer} from "react-toastify";
import {debounce} from "lodash";

class PersonList extends React.Component {
    state = {
        search: "",
        data: [],
        read: [],
        favorite: [],
        pagination: {
            current: 1,
            pageSize: 5
        },
        loading: false,
        columns: []
    };

    componentDidMount() {
        const {pagination} = this.state;
        this.fetch({pagination: pagination});
    }

    handleTableChange = (pagination) => {
        this.fetch({pagination});
    };

    onChange = async (e) => {
        this.setState({search: e.target.value})
        const {pagination, search} = this.state

        this.fetch({pagination: pagination, search: search})
    }

    debouncedSearch = debounce((e) => {this.onChange(e)}, 500)

    fetch = async (params = {}) => {
        this.setState({loading: true});

        const data = await UserBookService.fetchBooks(params);
        const readList = await ReadListService.getReadList();
        const favoriteList = await FavoriteListService.getFavoriteList();

        this.setState({
            loading: false,
            data: data,
            pagination: {
                ...params.pagination,
                total: data.length
            },
            read: readList,
            favorite: favoriteList,
            columns: [
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
                render: (author) => `${author?.name} ${author?.surname}`
            },
            {
                title: 'Read List',
                render: (text, record) => (
                    <input type={"checkbox"} defaultChecked={this.checkReadList(record)} onClick={async () => {
                        const response = await ReadListService.addOrDrop(record);
                        response === "ADD" ? ToastifyUtil.success(MessageUtil.addBook()) : ToastifyUtil.success(MessageUtil.removeBook());
                    }}/>
                ),
            },
            {
                title: 'Favorite List',
                render: (text, record) => (
                    <input type={"checkbox"} defaultChecked={this.checkFavoriteList(record)} onClick={async () => {
                        const response = await FavoriteListService.addOrDrop(record)
                        response === "ADD" ? ToastifyUtil.success(MessageUtil.addBook()) : ToastifyUtil.success(MessageUtil.removeBook());
                    }}/>
                ),
            }]
        });
    };

    checkReadList(record) {
        for(let i = 0; i < this.state.read.length; i++) {
            if(this.state.read[i].name === record.name) {
                return true
            }
        }

        return false
    }

    checkFavoriteList(record) {
        for(let i = 0; i < this.state.favorite.length; i++) {
            if(this.state.favorite[i].name === record.name) {
                return true
            }
        }

        return false
    }

    render() {
        const {data, pagination, loading, columns} = this.state;
        return (
            <>
                <div style={{textAlign: "center", margin: "25px"}}>
                    <h2>List of Books</h2>
                </div>

                <Input
                    placeholder="Book Name"
                    onChange={this.debouncedSearch}
                    size={"large"}
                />

                <br/> <br/>

                <Table
                    columns={columns}
                    rowKey={(record) => record.id}
                    dataSource={data}
                    pagination={pagination}
                    loading={loading}
                    onChange={this.handleTableChange}
                />
            </>
        )
    }
}

export default PersonList;
