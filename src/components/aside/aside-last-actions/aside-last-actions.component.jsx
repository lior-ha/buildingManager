import moment from 'moment';

import AsideWrapper from '../aside-wrapper/aside-wrapper.component';
import AsideAction from './aside-action/aside-action.component';

import Loading from '../../UI/loader/loader.component';

const sortPays = (payA, payB) => {
    return moment(payB.createdAt) - moment(payA.createdAt);
}

const AsideLastActions = props => (
        <AsideWrapper extraClasses="lastActions" title="פעולות אחרונות">
        {props.loading ?
            <Loading />
        :
            props.payments
            .sort(sortPays)
            .map(({id, ...otherProps }) => (
                <AsideAction key={id} {...otherProps} />
            ))            
        }
        </AsideWrapper>
);

export default AsideLastActions;