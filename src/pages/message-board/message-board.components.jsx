import { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
//import { firestore, getUser } from '../../firebase/firebase.utils';

import { useSession } from '../../context/auth.context';
import { useApartments } from '../../hooks/apartments.hook';
import { useMessages } from '../../hooks/message.hook';

import Board from '../../components/message-board/board/board.component';
import MessageContent from '../../components/message-board/message-content/message-content.component';
import AddMessage from './add-message/add-message.component';
import AsideTenantsList from '../../components/aside/aside-tenants-list/aside-tenants-list.component';

const MessageBoard = props => {
    
    const { loading, messagesData} = useMessages();
    const { building, user } = useSession();
    const { apartmentsLoading, apartmentsData} = useApartments();

    const handleClick = (compName, messageData, tenantData, aptId) => {
        
        setComp(compName);
        
        if (compName === 'messagePage') {
            setMesssageData(messageData);
            setTenantData({...tenantData, aptId})
        } else {
            setMesssageData('');
            setTenantData({});
        }
    }

    const [ messageData, setMesssageData ] = useState('');
    const [ tenantData, setTenantData ] = useState('');

   
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

        if (comp === 'board') {
            props.history.push(`/message-board`);
            
        } else if (comp === 'addMsg' && !messageData) {
            props.history.push('/message-board/addMessage')


        } else if (comp === 'messagePage') {
            if (!props.match.params.messageId) {
                const messageId = messageData.id;
                props.history.push(`/message-board/${messageId}`)
                
            } else {
                const messageId = props.match.params.messageId;
                setMesssageData(messagesData.find(msg => msg.id === messageId))
            }            
        }
    }, [comp, messagesData, messageData, props.match.params.messageId, props.history]);

    return (        
        <main className="mainWrapper biggerAside">
            <section>
                <div className="withButton">
                    <h2>לוח מודעות</h2>
                    <button onClick={() => handleClick(toBtn.title)} className="custom-button">{toBtn.text}</button>
                </div>
                <Switch>
                    <Route path={`/message-board`} exact render={() => 
                        <Board 
                            handleClick={handleClick} 
                            building={building} 
                            messagesData={messagesData} 
                            loading={loading} />
                    } />

                    <Route path={`/message-board/addMessage`} render={() => 
                        <AddMessage 
                            building={building} 
                            user={user} 
                            handleClick={handleClick} />
                    } />

                    <Route path={`/message-board/:id`} render={() => 
                        <MessageContent 
                            handleClick={handleClick} 
                            building={building} 
                            messageData={messageData} 
                            user={user} 
                            tenantData={tenantData} />
                    } />
                </Switch>
            </section>
            <AsideTenantsList loading={apartmentsLoading} apartments={apartmentsData} />
        </main>
    )
}

export default MessageBoard;