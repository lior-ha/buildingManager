import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useSession } from '../../context/auth.context';
import { useApartments } from '../../hooks/apartments.hook';
import { useMessages } from '../../hooks/message.hook';

import Board from '../../components/message-board/board/board.component';
import MessageContent from '../../components/message-board/message-content/message-content.component';
import AddMessage from './add-message/add-message.component';
import AsideTenantsList from '../../components/aside/aside-tenants-list/aside-tenants-list.component';

const MessageBoard = props => {
    
    const handleClick = (compName, messageData) => {
        setComp(compName);
        setMesssageData(messageData);
    }

    const { loading, messagesData} = useMessages();
    const { building, user } = useSession();
    const { apartmentsLoading, apartmentsData} = useApartments();
    const [ messageData, setMesssageData ] = useState('');

    // const components = {
    //     board: <Board handleClick={handleClick} messagesData={messagesData} loading={loading} />,
    //     addMsg: <AddMessage building={building} id={user.id} handleClick={handleClick} />,
    //     messagePage: <MessageContent handleClick={handleClick} messageData={messageData} />
    // }
   
    const [ comp, setComp ] = useState('board');

    let toBtn;
    if (comp === 'board') {
        toBtn = {
                    title: 'addMsg',
                    text: 'הוסף מודעה'
                }
    } else {
        toBtn = {
                    title: 'board',
                    text: 'חזור ללוח המודעות'
                }
    }

    useEffect(() => {
        
        
        // if (props.match.params.messageId) {
        //     setMesssageData(getItem(props.match.params.messageId))
        // }

        if (comp === 'board') {
            props.history.push(`/message-board`);
            
        } else if (comp === 'addMsg' && !messageData) {
            props.history.push('/message-board/addMessage')


        } else if (comp === 'messagePage') {
            console.log('messagePage');
            //if (!props.match.params.messageId) {
                const messageId = messageData.id;
                props.history.push(`/message-board/${messageId}`)
                
            // } else {
            //     const messageId = props.match.params.messageId;
            //     setMesssageData(messagesData.find(msg => msg.id === messageId))
            // }

            
            
        }
    }, [comp, messagesData, props.match.params.messageId, props.history]);

    return (        
        <main className="mainWrapper">
            <section>
                <div className="withButton">
                    <h2>לוח מודעות</h2>
                    <button onClick={() => handleClick(toBtn.title)} className="custom-button">{toBtn.text}</button>
                </div>
                <Switch>
                    <Route path={`/message-board`} exact render={() => <Board handleClick={handleClick} messagesData={messagesData} loading={loading} />} />
                    <Route path={`/message-board/addMessage`} render={() => <AddMessage building={building} id={user.id} handleClick={handleClick} />} />
                    <Route path={`/message-board/:id`} render={() => <MessageContent messageData={messageData} />} />
                </Switch>
            </section>
            <AsideTenantsList loading={apartmentsLoading} building={building} apartments={apartmentsData} />
        </main>
    )
}

export default MessageBoard;