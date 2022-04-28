import { useState, useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createNewFolder, updateFolder, uploadFile, updateFolderFile } from '../services/folderContorler';
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import Breadcrumbs from "./Breadcrumbs";
import ItemList from "./ItemList";
import { v4 as uuidV4 } from "uuid";

import { db, storage } from "../firebase";

function HomePage() {
    const [data, setData] = useState([]);
    const [files, setFiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(true);
    const [uploadingFiles, setUploadingFiles] = useState([]);
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
                const fetchFiles = await db.files.where("parentFolder", "==", '/').where("_owner", "==", `${currentUser.uid}`).get();
                const respons = fetch.docs.map(doc => {
                    const folder = {
                        id: doc.id,
                        ...doc.data()
                    }
                    return folder
                });

                const fetchFileRespons = fetchFiles.docs.map(f => {
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

        const id = uuidV4();
        setUploadingFiles(prevUploadigFiles => [
            ...prevUploadigFiles,
            {
                id: id, name: file.name, progress: 0, error: false
            }
        ]);
        const filePath = file.name;

        const uploadTask = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file);

        uploadTask.on('state_changed', snapshot => {
            const progress = snapshot.bytesTransferred / snapshot.totalBytes;
            setUploadingFiles(prevUploadigFiles => {
                return prevUploadigFiles.map(uploadFile => {
                    if (uploadFile.id === id) {
                        return { ...uploadFile, progress: progress }
                    }

                    return uploadFile;
                })
            })
        }, () => {

        }, () => {
            setUploadingFiles([]);
            setUpdate(!update);

            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                if (currentFolderId) {
                    updateFolderFile({ currentFolder: data, fileName: file.name, currentUser, url });

                } else {
                    uploadFile({ fileName: file.name, currentUser, url, currentFolder: data });
                }
            })

        });
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
        
            {uploadingFiles.length > 0 &&
                ReactDOM.createPortal(
                    <div style={{
                        borderRadius: '15px',
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        maxWidth: '350px',
                        width: '300px',
                        padding: '20px',
                        backgroundColor: 'lightgray'
                    }}>
                        {uploadingFiles.map(file => (
                            <>
                                <div key={file.id} className="snackbar">{file.name}</div>
                                <div class="w3-light-grey">
                                    <div>{Math.round(file.progress * 100)}</div>
                                </div>
                            </>
                        ))}
                    </div>,
                    document.body
                )
            }
        </>
    );
};

export default HomePage;