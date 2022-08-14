import React, {useEffect} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import "antd/dist/antd.css";
import "../styles.css";
import {Breadcrumb, Layout, Menu} from "antd";
import Home from "./pages/Home";
import UserBooks from "./pages/user/UserBooks";
import AuthorBooks from "./pages/author/AuthorBooks";
import UpdateUser from "./pages/user/UpdateUser";
import Register from "./pages/Register"
import AdminBooks from "./pages/admin/AdminBooks";
import AdminUsers from "./pages/admin/AdminUsers"
import AdminAuthors from "./pages/admin/AdminAuthors";
import AdminRequest from "./pages/admin/AdminRequests";
import AuthorCreateRequest from "./pages/author/AuthorCreateRequest";
import AuthorRequest from "./pages/author/AuthorRequest";
import AuthorResponse from "./pages/author/AuthorResponse";
import UserRead from "./pages/user/UserRead";
import UserFavorite from "./pages/user/UserFavorite";
import UpdateAuthor from "./pages/author/UpdateAuthor";
import UpdateBook from "./pages/admin/UpdateBook";
import CreateAuthor from "./pages/admin/CreateAuthor";
import AdminUpdateUser from "./pages/admin/AdminUpdateUser";
import AdminUpdateAuthor from "./pages/admin/AdminUpdateAuthor";
import {ToastContainer} from "react-toastify";
import Restriction from "./pages/Restriction";

const {Header, Content, Footer} = Layout;

export default function App() {
    useEffect(() => {
        document.title = "Book Portal"
    }, [])

    return (
        <Router>
            <Layout style={{height: "100vh"}}>
                <Header style={{position: "fixed", zIndex: 1, width: "100%"}}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">
                            <Link to="/">Book Portal</Link>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content className="site-layout" style={{padding: "0 50px", marginTop: 64}}>
                    <Breadcrumb style={{margin: "16px 0"}}></Breadcrumb>

                    <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                        <Routes>
                            <Route path='/user-update' element={<UpdateUser/>}/>
                            <Route path='/user-books' element={<UserBooks/>}/>
                            <Route path='/user-read' element={<UserRead/>}/>
                            <Route path='/user-favorite' element={<UserFavorite/>}/>

                            <Route path='/author-books' element={<AuthorBooks/>}/>
                            <Route path='/author-request' element={<AuthorRequest/>}/>
                            <Route path='/author-response' element={<AuthorResponse/>}/>
                            <Route path='/add-request' element={<AuthorCreateRequest/>}/>
                            <Route path='/author-update' element={<UpdateAuthor/>}/>
                            <Route path='/author-create' element={<CreateAuthor/>}/>

                            <Route path='/admin-books' element={<AdminBooks/>}/>
                            <Route path='/admin-users' element={<AdminUsers/>}/>
                            <Route path='/admin-authors' element={<AdminAuthors/>}/>
                            <Route path='/admin-requests' element={<AdminRequest/>}/>
                            <Route path='/admin-update-user' element={<AdminUpdateUser/>}/>
                            <Route path='/admin-update-author' element={<AdminUpdateAuthor/>}/>

                            <Route path='/book-update' element={<UpdateBook/>}/>

                            <Route path='/restriction' element={<Restriction/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/' element={<Home/>}/>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{textAlign: "center"}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>

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
        </Router>
    );
}
