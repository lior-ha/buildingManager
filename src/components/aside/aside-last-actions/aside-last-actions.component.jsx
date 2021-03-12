import moment from 'moment';

import AsideWrapper from '../aside-wrapper/aside-wrapper.component';
import AsideAction from './aside-action/aside-action.component';

import Loading from '../../UI/loader/loader.component';

const sortByDate = (payA, payB) => {
    return moment(payB.createdAt) - moment(payA.createdAt);
}

const AsideLastActions = props => (
        <AsideWrapper extraClasses="lastActions" title="פעולות אחרונות">
        {props.loading ?
            <Loading />
        :
            props.payments
            .sort(sortByDate)
            .map(({id, incomeSource, other, ...otherProps }) => {
                if (incomeSource === 'other') {
                    incomeSource = other;
                }
                return <AsideAction key={id} incomeSource={incomeSource} {...otherProps} />
            })
        }
        </AsideWrapper>
);

export default AsideLastActions;