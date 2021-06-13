import { Fragment } from 'react'
import Tabs from '../../UI/Tabs/tabs.components';
import AsideLastActions from '../aside-last-actions/aside-last-actions.component';
import AsideTenantsList from '../aside-tenants-list/aside-tenants-list.component';

import './aside-wrapper.styles.scss';

const AsideWrapper = ({wideScreen , activeTab, setActiveTab}) => {
    const tabs = [
        {
            type: 'lastActions',
            text: 'תשלומים אחרונים'
        },
        {
            type: 'lastTenants',
            text: 'דירות'
        },
    ];

    const getContent = (asides) => {
        const asideStructure = asides.map(aside => {
            const tabText = tabs.find(tab => tab.type === aside);
            const asideTemplate =   <aside key={aside} className={`contentBox asideBox ${aside==='lastTenants' ? 'asideLeft' : 'asideRight'} `}>
                                        <div className="top">
                                            <p className="title">{tabText.text}</p>
                                        </div>
                                        {aside==='lastActions' && <AsideLastActions />}
                                        {aside==='lastTenants' && <AsideTenantsList />}
                                    </aside>
            return asideTemplate
        });
            return (
                <Fragment>
                    {!wideScreen && <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />}
                    {asideStructure}
                </Fragment>
            )
        // return asideStructure;
    }
    return (
        <>
            {!wideScreen ? <div className='sidebar'>{getContent([activeTab])}</div> : getContent(['lastActions', 'lastTenants'])}
        </>

        
    )
}

export default AsideWrapper;