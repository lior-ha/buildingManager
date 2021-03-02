import { Fragment } from 'react';
import Moment from 'react-moment';

import Loader from "../../UI/loader/loader.component";

import './message.styles.scss'

const MessageContent = ({loading, messageData}) => (
    <section>
        <div className="contentBox messageBox">
        {(loading || !messageData.title) ? <Loader /> :
            <Fragment>
                <h2>{messageData.title}</h2>
                <div className="subTitle"><span>מאת:</span> ועד הבית</div>
                <Moment format="DD.MM.YYYY" className="date">{messageData.createdAt}</Moment>
                <div className="content">
                    {messageData.content}
                </div>
            </Fragment>
        }
        </div>
    </section>
)

export default MessageContent;