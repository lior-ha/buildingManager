
import LinkListBox from '../link-list-box/link-list-box.component';

import Loading from '../UI/loader/loader.component';

import './income-transactions.styles.scss';

const IncomeTransactions = (props) => (
    <div className="incomeTransactions">
        { props.loading ? 
            <Loading /> 
        : 
            <LinkListBox linkList={props.apartments} cat="building" />
        }
    </div>
);

export default IncomeTransactions;