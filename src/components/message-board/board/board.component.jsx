import { useMessages } from '../../../hooks/message.hook';
import Loader from '../../../components/UI/loader/loader.component';
import Card from '../card/card.component';

const Board = (props) => {
    const { loading, messagesData} = useMessages();

    return (
        <div className="messageBoard">
            {loading ? <Loader /> : 
                messagesData.map(card => (
                    <Card 
                        key={card.id}
                        data={card}
                    ></Card>
                ))
            }
        </div>
    )
}

export default Board;