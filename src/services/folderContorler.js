import { db } from "../firebase";

async function createNewFolder({ newFolder, currentFolderId, currentUser }) {

    await db.folders.add({
        folderName: newFolder.folderName,
        _owner: currentUser?.uid,
        parentFolder: currentFolderId || '/',
        children: [],
        path: [],
        type: 'folder',
        createdAT: db.getCurrentTimestamp()
    })


};

async function updateFolder() {
alert('add')
}

export {
    createNewFolder,
    updateFolder
}