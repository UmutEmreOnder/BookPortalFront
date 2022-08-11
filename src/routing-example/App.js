import React from "react";
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import "antd/dist/antd.css";
import "../styles.css";
import {Layout, Menu, Breadcrumb} from "antd";
import Home from "./pages/Home";
import UserBooks from "./pages/user/UserBooks";
import AuthorBooks from "./pages/author/AuthorBooks";
import Update from "./pages/Update";
import Register from "./pages/Register"
import AdminBooks from "./pages/admin/AdminBooks";
import AdminUsers from "./pages/admin/AdminUsers"
import AdminAuthors from "./pages/admin/AdminAuthors";
import AdminRequest from "./pages/admin/AdminRequests";
import AuthorCreateRequest from "./pages/author/AuthorCreateRequest";
import AuthorRequest from "./pages/author/AuthorRequest";
import AuthorResponse from "./pages/author/AuthorResponse";

const {Header, Content, Footer} = Layout;

export default function App() {
    return (
        <Router>
            <Layout style={{height: "100vh"}}>
                <Header style={{position: "fixed", zIndex: 1, width: "100%"}}>
                    <div className="logo"/>
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
                            <Route path='/update-profile' element={<Update/>}/>
                            <Route path='/user-books' element={<UserBooks/>}/>
                            <Route path='/author-books' element={<AuthorBooks/>}/>
                            <Route path='/author-request' element={<AuthorRequest/>}/>
                            <Route path='/author-response' element={<AuthorResponse/>}/>
                            <Route path='/add-request' element={<AuthorCreateRequest/>}/>
                            <Route path='/admin-books' element={<AdminBooks/>}/>
                            <Route path='/admin-users' element={<AdminUsers/>}/>
                            <Route path='/admin-authors' element={<AdminAuthors/>}/>
                            <Route path='/admin-requests' element={<AdminRequest/>}/>
                            <Route path='/about' element={<About/>}/>
                            <Route path='/register' element={<Register/>}/>
                            <Route path='/' element={<Home/>}/>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{textAlign: "center"}}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Router>
    );
}

function About() {
    return (
        <>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Aliquet eget sit amet tellus cras. Eget velit aliquet sagittis id consectetur. Turpis egestas sed tempus urna et pharetra pharetra. Lectus arcu bibendum at varius vel pharetra vel turpis nunc. Posuere urna nec tincidunt praesent semper feugiat nibh. Fermentum et sollicitudin ac orci phasellus egestas. Euismod quis viverra nibh cras pulvinar mattis. Rhoncus dolor purus non enim praesent elementum. Lacinia at quis risus sed vulputate. Venenatis cras sed felis eget velit aliquet sagittis. Sit amet purus gravida quis blandit turpis cursus in hac. Lacus sed viverra tellus in. Facilisis gravida neque convallis a cras semper auctor neque. Convallis tellus id interdum velit laoreet id donec ultrices. Eget lorem dolor sed viverra ipsum nunc.
            </p>
            <br/> <br/> <br/>
            <p>
                Ornare massa eget egestas purus viverra accumsan in nisl. Sapien faucibus et molestie ac. Sapien et ligula ullamcorper malesuada proin libero nunc. Eros donec ac odio tempor orci dapibus ultrices in iaculis. A diam maecenas sed enim ut sem. Morbi non arcu risus quis varius quam quisque id diam. Commodo quis imperdiet massa tincidunt nunc. Tempus urna et pharetra pharetra massa massa ultricies mi. Malesuada fames ac turpis egestas sed tempus. Tortor consequat id porta nibh venenatis cras sed felis eget. Elementum tempus egestas sed sed risus pretium quam vulputate dignissim. Diam in arcu cursus euismod quis. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi. Enim sed faucibus turpis in eu mi. Sagittis vitae et leo duis ut diam. Mauris commodo quis imperdiet massa. Nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit.
            </p>
        </>
    )
}
