import { getUserData } from '../../../firebase/firebase.utils';

import MessageContent from '../../../components/message-board/message-content/message-content.component';

const MessagePage = ({messageData, handleClick}) => {
    
    //const {messageData, loading} = useMessage(props.match.params.messageId);
    const { user } = getUserData(messageData.uid)
    //console.log(user);
    return (
        <MessageContent messageData={messageData} />
    )
}

export default MessagePage;