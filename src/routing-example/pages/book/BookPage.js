import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import BookService from "../../service/book/BookService";
import ReadListService from "../../service/user/lists/ReadListService";
import ToastifyUtil from "../../util/ToastifyUtil";
import MessageUtil from "../../util/MessageUtil";
import SessionStorageUtil from "../../util/SessionStorageUtil";
import UserService from "../../service/user/UserService";
import FavoriteListService from "../../service/user/lists/FavoriteListService";
import CommentSection from "./CommentSection";
import RateSection from "./RateSection";

const BookPage = () => {
    const location = useLocation();
    const [state, setState] = useState({});
    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        fetch().then((value) => {
            checkReadList(value);
            checkFavoriteList(value);
        })
    }, [])

    async function fetch() {
        const response = await BookService.fetchBook(location.pathname);
        setState({response: response})
        return response
    }

    const checkReadList = (value) => {
        const read = SessionStorageUtil.getUser().readList;

        for (let i = 0; i < read.length; i++) {
            if (read[i].name === value?.name) {
                setState(prevState => {
                    return {
                        ...prevState,
                        read: true
                    }
                })
            }
        }

        return false
    }

    const checkFavoriteList = (value) => {
        const favorite = SessionStorageUtil.getUser().favoriteList;

        for (let i = 0; i < favorite.length; i++) {
            if (favorite[i].name === value?.name) {
                setState(prevState => {
                    return {
                        ...prevState,
                        favorite: true
                    }
                })
            }
        }

        return false
    }

    const setUpdatedUser = () => {
        UserService.getUser()?.then(value => SessionStorageUtil.setUser(value))
    }

    const Page = () => {
        return (
            <>
                <div style={{width: "fit-content", display: "inline-block", marginLeft: "200px"}}>
                    <img style={{marginLeft: "100px", border: "1px solid black", marginTop: "50px"}}
                         src={`https://picsum.photos/250/400`} alt={"Cover Photo"}/>

                    <div style={{float: "right", marginLeft: "200px"}}>
                        <CommentSection bookId={bookId}></CommentSection>
                    </div>

                    <div style={{display: "inline-block", float: "right", marginLeft: "50px", marginTop: "70px"}}>
                        <h2>Name: {state.response?.name}</h2>
                        <hr/>
                        <h2>ISBN: {state.response?.isbn}</h2>
                        <hr/>
                        <h2>Author: {state.response?.author.name + " " + state.response?.author.surname}</h2>
                        <hr/>
                        <h2>Genre: {state.response?.genre.name.charAt(0).toUpperCase() + state.response?.genre.name.toLowerCase().slice(1)}</h2>
                        <hr/>
                        <h2>Read: <input type={"checkbox"} defaultChecked={state?.read} onClick={async () => {
                            const response = await ReadListService.addOrDrop(state?.response);
                            setUpdatedUser();
                            response === "ADD" ? ToastifyUtil.success(MessageUtil.addBook()) : ToastifyUtil.success(MessageUtil.removeBook());
                        }}/></h2>
                        <hr/>
                        <h2>Favorite: <input type={"checkbox"} defaultChecked={state?.favorite} onClick={async () => {
                            const response = await FavoriteListService.addOrDrop(state?.response)
                            setUpdatedUser();
                            response === "ADD" ? ToastifyUtil.success(MessageUtil.addBook()) : ToastifyUtil.success(MessageUtil.removeBook());
                        }}/></h2>
                        <hr/>
                        <RateSection bookId={bookId}></RateSection>
                    </div>


                </div>
            </>
        )
    }

    return (Page())
}

export default BookPage;