import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import ItemList from "./ItemList";
import Breadcrumbs from "./Breadcrumbs";
import { db } from "../firebase";

function HomePage() {

    const { logout } = useAuth();


    async function createFolder() {

    }

    async function loadFile() {

    }


    return (
        <>
            <div className="home-page-topnav">
                <div className="home-page-logo">M Y <span className='storage'>S T O R A G E</span></div>
                <div onClick={() => logout()} className='home-page-topnav-logout-button'>L O G O U T</div>
            </div>
            <div className="home-page-breadcrumb">
                <div className="breadcrumb-container">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-li"><Link to={'/'}>Root</Link></li>
                        <Breadcrumbs text={"New Folderfsdihfidsfhiadshfidshfisd"} />
                    </ul>
                </div>
                <div className="breadcrumb-buttons">
                    <button onClick={loadFile} className="breadcrumb-buttons-file"><FcFile /></button>
                    <button onClick={createFolder} className="breadcrumb-buttons-folder"><FcFolder /></button>
                </div>
            </div>
            <hr />
            <ItemList />
        </>
    )
}

export default HomePage