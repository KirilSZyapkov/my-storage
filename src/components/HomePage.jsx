import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import ItemList from "./ItemList";
import Breadcrumbs from "./Breadcrumbs";
import { db } from "../firebase";

function HomePage() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(true);
    const { logout, currentUser } = useAuth();
    let { currentFolderId } = useParams();

    useEffect(() => {
        async function fetch() {

            if (currentFolderId) {
                const fetch = await db.folders.doc(currentFolderId).get();
                const folder = {
                    id: fetch.id,
                    ...fetch.data()
                }

                setData(folder);
            } else {
                const fetch = await db.folders.where("_owner", "==", `${currentUser.uid}`).get();
                const respons = fetch.docs.map(doc => {
                    const folder = {
                        id: doc.id,
                        ...doc.data()
                    }
                    return folder
                })

                setData(respons);
            }
        }
        fetch();
    }, [currentFolderId, update]);

    console.log(data);



    console.log(currentFolderId);

    function openModal() {
        setOpen(true);
    };
    function closeModal() {
        setOpen(false);
    };

    async function createFolder(e) {
        e.preventDefault();
        const target = e.target;
        const folderName = target.folderName.value.trim();
        await db.folders.add({
            folderName,
            _owner: currentUser?.uid,
            parentFolder: currentFolderId || '/',
            children: [],
            path: [],
            type: 'folder'
        })
        setUpdate(!update);
        closeModal();
    };

    async function loadFile() {

    };


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

                    <label className="breadcrumb-buttons-file">
                        <FcFile />
                        <input type="file" style={{ display: 'none' }} onChange={loadFile} />
                    </label>
                    <button onClick={openModal} className="breadcrumb-buttons-folder"><FcFolder /></button>
                </div>
            </div>
            <hr />
            <ItemList data={data} />
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
    );
};

export default HomePage;