import { Link } from 'react-router-dom';

import './card.styles.scss'

const Card = ({data}) => (
    <Link to={`/message-board/${data.id}`}  className={`card ${data.sticky ? 'priority' : ''}`}>
        <h3>{data.title}</h3>
        מאת: {data.by}
    </Link>
)

export default Card; 