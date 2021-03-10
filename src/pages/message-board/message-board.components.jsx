import { useState } from 'react';

import { useSession } from '../../context/auth.context';
import { useApartments } from '../../hooks/apartments.hook';
import { useMessages } from '../../hooks/message.hook';

import Board from '../../components/message-board/board/board.component';
import MessageContent from '../../components/message-board/message-content/message-content.component';
import AddMessage from './add-message/add-message.component';
import AsideTenantsList from '../../components/aside/aside-tenants-list/aside-tenants-list.component';

const MessageBoard = () => {
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

    return (        
        <main className="mainWrapper biggerAside">
            <section>
                <div className="withButton">
                    <h2>לוח מודעות</h2>
                    <button onClick={() => handleClick(toBtn.title)} className="custom-button lightGray">{toBtn.text}</button>
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
            <AsideTenantsList loading={apartmentsLoading} apartments={apartmentsData} />
        </main>
    )
}

// MessageBoard.displayName = 'MessageBoard'
// MessageBoard.whyDidYouRender = {
//     logOnDifferentValues: true
// };

export default MessageBoard;