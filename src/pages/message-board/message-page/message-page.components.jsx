import { usePayments } from '../../../hooks/payments.hook';
import { useMessage } from '../../../hooks/message.hook';

import AsideLastActions from '../../../components/aside/aside-last-actions/aside-last-actions.component';
import MessageContent from '../../../components/message-board/message-content/message-content.component';

const MessagePage = props => {
    const {paymentLoading, payments} = usePayments();
    const {messageData, loading} = useMessage(props.match.params.messageId);
    
    return (
        <main className="mainWrapper">
            <MessageContent loading={loading} messageData={messageData} />
            <AsideLastActions loading={paymentLoading} payments={payments} />
        </main>
    )
}

export default MessagePage;