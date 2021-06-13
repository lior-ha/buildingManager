import { useState } from 'react';

import { useSession } from '../../context/auth.context';
import { useMessages } from '../../hooks/message.hook';

import Board from '../../components/message-board/board/board.component';
import MessageContent from '../../components/message-board/message-content/message-content.component';
import AddMessage from './add-message/add-message.component';

const MessageBoard = () => {
console.log('messageBoard')
    const { loading, messagesData} = useMessages();
    const { building, user } = useSession();

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

    return (        
        <>
            <section>
                <div className="withButton">
                    <h2>לוח מודעות</h2>
                    <button onClick={() => handleClick(toBtn.title)} className="custom-button gray">{toBtn.text}</button>
                </div>
                {comp === 'board' && <Board 
                            handleClick={handleClick} 
                            building={building} 
                            messagesData={messagesData} 
                            loading={loading} />}

                {comp === 'addMsg' && <AddMessage 
                            building={building} 
                            user={user} 
                            handleClick={handleClick}
                            setMesssageData={setMesssageData} /> }

                {comp === 'messagePage' && <MessageContent 
                            handleClick={handleClick} 
                            building={building} 
                            messageData={messageData} 
                            user={user} 
                            tenantData={tenantData} />}
            </section>
        </>
    )
}

export default MessageBoard;