import React from 'react';
import FolderIcon from './FolderIcon';
import FileIcon from './FileIcon';

function ItemList({ data }) {
    return (
        <>
            <div className="item-container">
                {data.map(f => <FolderIcon folder={f} />)}
            </div>
            <div className="item-container">
                <FileIcon />
            </div>
        </>
    )
}

export default ItemList;