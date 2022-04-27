import { Link } from 'react-router-dom';

function Breadcrumbs({
    name,
    id
}) {
    return (
        <>
            {name === "Root" ? 
            <li className="breadcrumb-li"><span className='span-li'>/</span><Link to={`${id}`}>{name}</Link></li>:
            <li className="breadcrumb-li"><span className='span-li'>/</span><Link to={`/folder/${id}`}>{name}</Link></li>
        }
        </>
    );
}

export default Breadcrumbs;