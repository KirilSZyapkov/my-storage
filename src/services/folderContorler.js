import { db } from "../firebase";

async function createNewFolder({ newFolder, currentFolderId, currentUser, data }) {

    const folderNameExist = data?.some(f => f.folderName === newFolder.folderName);

    if (folderNameExist) {
        throw new Error(`You allready have folder named ${newFolder.folderName}`);
    } else {

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
    }

};

async function updateFolder({ currentFolder, currentUser, newFolder }) {
    const children = currentFolder.children;
    const child = await createNewFolder({ currentFolderId: currentFolder.id, currentUser, newFolder, data: children });
    children.push(child);
    await db.folders.doc(currentFolder.id).set({ children }, { merge: true })
}

async function uploadFile({ fileName, currentUser, url, currentFolder }) {

    const file = await db.files.add({
        fileName,
        _owner: currentUser.uid,
        type: 'file',
        createdAT: db.getCurrentTimestamp(),
        url,
        parentFolder: currentFolder.id || '/'
    });

    return {
        id: file.id,
        fileName,
        type: 'file',
        url,
        parentFolder: currentFolder.id
    }

}

async function updateFolderFile({ currentFolder, fileName, currentUser, url }) {
    const child = await uploadFile({ fileName, currentUser, url, currentFolder })
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