import Loader from '../../../components/UI/loader/loader.component';
import Card from '../card/card.component';

const Board = ({handleClick, messagesData, loading}) => {
    return (
        <div className="messageBoard">
            {loading ? <Loader /> : 
                messagesData.map(card => {
                    return (
                        <Card
                            handleClick={handleClick}
                            key={card.id}
                            data={card}
                        ></Card>
                    )
                })
            }
        </div>
    )
}

export default Board;