import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import ItemList from "./ItemList";
import Breadcrumbs from "./Breadcrumbs";
import { db } from "../firebase";

function HomePage() {
    const [open, setOpen] = useState(false);
    const { logout } = useAuth();
    let { id } = useParams();

    if (!id) {
        id = null;
    }

    console.log(id);

    function openModal() {
        setOpen(true);
    }
    function closeModal() {
        setOpen(false);
    }

    async function createFolder(e){
        e.preventDefault();
        alert('done');
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
                    <button onClick={openModal} className="breadcrumb-buttons-folder"><FcFolder /></button>
                </div>
            </div>
            <hr />
            <ItemList />
            {open && <div className="modal">
                <form onSubmit={createFolder} className="modal-form">
                    <label className="modal-form-label" htmlFor="folderName">Folder Name</label>
                    <input type="text" name="folderName" required />
                    <hr />
                    <div className="modal-btn-container">
                        <button onClick={closeModal} className="modal-form-btn close">Close</button>
                        <button className="modal-form-btn" type="submit">Create</button>
                    </div>
                </form>

            </div>}
        </>
    )
}

export default HomePage