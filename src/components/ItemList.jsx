import React from 'react';
import FolderIcon from './FolderIcon';
import FileIcon from './FileIcon';

function ItemList() {
    return (
        <div className="item-container">
            <FolderIcon />
            <FileIcon />
        </div>
    )
}

export default ItemList;