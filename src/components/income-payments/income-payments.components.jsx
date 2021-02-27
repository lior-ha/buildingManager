
import LinkListBox from '../link-list-box/link-list-box.component';

import Loading from '../UI/loader/loader.component';

import './income-payments.styles.scss';

const IncomePayments = (props) => (
    <div className="incomePayments">
        { props.loading ? 
            <Loading /> 
        : 
            <LinkListBox linkList={props.apartments} cat="building" />
        }
    </div>
);

export default IncomePayments;