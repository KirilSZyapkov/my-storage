import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createNewFolder, updateFolder, uploadFile, updateFolderFile } from '../services/folderContorler';
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import Breadcrumbs from "./Breadcrumbs";
import ItemList from "./ItemList";

import { db, storage } from "../firebase";

function HomePage() {
    const [data, setData] = useState([]);
    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(true);
    const { logout, currentUser } = useAuth();
    let { currentFolderId } = useParams();
    const crumbs = useRef([{ name: "Root", id: "/" }]);

    useEffect(() => {
        async function fetch() {
            let index = crumbs.current.findIndex(c => c.id === currentFolderId);

            if (currentFolderId) {
                const fetch = await db.folders.doc(currentFolderId).get();
                const folder = {
                    id: fetch.id,
                    ...fetch.data()
                }

                setData(folder);

                const notIncluded = crumbs.current.some(c => c.id === currentFolderId);

                if (notIncluded === false) {
                    crumbs.current.push({ name: folder.folderName, id: currentFolderId });
                } else {

                    if (index !== 0) index++;
                    crumbs.current.splice(index);
                }

            } else {
                const fetch = await db.folders.where("parentFolder", "==", '/').where("_owner", "==", `${currentUser.uid}`).get();
                const fetchFiles = await db.files.where("_owner", "==", `${currentUser.uid}`).get();
                const respons = fetch.docs.map(doc => {
                    const folder = {
                        id: doc.id,
                        ...doc.data()
                    }
                    return folder
                });

                const fetchFileRespons = fetchFiles.docs.map(f =>{
                    const file = {
                        id: f.id,
                        ...f.data()
                    };
                    return file;
                })

                setData(respons);
                setFiles(fetchFileRespons);

                crumbs.current.length = 1;
            }
        }
        fetch();
    }, [currentFolderId, update]);

    console.log(files);

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

    async function loadFile(e) {
        const file = e.target.files[0];
        if (file === null) return;

        const filePath = file.name;

        const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file);

        uploadTask.on('state_changed', snapshot => {

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                if (currentFolderId) {
                    updateFolderFile({ currentFolder: data, fileName: file.name, currentUser, url });
                } else {
                    uploadFile({ fileName: file.name, currentUser, url });
                }
            })
        })
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
                        {crumbs.current.map(crumb => <Breadcrumbs key={crumb.id} {...crumb} />)}
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

            <ItemList openModal={openModal} data={data} files={files} />
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