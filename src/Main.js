import React from 'react'
import { Link } from "react-router-dom";
import "./App.css";

function Main() {
    return (
        <div className='main-div'>
            <Link className='main-link' to="/admin"> Admin Portal </Link> <br/>
            <Link className='main-link' to="/user"> User Portal </Link>
        </div>
    )
}

export default Main