import { Link } from 'react-router-dom';

function Breadcrumbs({
    folderName,
    folderId
}) {
    return (
        <li className="breadcrumb-li"><span className='span-li'>/</span><Link to={'/'}>{"Home"}</Link></li>
    );
}

export default Breadcrumbs;