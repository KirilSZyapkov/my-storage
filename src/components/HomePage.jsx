import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createNewFolder, updateFolder } from '../services/folderContorler';

import ItemList from "./ItemList";

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
                const fetch = await db.folders.where("parentFolder", "==", '/').where("_owner", "==", `${currentUser.uid}`).get();
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
        const newFolder = { folderName }
        if (currentFolderId) {
            await updateFolder({ currentFolder: data, currentUser, newFolder });
        } else {
            await createNewFolder({ newFolder, currentFolderId, currentUser })
        }
        setUpdate(!update);
        closeModal();
    };


    return (
        <>
            <div className="home-page-topnav">
                <div className="home-page-logo">M Y <span className='storage'>S T O R A G E</span></div>
                <div onClick={() => logout()} className='home-page-topnav-logout-button'>L O G O U T</div>
            </div>

            <ItemList openModal={openModal} data={data} />
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