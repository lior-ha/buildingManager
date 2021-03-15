import { Link } from 'react-router-dom';

//import './link-list-item.styles.scss';

const LinkListItem = ({id, text, status, cat}) => (
    <Link to={`${cat}/${id}`} className={`linkListItem ${status}`}>{text}</Link>
);

export default LinkListItem;