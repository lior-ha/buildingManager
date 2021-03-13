import AsideWrapper from '../aside-wrapper/aside-wrapper.component';
import AsideAction from './aside-action/aside-action.component';

import Loading from '../../UI/loader/loader.component';

const AsideLastActions = props => (
        <AsideWrapper extraClasses="lastActions" title="פעולות אחרונות">
        {props.loading ?
            <Loading />
        :
            props.transactions
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