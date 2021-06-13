import { useSession } from '../../../context/auth.context';
import { useTransactions } from '../../../hooks/transactions.hook';

import AsideAction from './aside-action/aside-action.component';

import Loader from '../../UI/loader/loader.component';

const AsideLastActions = () => {
    const { building } = useSession()
    const { transactionLoading, transactions } = useTransactions(undefined, 'createdAt', 'desc', building);

    const transactionsList =  transactions.map(({id, ...otherProps }) => {
        return <AsideAction key={id} {...otherProps} />
    });

    return (
        <>
            {transactionLoading ?
                <Loader />
            :
                transactionsList
            }
        </>
    )
};

export default AsideLastActions;