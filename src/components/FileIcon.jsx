import { Link } from 'react-router-dom';
import { FcFile } from "react-icons/fc";

function FileIcon({ file }) {
  return (
    <div className="file-container">

      <div className="home-page-icons"><FcFile /><Link to={'/'}>Home</Link></div>
    </div>

  )
}

export default FileIcon