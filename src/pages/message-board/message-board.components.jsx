import { useState, useEffect } from 'react';

import { useSession } from '../../context/auth.context';
import { useApartments } from '../../hooks/apartments.hook';

import Board from '../../components/message-board/board/board.component';
import AddMessage from './add-message/add-message.component';
import AsideTenantsList from '../../components/aside/aside-tenants-list/aside-tenants-list.component';

const MessageBoard = props => {
    const { building, id } = useSession();
    const { apartmentsLoading, apartmentsData} = useApartments();
    const [ comp, setComp ] = useState({
        comp: '',
        title: ''
    });

    const handleClick = value => {
        if (value === 'board') {
            setComp({
                component: <Board/>,
                title: 'board'
            })
        } else if (value === 'addMsg') {
            setComp({
                component:   <AddMessage 
                            building={building} 
                            id={id} 
                            handleClick={props.handleClick}
                        />,
                title:  'addMsg'
            })
        }
    }
    let toBtn;
    if (comp.title === 'board') {
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
        setComp({
            component: <Board/>,
            title: 'board'
        })
    }, [])

    return (        
        <main className="mainWrapper">
            <section>
                <div className="withButton">
                    <h2>לוח מודעות</h2>
                    <button onClick={() => handleClick(toBtn.title)} className="custom-button">{toBtn.text}</button>
                </div>
                {comp.component}
            </section>
            <AsideTenantsList loading={apartmentsLoading} building={building} apartments={apartmentsData} />
        </main>
    )
}

export default MessageBoard;