import React from 'react';
import { Link } from 'react-router-dom';
import FolderIcon from './FolderIcon';
import FileIcon from './FileIcon';
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import Breadcrumbs from "./Breadcrumbs";

function ItemList({
    data,
    openModal,
    loadFile
}) {

    return (
        <>
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
            {data?.length ?
                <div className="item-container">
                    {data.map(f => {
                        if (f.type === 'folder') {
                            return (
                                <div className="item-container">
                                    <FolderIcon key={f.id} folder={f} />
                                </div>
                            )
                        } else {
                            return (
                                <div className="item-container">
                                    <FileIcon key={f.id} file={f} />
                                </div>
                            )
                        }
                    })}
                </div>
                :
                <>{
                    data.children?.map(f => {
                        if (f.type === 'folder') {
                            return (
                                <div className="item-container">
                                    <FolderIcon key={f.id} folder={f} />
                                </div>
                            )
                        } else {
                            return (
                                <div className="item-container">
                                    <FileIcon key={f.id} file={f} />
                                </div>
                            )
                        }
                    })
                }</>

            }
        </>
    )
}

export default ItemList;