import { Link } from 'react-router-dom';

function Breadcrumbs({
    folderName,
    folderId
}) {
    return (
        <li className="breadcrumb-li"><Link to={'/'}>{"Home"}</Link></li>
    );
}

export default Breadcrumbs;