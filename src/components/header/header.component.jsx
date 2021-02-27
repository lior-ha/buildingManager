import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';
import { useSession } from '../../context/auth.context';

import './header.styles.scss';

const Header = () => {
    const { user } = useSession();
    return (
        <header className="mainHeader">
            <Link className="tab" to='/'>Homepage</Link>
            <Link className="tab" to='/mainAdmin/addPayment'>ניהול הכנסות/הוצאות</Link>
            <Link className="tab" to='/mainAdmin/addApartment'>ניהול דירות</Link>
            <Link className="tab" to='/mainAdmin/addBuilding'>הוספת בניין</Link>
<div style={{
    lineHeight: '50px',
	color: 'red',
    margin: '0 auto 0 0',
	textAlign: 'center',
}}>גרסת אלפא</div>
            {
                user ? 
                <div className="tab end" onClick ={() => auth.signOut()}> התנתק </div>
                :
                <Link className="tab end" to='/signin'> התחבר </Link>
            }
        </header>
    )
};

export default Header;