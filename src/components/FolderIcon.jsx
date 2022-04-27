import { Link } from 'react-router-dom';
import { FcFolder } from "react-icons/fc";

function FolderIcon({folder}) {
  return (
    <div className="folder-container">
      <Link to={`/folder/${folder.id}`}><div className="home-page-icons" ><FcFolder /><p className="folder-name">{folder.folderName}</p></div></Link>
    </div>

  )
}

export default FolderIcon