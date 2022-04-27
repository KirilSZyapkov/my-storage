import { db } from "../firebase";

async function createNewFolder({ newFolder, currentFolderId, currentUser }) {

    const folder = await db.folders.add({
        folderName: newFolder.folderName,
        _owner: currentUser?.uid,
        parentFolder: currentFolderId || '/',
        children: [],
        path: [],
        type: 'folder',
        createdAT: db.getCurrentTimestamp()
    })

    return {
        id: folder.id,
        folderName: newFolder.folderName,
        type: 'folder'
    };

};

async function updateFolder({ currentFolder, currentUser, newFolder }) {
    const child = await createNewFolder({ currentFolderId: currentFolder.id, currentUser, newFolder });
    const children = currentFolder.children;
    children.push(child);
    await db.folders.doc(currentFolder.id).set({ children }, { merge: true })
}

async function uploadFile({ fileName, currentUser, url }) {

    const file = await db.files.add({
        fileName,
        _owner: currentUser.uid,
        type: 'file',
        createdAT: db.getCurrentTimestamp(),
        url
    });

    return {
        id: file.id,
        fileName,
        type: 'file',
        url
    }

}

async function updateFolderFile({ currentFolder, fileName, currentUser, url }) {
    const child = await uploadFile({fileName, currentUser, url})
    const children = currentFolder.children;
    children.push(child);
    await db.folders.doc(currentFolder.id).set({ children }, { merge: true })
}

export {
    createNewFolder,
    updateFolder,
    updateFolderFile,
    uploadFile
}