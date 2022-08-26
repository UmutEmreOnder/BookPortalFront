import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import BookService from "../../service/book/BookService";
import CommentSection from "./CommentSection";
import RateSection from "./RateSection";

const BookPage = () => {
    const location = useLocation();
    const [state, setState] = useState({});
    const bookId = location.pathname.split("/")[2];

    useEffect(() => {
        fetch()
    }, [])

    async function fetch() {
        const response = await BookService.fetchBook(location.pathname);
        await setState({response: response});
    }

    return (
        <>
            <div style={{width: "fit-content", display: "inline-block", marginLeft: "100px"}}>
                <img style={{marginLeft: "100px", border: "1px solid black", marginTop: "50px", width: "300px", height: "500px"}}
                     src={state.response?.photoURL} alt={"Cover Photo"}/>

                <div style={{float: "right", marginLeft: "100px"}}>
                    <CommentSection bookId={bookId}></CommentSection>
                </div>

                <div style={{display: "inline-block", float: "right", marginLeft: "50px", marginTop: "70px"}}>
                    <h3>Name: {state.response?.name}</h3>
                    <hr/>
                    <h3>ISBN: {state.response?.isbn}</h3>
                    <hr/>
                    <h3>Author: {state.response?.author.name + " " + state.response?.author.surname}</h3>
                    <hr/>
                    <h3>Genre: {state.response?.genre.name.charAt(0).toUpperCase() + state.response?.genre.name.toLowerCase().slice(1)}</h3>
                    <hr/>
                    <h3>Number of Pages: {state.response?.page}</h3>
                    <hr/>
                    <h3 style={{width: "500px"}}>Description: {state.response?.description}</h3>
                    <hr/>
                    <RateSection bookid={bookId}></RateSection>
                </div>
            </div>
        </>
    )
}

export default BookPage;