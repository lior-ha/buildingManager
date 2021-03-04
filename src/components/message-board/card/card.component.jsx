import './card.styles.scss'

const Card = ({data, handleClick}) => (
    <div onClick={() => handleClick('messagePage', data)}  className={`card ${data.sticky ? 'priority' : ''}`}>
        <h3>{data.title}</h3>
        מאת: {data.by}
    </div>
)

export default Card; 