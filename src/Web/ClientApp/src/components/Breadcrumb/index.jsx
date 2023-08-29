import { Link } from 'react-router-dom';

const Breadcrumb = ({ links }) => {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                {links.map(({to, text}, index) => <li key={index} className={`breadcrumb-item${to ? '' : ' active'}`}>{to ? <Link to={to}>{text}</Link> : text}</li>)}
            </ol>
        </nav>
    );
};
export default Breadcrumb;