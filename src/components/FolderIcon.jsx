import { Link } from 'react-router-dom';
import { FcFolder } from "react-icons/fc";

function FolderIcon({
  folderName,
  folderId
}) {
  return (
    <div className="folder-container">

      <div className="home-page-icons" ><FcFolder /><Link to={'/'}>New Folder</Link></div>
    </div>

  )
}

export default FolderIcon