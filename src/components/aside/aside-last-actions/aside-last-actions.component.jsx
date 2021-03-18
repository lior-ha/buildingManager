import AsideWrapper from '../aside-wrapper/aside-wrapper.component';
import AsideAction from './aside-action/aside-action.component';

import Loading from '../../UI/loader/loader.component';

const AsideLastActions = props => (
        <AsideWrapper extraClasses="lastActions" title="פעולות אחרונות">
        {props.loading ?
            <Loading />
        :
            props.transactions
            .map(({id, ...otherProps }) => {
                return <AsideAction key={id} {...otherProps} />
            })
        }
        </AsideWrapper>
);

export default AsideLastActions;