import { Link } from 'react-router-dom';
import { FcFolder } from "react-icons/fc";

function FolderIcon({folder}) {
  return (
    <div className="folder-container">
      <div className="home-page-icons" ><FcFolder /><Link to={`/folder/${folder.id}`}>{folder.folderName}</Link></div>
    </div>

  )
}

export default FolderIcon