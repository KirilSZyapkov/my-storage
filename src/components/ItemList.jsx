import FolderIcon from './FolderIcon';
import FileIcon from './FileIcon';


function ItemList({
    data,
    files
}) {

    return (
        <>
            {data?.length ?
                <div className="folder-container">
                    {data.map(f => (<div className="item-container"><FolderIcon key={f.id} folder={f} /> </div>))}
                    {files.map(f => (<div className="item-container"> <FileIcon key={f.id} file={f} /> </div>))}
                </div>
                
                :
                <div className='file-container'>{
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
                }</div>

            }
            
        </>
    )
}

export default ItemList;